import { parseMessageBackup } from '../messageParser';

test('parseMessageBackup with fileContent that is not valid xml, returns empty array', () => {
  expect(parseMessageBackup('something not xml')).toEqual([]);
});
