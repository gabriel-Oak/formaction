import { isEmail, isNumber, isRequired } from "../../shared/utils/validators";

describe('Validators', () => {
  it('should return error for email', () => {
    expect(isEmail('test@jest'))
      .toBe('This field must be of type email');
  });

  it('should pass the email', () => {
    expect(isEmail('test@jest.com.go'))
      .toBe(undefined);
  });

  it('should return error for number', () => {
    expect(isNumber('45a'))
      .toBe('This field must be of type number');
  });

  it('should pass the number', () => {
    expect(isNumber('78987'))
      .toBe(undefined);
  });

  it('should return error for required', () => {
    expect(isRequired(null))
      .toBe('This field is mandatory');
  });

  it('should pass the required', () => {
    expect(isRequired('something'))
      .toBe(undefined);
  });
});
