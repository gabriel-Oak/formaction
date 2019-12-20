import * as React from 'react';
import FormHooks from '../../Components/Form/hooks';
import testHook from '../../shared/utils/testHooks';
import { act, create, ReactTestRenderer, ReactTestRendererTree } from 'react-test-renderer';
import Form from '../../Components/Form';
import Field from '../../Components/Field';
import { isEmail } from '../../shared/utils/validators';

describe('Form', () => {
  let wrapper: ReactTestRenderer;
  let onSubmit: () => {};
  const onChange = jest.fn();
  const formMock = { honney: 'pot' };

  const getSubmit = (tree: ReactTestRendererTree | null) => {
    const form = tree && tree.rendered;
    const props = form && form.props;
    return props && props.onSubmit
  }

  beforeEach(() => {
    onSubmit = jest.fn();
    wrapper = create(
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <Field
          name='testField'
          label='Testing is fun'
        />
      </Form>
    );
  });

  it('should match snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should submit form', () => {
    const submit = getSubmit(wrapper.toTree());

    act(() => {
      submit({ preventDefault: jest.fn() });
    });

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should not submit form', () => {
    wrapper = create(
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <Field name='testField' validators={[isEmail]} />
      </Form>
    );

    const submit = getSubmit(wrapper.toTree());

    act(() => {
      submit({ preventDefault: jest.fn() });
    });

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  describe('Hooks', () => {
    let hooks: any;

    beforeEach(() => {
      hooks = testHook(
        () => FormHooks({
          onSubmit: jest.fn(),
          children: []
        })
      );
    })

    it('should init the form with default values', () => {
      expect(hooks.form).toEqual({});
    });

    it('should init the form with pre values', () => {
      hooks = testHook(
        () => FormHooks({
          onSubmit: jest.fn(),
          children: [],
          initialValues: {
            test: 'Jest'
          }
        })
      );

      expect(hooks.form).toEqual({ test: 'Jest' });
    });

    it('should update form values', () => {
      act(() => {
        hooks.updateForm(formMock);
      });
    });

    it('should update controlled form values', () => {
      const onChange = jest.fn();

      hooks = testHook(
        () => FormHooks({
          onSubmit: jest.fn(),
          onChange,
          children: [],
          values: {
            test: 'Jest'
          }
        })
      );

      act(() => {
        hooks.updateForm(formMock);
      });

      expect(onChange).toHaveBeenCalledWith(formMock);
    });

  });
});
