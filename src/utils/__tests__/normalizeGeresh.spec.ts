import {normalizeGeresh} from '../normalizeGeresh';

it.each([
  ['׳', "'"],
  ["'", "'"],
  ["ק׳ץ", "ק'ץ"],
  ["ק'ץ", "ק'ץ"],
])("converts %s to %s", (input, expectedOutput) => {
  expect(normalizeGeresh(input)).toEqual(expectedOutput);
});
