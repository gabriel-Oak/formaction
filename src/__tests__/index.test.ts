import { Form, Field, isEmail } from "..";

describe('Index', () => {
  it('should import Form', () => {
    expect(Form).toBeTruthy()
  });

  it('should import Field', () => {
    expect(Field).toBeTruthy()
  });

  it('should import isEmail', () => {
    expect(isEmail).toBeTruthy()
  });

});
