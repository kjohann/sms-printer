import { isSms, isMms, SmsBackup, MmsBackup, MessageBackup, MessageSenderType } from '../messageParser';

const buildSms: (body: string) => SmsBackup = (body) => {
  return {
    body,
    address: '81549300',
    contactName: 'Test',
    date: new Date(),
    readableDate: 'Nothing here',
    type: MessageSenderType.Incoming
  };
}

const buildMms: () => MmsBackup = () => {
  return {
    address: '81549300',
    contactName: 'Test',
    date: new Date(),
    readableDate: 'Nothing here',
    type: MessageSenderType.Incoming,
    parts: []
  }
}

test('isSms returns true only when called with SmsBackup', () => {
  const sms = buildSms('this is a body');
  const mms = buildMms();
  
  expect(isSms(sms)).toBe(true);
  expect(isSms(mms)).toBe(false);
  expect(isSms({} as MessageBackup)).toBe(false);
});

test('isMms returns true only when called with MmsBackup', () => {
  const sms = buildSms('this is a body');
  const mms = buildMms();
  
  expect(isMms(mms)).toBe(true);
  expect(isMms(sms)).toBe(false);
  expect(isMms({} as MessageBackup)).toBe(false);
});