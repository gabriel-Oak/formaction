import * as React from "react";

const updateForm: any = {};
const setFields: any = {};

export const FormContext = React.createContext({
  form: {},
  updateForm,
  fields: {},
  setFields,
});
