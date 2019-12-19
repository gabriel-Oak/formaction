import * as React from 'react';
import { act, create, ReactTestRenderer, ReactTestRendererTree } from 'react-test-renderer';
import Field from '../../Components/Field';
import { FormContext } from '../../shared/context';

describe('Field', () => {
  let wrapper: ReactTestRenderer;
  let updateForm: () => {};
  let setFields: () => {};

  const renderInput = (props: any) => {
    const { input, meta: { touched, errors } } = props;
    return (
      <div>
        <input
          {...input}
        />
        <div>
          {touched && errors[0]}
        </div>
      </div>
    );
  }

  const getProps = (tree: ReactTestRendererTree | null) => {
    const field = tree && tree.rendered;
    const props = field && field[1].props;

    return props;
  }

  beforeEach(() => {
    updateForm = jest.fn();
    setFields = jest.fn();

    wrapper = create(
      <FormContext.Provider value={{
        updateForm,
        form: {},
        fields: {},
        setFields
      }}>
        <Field
          name={'happyField'}
          renderComponent={renderInput}
        />
      </FormContext.Provider>
    );
  });

  it('should match snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should handle native change', () => {
    const { input: { onChange } } = getProps(wrapper.toTree());

    act(() => {
      onChange({ target: { value: 'hello' } });
    });

    expect(setFields).toHaveBeenCalledWith({
      happyField: {
        touched: false,
        errors: []
      }
    });

    expect(updateForm).toHaveBeenCalledWith({
      happyField: 'hello'
    });
  });

  it('should handle native blur', () => {
    const { input: { onBlur } } = getProps(wrapper.toTree());

    act(() => {
      onBlur({});
    });

    expect(setFields).toHaveBeenCalledWith({
      happyField: {
        touched: true,
        errors: []
      }
    });
  });

  it('should Field onChange', () => {
    const { onChange } = getProps(wrapper.toTree());

    act(() => {
      onChange();
    });

    expect(setFields).toHaveBeenCalledWith({
      happyField: {
        touched: false,
        errors: []
      }
    });

    expect(updateForm).toHaveBeenCalledWith({});
  });
});
