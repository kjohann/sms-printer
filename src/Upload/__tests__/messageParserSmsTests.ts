import { parseMessageBackup, isSms, MessageSenderType, SmsBackup } from '../messageParser';
import { 
  defaultAddressWithCountryCode,
  defaultContactName,
  defaultDate,
  defaultBody,
  defaultReadableDate,
  defaultType,
  buildXmlFile,
  buildSmsXmlElement,
  SmsXmlElementType
 } from './utils/xmlBuilders';


test('parseMessageBackup with xml fileContent with sms with address with country code, returns expected result', () => {
  const xml = buildXmlFile([buildSmsXmlElement({ dateSent: defaultDate } as SmsXmlElementType)], []);

  const res = parseMessageBackup(xml);
  expect (isSms(res[0])).toBe(true);
  expect(res.length).toEqual(1);

  const sms = res[0] as SmsBackup;

  expect(sms.address).toEqual(defaultAddressWithCountryCode);
  expect(sms.contactName).toEqual(defaultContactName);
  expect(sms.body).toEqual(defaultBody);
  expect(sms.type).toEqual(defaultType);
  expect(sms.date).toEqual(defaultDate);
  expect(sms.readableDate).toEqual(defaultReadableDate);
});

test('parseMessageBackup with xml fileContent with sms with address without country code, returns expected result', () => {
  const address = '81549300';
  const xml = buildXmlFile([buildSmsXmlElement({ address, dateSent: defaultDate } as SmsXmlElementType)], []);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isSms(res[0])).toBe(true);
  
  const sms = res[0] as SmsBackup;

  expect(sms.address).toEqual(`+47${address}`);
  expect(sms.contactName).toEqual(defaultContactName);
  expect(sms.body).toEqual(defaultBody);
  expect(sms.type).toEqual(defaultType);
  expect(sms.date).toEqual(defaultDate);
  expect(sms.readableDate).toEqual(defaultReadableDate);
});

test('parseMessageBackup with xml fileContent with sms with type outgoing, returns expected result', () => {
  const xml = buildXmlFile([buildSmsXmlElement({ type: MessageSenderType.Outgoing, dateSent: defaultDate } as SmsXmlElementType)], []);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isSms(res[0])).toBe(true);

  const sms = res[0] as SmsBackup;

  expect(sms.address).toEqual(defaultAddressWithCountryCode);
  expect(sms.contactName).toEqual(defaultContactName);
  expect(sms.body).toEqual(defaultBody);
  expect(sms.type).toEqual(MessageSenderType.Outgoing);
  expect(sms.date).toEqual(defaultDate);
  expect(sms.readableDate).toEqual(defaultReadableDate);
});

test('parseMessageBackup with xml fileContent with sms without date_sent, uses date as fallback', () => {
  const xml = buildXmlFile([buildSmsXmlElement({ date: defaultDate } as SmsXmlElementType)], []);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(1);
  expect (isSms(res[0])).toBe(true);

  const sms = res[0] as SmsBackup;
  expect(sms.date).toEqual(defaultDate);
});
