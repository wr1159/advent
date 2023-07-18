import { capitalizeFirstLetter } from "../capitalizeLetter";

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    const input = 'hello';
    const expectedOutput = 'Hello';

    const result = capitalizeFirstLetter(input);

    expect(result).toBe(expectedOutput);
  });

  it('does not change the string if the first letter is already capitalized', () => {
    const input = 'World';
    const expectedOutput = 'World';

    const result = capitalizeFirstLetter(input);

    expect(result).toBe(expectedOutput);
  });

  it('works with an empty string', () => {
    const input = '';
    const expectedOutput = '';

    const result = capitalizeFirstLetter(input);

    expect(result).toBe(expectedOutput);
  });
});