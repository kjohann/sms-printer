import { parseMessageBackup } from '../messageParser';
import { buildXmlFile, buildMmsXmlElement, buildSmsXmlElement, SmsXmlElementType, MmsXmlElementType } from './utils/xmlBuilders';

test('parseMessageBackup with fileContent with multiple sms and mms, returns messages ordered by date', () => {
  const message1 = buildSmsXmlElement({ dateSent: new Date(2021, 0, 1), contactName: 'First' } as SmsXmlElementType);
  const message2 = buildMmsXmlElement({ dateSent: new Date(2021, 0, 2), contactName: 'Second' } as MmsXmlElementType);
  const message3 = buildSmsXmlElement({ dateSent: new Date(2021, 0, 3), contactName: 'Third' } as SmsXmlElementType);
  const message4 = buildMmsXmlElement({ dateSent: new Date(2021, 0, 4), contactName: 'Fourth' } as MmsXmlElementType);
  const message5 = buildMmsXmlElement({ dateSent: new Date(2021, 0, 5), contactName: 'Fifth' } as MmsXmlElementType);
  const message6 = buildSmsXmlElement({ dateSent: new Date(2021, 0, 6), contactName: 'Sixth' } as SmsXmlElementType);
  
  const xml = buildXmlFile([message6, message3, message1], [message5, message2, message4]);

  const res = parseMessageBackup(xml);
  expect(res.length).toEqual(6);
  expect(res[0].contactName).toEqual('First');
  expect(res[1].contactName).toEqual('Second');
  expect(res[2].contactName).toEqual('Third');
  expect(res[3].contactName).toEqual('Fourth');
  expect(res[4].contactName).toEqual('Fifth');
  expect(res[5].contactName).toEqual('Sixth');
});