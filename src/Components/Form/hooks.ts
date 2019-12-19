import { useState, useEffect, ReactNode } from "react";

export type FormProps = {
  children: ReactNode;
  initialValues?: any;
  onSubmit: (values: any) => {};
  onChange?: (values: any) => {};
}


const FormHooks = (props: FormProps) => {
  const { initialValues, ...rest } = props;
  const [form, setForm] = useState(initialValues || {});
  const [fields, setFields] = useState({});


  return {
    form,
    setForm,
    fields,
    setFields,
    useEffect,
    ...rest
  }
};

export default FormHooks;
