import React, { Component } from 'react'

import { Form, Field } from 'formaction'

const render = props => {
  const { value, onChange, name } = props;

  return <input
    value={value}
    name={name}
    onChange={e => onChange(e.target.value)}
  />
}

export default class App extends Component {


  render() {

    return (
      <Form initialValues={{ 'Forms with fun': 'hola' }}>
        <Field name='Forms with fun' />
        <div>
          sadsdasa
        </div>
        <div>
          <Field name='fun' />
          <div>
            <Field name='Forms with fun' renderComponent={render} />
          </div>
        </div>
      </Form>
    );
  }
}
