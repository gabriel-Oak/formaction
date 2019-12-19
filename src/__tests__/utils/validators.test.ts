import { isEmail, isNumber, isRequired } from "../../shared/utils/validators";

describe('Validators', () => {
  it('should return error for email', () => {
    expect(isEmail('test@jest'))
      .toBe('Esse campo deve ser do tipo e-mail');
  });

  it('should pass the email', () => {
    expect(isEmail('test@jest.com.go'))
      .toBe(undefined);
  });

  it('should return error for number', () => {
    expect(isNumber('45a'))
      .toBe('Esse campo deve ser do tipo número');
  });

  it('should pass the number', () => {
    expect(isNumber('78987'))
      .toBe(undefined);
  });

  it('should return error for required', () => {
    expect(isRequired(null))
      .toBe('Esse campo é obrigatorio');
  });

  it('should pass the required', () => {
    expect(isRequired('something'))
      .toBe(undefined);
  });
});
