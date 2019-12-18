import React, { Component } from 'react'

import { Form, Field } from 'formaction'

export default class App extends Component {

  render() {
    return (
      <Form initialValues={{'Forms with fun': 'hola'}}>
        <Field name='Forms with fun' />
        <div>
          sadsdasa
        </div>
        <div>
          <Field name='fun' />
          <div>
            <Field name='Forms with fun' />
          </div>
        </div>
      </Form>
    );
  }
}
