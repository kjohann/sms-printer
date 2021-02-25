import parser from 'fast-xml-parser';
import he from 'he';
import { XmlSmsBackupFile, XmlSms } from './xmlTypes';

export enum SmsType {
  Incoming = 1,
  Outgoing = 2
};

export interface SmsBackup {
  address: string,
  contactName: string | null,
  body: string,
  type: SmsType,
  date: Date,
  readableDate: string
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

const buildSms: (sms: XmlSms) => SmsBackup = (sms) => {
  return {
    address: typeof (sms.address) === 'number' 
      ? `+47${sms.address}` 
      : sms.address,
    body: sms.body,
    contactName: sms.contact_name,
    date: new Date(sms.date_sent),
    readableDate: sms.readable_date,
    type: sms.type
  }
}

export const parseSmsBackup: (fileContent:string) => SmsBackup[] = (fileContent) => {
  if (parser.validate(fileContent) !== true) {
    return [];
  }
  const parsed = parseFileToJson(fileContent);
  const res = Array.isArray(parsed.smses.sms)
    ? (parsed.smses.sms as XmlSms[]).map(buildSms)
    : [buildSms(parsed.smses.sms as XmlSms)];
  return res;
}