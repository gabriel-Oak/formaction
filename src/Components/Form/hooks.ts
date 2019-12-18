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
  const updateEffect = useEffect;

  return {
    form,
    setForm,
    updateEffect,
    ...rest
  }
};

export default FormHooks;
