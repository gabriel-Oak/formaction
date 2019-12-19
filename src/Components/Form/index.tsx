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
    useEffect,
    fields,
    setFields,
    children,
    onSubmit,
    onChange,
    ...rest
  } = FormHooks(props);


  useEffect(() => {
    onChange && onChange(form);
  }, [form]);

  useEffect(() => {
    setFields(fields);
  }, [fields]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tempFields = JSON.parse(JSON.stringify(fields));

    const inValid = Object
      .keys(tempFields)
      .some(
        key => {
          tempFields[key].touched = true;
          return tempFields[key].errors.length;
        }
      );

    if (inValid) {
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
        setForm,
        fields,
        setFields
      }}>

        {children}

      </FormContext.Provider>
    </form>
  );
}

export default Form;
