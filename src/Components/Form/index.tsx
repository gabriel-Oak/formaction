/**
 * @component Form
 */
import * as React from 'react'
import FormHooks, { FormProps } from './hooks';
import { FormContext } from '../../shared/context';


const Form: React.FC = (props: FormProps) => {
  const {
    form,
    setForm,
    updateEffect,
    children,
    onSubmit,
    onChange,
    ...rest
  } = FormHooks(props);


  updateEffect(() => {
    onChange && onChange(form);
  }, [form]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  }


  return (
    <form
      {...rest}
      onSubmit={handleSubmit}
    >
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
