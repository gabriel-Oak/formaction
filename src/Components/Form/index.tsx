/**
 * @component Form
 */
import * as React from 'react'
import FormHooks from './hooks';
import { FormContext } from '../../shared/context';

export type FormProps = {
  children: React.ReactNode;
  initialValues?: any;
}

const Form: React.FC = (props: FormProps) => {
  const { children } = props;
  const {form, setForm} = FormHooks(props);
  console.log(form);


  return (
    <form>
      <FormContext.Provider value={{
        form,
        setForm
      }}>

        {children}

      </FormContext.Provider>
    </form>
  );
}

export default Form;
