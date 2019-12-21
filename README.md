# Formaction

> A library for react forms management

> 100% code coverage with Jest

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
import React from 'react'

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
          name='labeledField'
          type='email'
          label='Email'
          validators={[isEmail]}
        />

        <button type='submit'>Click me</button>
      </Form>
    );
  }
}
```

## Can I controll my form?

Yes, you can pass state and a onChange handler to form, and controll it by yourself.
Knows what it means? Exactually, if we need it, we can store the form state in redux.
It's still running validations before successfully submitting the form.

```tsx
import React from 'react'

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
        initialValues={{ 'name': 'Gabriel Oak' }}
        onSubmit={values => this.handleSubmit(values)}
        onChange={values => this.handleChange(values)}
        values={this.state.form}
      >
        <Field
          name='name'
          type='text'
        />

        <Field
          name='email'
          type='email'
          validators={[isEmail]}
        />

        <button type='submit'>Click me</button>
      </Form>
    );
  }
}
```

## Creating a personalised component

Fild component may have a renderComponent property, it takes a component, that component
will be rendered rather than native html input. Field will pass by props all the native input
props, like value and onChange, and a meta object. Meta contains info about validators errors and
if field has been touched.

```tsx
import React from 'react'

import { Form, Field, isRequired } from 'formaction';

const renderSelect = props => {
  const { input, meta: { touched, errors } } = props;

  return (
    <div>
      <select
        {...input}
      >
        <option value='happiness'>Be happy</option>
        <option value='cool'>Be coll</option>
      </select>
      <div>
        {touched && errors[0]}
      </div>
    </div>
  );
}

class Example extends React.Component {

  handleSubmit(values) {
    console.log(values);
  }

  render () {
    return (
      <Form
        onSubmit={values => this.handleSubmit(values)}
      >
        <Field
          name='someCoolLabel'
          renderComponent={renderSelect}
          validators={[isRequired]}
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

## Validators:

Validators are just pure functions, they receive input value, and do something, and then return a
string containing the error, or just undefined. You can build your own validators.

```tsx
export const isEmail = (value: string) => (
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'This field must be of type email'
    : undefined
);

export const isNumber = (value: any) => (
  !value || !isNaN(+value)
    ? undefined
    : 'This field must be of type number'
);

export const isRequired = (value?: any) => (
  value || typeof value === 'number'
    ? undefined
    : 'This field is mandatory'
);


```

## And yes, it works with [MATERIAL-UI](https://material-ui.com/)

```tsx
import React from 'react';
import { Form, Field } from 'formaction';
import { TextField } from '@material-ui/core';


const renderTextField = props => {
  const {
    input,
    meta: { touched, error },
    ...rest
  } = props;

  return (
    <TextField
      {...input}
      {...rest}
      error={touched && error[0]}
      helperText={touched && error[0]}
      className="Field"
    />
  );
}

class Example extends React.Component {

  handleSubmit(values) {
    console.log(values);
  }

  render () {
    return (
      <Form
        onSubmit={values => this.handleSubmit(values)}
      >
        <Field
          name='user'
          label="Usuário"
          variant="outlined"
          className='poweeeeeeer'
          renderComponent={renderTextField}
        />

        <button type='submit'>Click me</button>
      </Form>
    );
  }
}

```

## License

MIT © [gabriel-Oak](https://github.com/gabriel-Oak)
