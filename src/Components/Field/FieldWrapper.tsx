import * as React from 'react';
import { InputEvent } from '.';

interface WrapperProps {
  onChange: Function;
  input: {
    onChange: (event: InputEvent) => void;
    value?: string;
    name: string;
  }
}

const FieldWapper = (RenderField: any, props: WrapperProps) => (
  <RenderField {...props} />
);

export default FieldWapper;
