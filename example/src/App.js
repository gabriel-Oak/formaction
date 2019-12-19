import React, { Component } from 'react'

import { Form, Field } from 'formaction'
import { isEmail } from './validators';

const render = props => {
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

const render2 = props => {
  const { input, onChange } = props;

  return <input
    {...input}
    type='checkbox'
    checked={input.value}
    onChange={e => {
      onChange(!input.value);
    }}
  />
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      form: {}
    }
  }

  handleSubmit(values) {
    console.log(values);
  }

  handleChange(values) {
    console.log(values);

    this.setState({ form: values });
  }

  render() {

    return (
      <Form
        initialValues={{ 'Forms with fun': 'hola' }}
        onSubmit={values => this.handleSubmit(values)}
      >
        <Field name='Forms with fun' />
        <div>
          <Field name='fun' />
          <div>
            <Field name={456} renderComponent={render} validators={[isEmail]} />
            <Field name={457} renderComponent={render2} />
          </div>
        </div>

        <button type='submit'>Click Acki</button>
      </Form>
    );
  }
}
