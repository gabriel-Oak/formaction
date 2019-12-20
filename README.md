# Formaction

> A library for react forms management

[![NPM](https://img.shields.io/npm/v/formaction.svg)](https://www.npmjs.com/package/formaction)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save formaction
```


```bash
yarn add formaction
```

## Usage

Basically the form take a submit handler, then call the handler with form state,
if all validations pass.

```tsx
import * as React from 'react'

import { Form, Field, isEmail } from 'formaction';

class Example extends React.Component {
  handleSubmit(values) {
    console.log(values);
  }

  render () {
    return (
      <Form
        initialValues={{ 'Forms with fun': 'hola' }}
        onSubmit={values => this.handleSubmit(values)}
      >
        <Field
          name='name'
          type='text'
        />

        <Field
          name='name'
          type='email'
          validators={[isEmail]}
        />

        <button type='submit'>Click me</button>
      </Form>
    );
  }
}
```
## Can i controll my form?

Yes, you can pass state and a onChange handler to form, and controll it by yourself.
Knows what it means? Exactually, if we need it, we can store the form state in redux.
It's still running validations before successfully submitting the form.

```tsx
import * as React from 'react'

import { Form, Field, isEmail } from 'formaction';

class Example extends React.Component {
  constructor() {
    super();

    this.state = {
      form: {}
    }
  }

  handleSubmit(values) {
    console.log(values);
  }

  handleChange(form) {
    this.setState({
      form
    });
  }

  render () {
    return (
      <Form
        initialValues={{ 'Forms with fun': 'hola' }}
        onSubmit={values => this.handleSubmit(values)}
        onSubmit={values => this.handleChange(values)}
      >
        <Field
          name='name'
          type='text'
        />

        <Field
          name='name'
          type='email'
          validators={[isEmail]}
        />

        <button type='submit'>Click me</button>
      </Form>
    );
  }
}
```

## License

MIT © [gabriel-Oak](https://github.com/gabriel-Oak)
