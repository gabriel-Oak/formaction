import * as React from 'react';
import { InputEvent } from '.';

interface WrapperProps {
  onChange: Function;
  meta: {
    touched: boolean,
    errors: string[]
  }
  input: {
    onChange: (event: InputEvent) => void;
    onBlur: (event: InputEvent) => void;
    value?: string;
    name: string;
  }
}

const FieldWapper = (RenderField: any, props: WrapperProps) => (
  <RenderField {...props} />
);

export default FieldWapper;
