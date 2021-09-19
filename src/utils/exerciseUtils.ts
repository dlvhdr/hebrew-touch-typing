export const getNumOfCorrectCharacters = (
  input: string,
  text: string,
): number => {
  return Array.from(input).reduce((numCorrectCharacters, character, index) => {
    return numCorrectCharacters + (text.charAt(index) === character ? 1 : 0);
  }, 0);
};
