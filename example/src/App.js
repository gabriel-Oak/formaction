import React, { Component } from 'react'

import { Form, ExampleComponent } from 'formaction'

export default class App extends Component {

  render() {
    return (
      <Form>
        <ExampleComponent text='Forms with fun' />
        <div>
          sadsdasa
        </div>
        <div>
          <ExampleComponent text='Forms with fun' />
          <div>
            <ExampleComponent text='Forms with fun' />
          </div>
        </div>
      </Form>
    );
  }
}
