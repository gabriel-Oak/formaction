import * as React from "react";

const setForm: any = {};
const setFields: any = {};

export const FormContext = React.createContext({
  form: {},
  setForm,
  fields: {},
  setFields,
});
