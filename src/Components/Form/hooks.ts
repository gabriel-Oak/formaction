import { useState, useEffect, ReactNode } from "react";

export type FormProps = {
  children: ReactNode;
  initialValues?: any;
  values?: any;
  onSubmit: (values: any) => void;
  onChange?: (values: any) => void;
}


const FormHooks = (props: FormProps) => {
  const { initialValues, onChange, values, ...rest } = props;
  const [form, setForm] = useState(initialValues || {});
  const [fields, setFields] = useState({});

  const updateForm = (data: any) => {
    values ? onChange && onChange(data) : setForm(data);
  }

  return {
    form,
    fields,
    setFields,
    useEffect,
    updateForm,
    values,
    onChange,
    ...rest
  }
};

export default FormHooks;
