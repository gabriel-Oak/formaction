/**
 * @component Form
 */
import * as React from 'react'
import { FormContext } from '../../shared/context';

export type FormProps = {
  children: React.ReactNode;
  initialValues?: any;
}

const Form: React.FC = (props: FormProps) => {
  const { children, initialValues } = props;
  const [form, setForm] = React.useState(initialValues || {});


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
