import { useState } from "react";
import { FormProps } from ".";

const FormHooks = (props: FormProps) => {
  const { initialValues } = props;
  const [form, setForm] = useState(initialValues || {});

  return {
    form,
    setForm
  }
};

export default FormHooks;
