import * as React from 'react';

interface FieldProps {
  name: string;
  onChange: Function;
  value?: string;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const FieldWapper = (RenderField: any, props: FieldProps) => (
  <RenderField {...props} />
);

export default FieldWapper;
