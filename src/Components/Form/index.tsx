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
    fields,
    setFields,
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
    const tempFields = JSON.parse(JSON.stringify(fields));

    const valid = Object
      .keys(fields)
      .every(
        key => {
          tempFields[key].touched = true;
          return !fields[key].errors;
        }
      );

    if (!valid) {
      setFields(tempFields);
      return;
    }

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
