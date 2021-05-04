import parser from 'fast-xml-parser';
import he from 'he';
import { XmlSmsBackupFile, XmlSms, XmlMessage, XmlMms } from './xmlTypes';

export const outgoingMmsAddressToken = 'insert-address-token';
export const smilPartMimeType = 'application/smil';

export enum MessageSenderType {
  Incoming = 1,
  Outgoing = 2
};

export enum MmsPartType {
  Text = 1,
  Image = 2
}

export type MessageBackup = {
  address: string,
  contactName: string | null,
  type: MessageSenderType,
  date: Date,
  readableDate: string
}

export interface MmsBackupPart {
  name: string | null,
  type: MmsPartType,
  base64EncodedImage: string | null,
  contentType: string | null,
  text: string | null
}

export interface MmsBackup extends MessageBackup {
  parts: MmsBackupPart[]
}

export interface SmsBackup extends MessageBackup {
  body: string
};

const parseFileToJson: (fileContent: string) => XmlSmsBackupFile = (fileContent) => parser.parse(fileContent, {
  parseAttributeValue: true,
  parseNodeValue: false,
  ignoreAttributes: false,
  parseTrueNumberOnly: true,
  attributeNamePrefix: '',
  attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),
  tagValueProcessor : (val, tagName) => he.decode(val)
});

const correctedDateSent = (dateSent: number) => {
  if (dateSent < new Date('1990-1-1').getTime()) {
    return dateSent * 1000;
  }
  return dateSent;
} 

const resolveDate = (message: XmlMessage) => {
  return message.date_sent !== 0
    ? new Date(correctedDateSent(message.date_sent))
    : new Date(message.date);
}

const resolveAddress = (message: XmlMessage) => {
  return typeof (message.address) === 'number' 
  ? `+47${message.address}` 
  : message.address
}

const buildSms: (sms: XmlSms) => SmsBackup = (sms) => {
  return {
    address: resolveAddress(sms),
    body: sms.body,
    contactName: sms.contact_name,
    date: resolveDate(sms),
    readableDate: sms.readable_date,
    type: sms.type
  }
}

const buildMms: (mms: XmlMms) => MmsBackup = (mms) => {
  const type = mms.addrs.addr.find(a => a.address === outgoingMmsAddressToken)
    ? MessageSenderType.Outgoing
    : MessageSenderType.Incoming;
  const parts = mms.parts.part.filter(part => part.ct !== smilPartMimeType)
    .map(part => {
      return {
        base64EncodedImage: part.data || null,
        text: part.text && part.text !== 'null' ? part.text : null,        
        name: part.cl,
        contentType: part.ct,
        type: part.ct === 'text/plain' ? MmsPartType.Text : MmsPartType.Image
      } as MmsBackupPart
    });
  return {
    address: resolveAddress(mms),
    contactName: mms.contact_name,
    date: resolveDate(mms),
    readableDate: mms.readable_date,
    type,
    parts
  }
}

export const parseMessageBackup: (fileContent:string) => MessageBackup[] = (fileContent) => {
  if (parser.validate(fileContent) !== true) {
    return [];
  }
  const parsed = parseFileToJson(fileContent);

  let res: MessageBackup[] = [];

  if (Array.isArray(parsed.smses.sms)) {
    res = (parsed.smses.sms as XmlSms[]).map(buildSms);
  } else if (!!parsed.smses.sms) {
    res = [buildSms(parsed.smses.sms as XmlSms)]
  }

  if (Array.isArray(parsed.smses.mms)) {
    const mmsEs = (parsed.smses.mms as XmlMms[]).map(buildMms);
    res = [...res, ...mmsEs]
  } else if (!!parsed.smses.mms) {
    res = [...res, buildMms(parsed.smses.mms as XmlMms)]
  }

  return res.sort((m1, m2) => m1.date.getTime() - m2.date.getTime());
}

export function isSms (message: MessageBackup): message is SmsBackup {
  return !!(message as SmsBackup).body;
}

export function isMms (message: MessageBackup): message is MmsBackup {
  return !!(message as MmsBackup).parts;
}
