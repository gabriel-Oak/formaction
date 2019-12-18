import React, { Component } from 'react'

import { Form, Field } from 'formaction'
import { isEmail } from './validators';

const render = props => {
  const { input } = props;

  return <select
    {...input}
  >
    <option value='1'>1</option>
    <option value='2'>2</option>
  </select>
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
  handleSubmit(values) {
    console.log(values);
  }

  render() {

    return (
      <Form
        initialValues={{ 'Forms with fun': 'hola' }}
        onSubmit={values => this.handleSubmit(values)}
        onChange={values => this.handleSubmit(values)}
      >
        <Field name='Forms with fun' />
        <div>
          <Field name='fun' />
          <div>
            <Field name={456} renderComponent={render} validators={[isEmail]}/>
            <Field name={457} renderComponent={render2} />
          </div>
        </div>

        <button type='submit'>Click Acki</button>
      </Form>
    );
  }
}
