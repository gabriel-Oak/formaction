import React from 'react'
import { Form, Field, isRequired } from 'formaction';

const Home = () => {
  return (
    <main>
      home
      <Form
        onSubmit={values => { console.log(values) }}
        initialValues={{ test: 'try to get me' }}
      >
        <Field
          name='test'
          validators={[isRequired]}
          renderComponent={({ input }) => (
            <input {...input} />
          )}
        />
      </Form>
    </main>
  );
}

export default Home;
