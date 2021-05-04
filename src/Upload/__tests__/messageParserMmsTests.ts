import { parseMessageBackup, isMms, MessageSenderType, MmsBackup, outgoingMmsAddressToken, MmsPartType } from '../messageParser';
import { 
  defaultAddressWithCountryCode,
  defaultContactName,
  defaultDate,
  defaultReadableDate,
  defaultBody,
  defaultType,
  buildXmlFile,
  buildMmsXmlElement,
  MmsXmlElementType,
  base64EncodedImage,
  imageName
 } from './utils/xmlBuilders';

test('parseMessageBackup with xml fileContent with mms with address with country code, returns expected result', () => {
  const xml = buildXmlFile([], [buildMmsXmlElement( { address: defaultAddressWithCountryCode, dateSent: defaultDate } as MmsXmlElementType )])

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isMms(res[0])).toBe(true);

  const mms = res[0] as MmsBackup;

  expect(mms.address).toEqual(defaultAddressWithCountryCode);
  expect(mms.contactName).toEqual(defaultContactName);
  expect(mms.type).toEqual(defaultType);
  expect(mms.date).toEqual(defaultDate);
  expect(mms.readableDate).toEqual(defaultReadableDate);
});

test('parseMessageBackup with xml fileContent with mms with address without country code, returns expected result', () => {
  const address = '81549300';
  const xml = buildXmlFile([], [buildMmsXmlElement({ address, dateSent: defaultDate } as MmsXmlElementType)]);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isMms(res[0])).toBe(true);
  
  const mms = res[0] as MmsBackup;

  expect(mms.address).toEqual(`+47${address}`);
  expect(mms.contactName).toEqual(defaultContactName);
  expect(mms.type).toEqual(defaultType);
  expect(mms.date).toEqual(defaultDate);
  expect(mms.readableDate).toEqual(defaultReadableDate);
});

test('parseMessageBackup with xml fileContent with mms without date_sent, uses date as fallback', () => {
  const xml = buildXmlFile([], [buildMmsXmlElement({ date: defaultDate } as MmsXmlElementType)]);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isMms(res[0])).toBe(true);

  const mms = res[0] as MmsBackup;
  expect(mms.date).toEqual(defaultDate);
});

test('parseMessageBackup with xml fileContent with mms with addresses, sets expected type', () => {
  const incomingMmsContact = 'Maks Mekker';
  const outGoingMmsContact = 'Bjarne Betjent';
  const incomingMms = buildMmsXmlElement({ fromAddress: defaultAddressWithCountryCode, toAddress: '+4791504800', contactName: incomingMmsContact, dateSent: defaultDate } as MmsXmlElementType);
  const outgoingMms = buildMmsXmlElement({fromAddress: outgoingMmsAddressToken, toAddress: defaultAddressWithCountryCode, contactName: outGoingMmsContact, dateSent: defaultDate } as MmsXmlElementType);

  const xml = buildXmlFile([], [incomingMms, outgoingMms]);
  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(2);

  expect(res.find(m => isMms(m) && m.type === MessageSenderType.Incoming)?.contactName).toEqual(incomingMmsContact);
  expect(res.find(m => isMms(m) && m.type === MessageSenderType.Outgoing)?.contactName).toEqual(outGoingMmsContact);
});

test('parseMessageBackup with xml fileContent with mms with parts, maps all parts except part with smil mime type', () => {
  const xml = buildXmlFile([], [buildMmsXmlElement({ date: defaultDate } as MmsXmlElementType)]);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isMms(res[0])).toBe(true);
  
  const mms = res[0] as MmsBackup;
  expect(mms.parts.length).toEqual(2);
  
  expect(mms.parts[0].type).toEqual(MmsPartType.Image);
  expect(mms.parts[0].base64EncodedImage).toEqual(base64EncodedImage);
  expect(mms.parts[0].text).toBe(null);
  expect(mms.parts[0].name).toEqual(imageName);

  expect(mms.parts[1].type).toEqual(MmsPartType.Text);
  expect(mms.parts[1].base64EncodedImage).toBe(null);
  expect(mms.parts[1].text).toEqual(defaultBody);
  expect(mms.parts[1].name).toBeDefined(); // don't really care
});
