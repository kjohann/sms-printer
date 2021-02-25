import { parseSmsBackup, SmsType } from '../smsParser';

const defaultAddress = '+4781549300';
const defaultContactName = 'Bowler';
const defaultDate = new Date(1996, 1, 10);
const defaultReadableDate = '10. februar 1996';
const defaultBody = 'Kykkeli klemmetid!';
const defaultType = SmsType.Incoming;

const buildSmsXmlElement = ({ address = defaultAddress, contactName = defaultContactName, date = defaultDate, readableDate = defaultReadableDate, body = defaultBody, type = (defaultType as number) }) => `
<sms protocol="0" address="${address}" date="1526486361000" type="${type}" subject="null" body="${body}" toa="null" sc_toa="null" service_center="+4790002100" read="1" status="-1" locked="0" date_sent="${date.getTime()}" sub_id="1" readable_date="${readableDate}" contact_name="${contactName}" />
`.trim();

const buildXmlFile = (smsElements: string[]) => {
  const smsElementsXml = smsElements.join('');
  return `
  <?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
  <smses count="${smsElements.length}" backup_set="839ed921-e4dd-487d-977d-cbde32cbb658" backup_date="1611162725896" type="full">
    ${smsElementsXml}
  </smses>
  `.trim();
}

test('parseSmsBackup with fileContent that is not valid xml, returns empty array', () => {
  expect(parseSmsBackup('something not xml')).toEqual([]);
});

test('parseSmsBackup with xml fileContent with sms with address with country code, returns expected result', () => {
  const xml = buildXmlFile([buildSmsXmlElement({})]);

  const res = parseSmsBackup(xml);

  expect(res.length).toEqual(1);
  expect(res[0].address).toEqual(defaultAddress);
  expect(res[0].contactName).toEqual(defaultContactName);
  expect(res[0].body).toEqual(defaultBody);
  expect(res[0].type).toEqual(defaultType);
  expect(res[0].date).toEqual(defaultDate);
  expect(res[0].readableDate).toEqual(defaultReadableDate);
});

test('parseSmsBackup with xml fileContent with sms with address without country code, returns expected result', () => {
  const address = '81549300';
  const xml = buildXmlFile([buildSmsXmlElement({ address })]);

  const res = parseSmsBackup(xml);

  expect(res.length).toEqual(1);
  expect(res[0].address).toEqual(`+47${address}`);
  expect(res[0].contactName).toEqual(defaultContactName);
  expect(res[0].body).toEqual(defaultBody);
  expect(res[0].type).toEqual(defaultType);
  expect(res[0].date).toEqual(defaultDate);
  expect(res[0].readableDate).toEqual(defaultReadableDate);
});

test('parseSmsBackup with xml fileContent with sms with type outgoing, returns expected result', () => {
  const xml = buildXmlFile([buildSmsXmlElement({ type: SmsType.Outgoing })]);

  const res = parseSmsBackup(xml);

  expect(res.length).toEqual(1);
  expect(res[0].address).toEqual(defaultAddress);
  expect(res[0].contactName).toEqual(defaultContactName);
  expect(res[0].body).toEqual(defaultBody);
  expect(res[0].type).toEqual(SmsType.Outgoing);
  expect(res[0].date).toEqual(defaultDate);
  expect(res[0].readableDate).toEqual(defaultReadableDate);
});