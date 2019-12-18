import * as React from 'react';
import { FormContext } from '../../shared/context';
import FieldWapper from './FieldWrapper';

export interface InputEvent {
  target: {
    value: string;
  };
  type: string;
  nativeEvent: any;
  preventDefault: Function;
}

export type FieldProps = {
  name: string;
  renderComponent: React.FC | any;
  validators?: Array<(value: any) => string | undefined>;
}

class Field extends React.PureComponent<FieldProps> {

  static contextType = FormContext;

  constructor(props: FieldProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleNativeField = this.handleNativeField.bind(this);
  }

  onChange(value: any) {
    const { setForm, form } = this.context;

    setForm(this._formatForm(form, value));
  }

  handleNativeField(event: InputEvent) {
    const { setForm, form } = this.context;
    const { target: { value }, nativeEvent: { data } } = event;

    setForm(this._formatForm(form, value, data));
  }

  _formatForm(form: any, value: any, data?: string): any {
    const { name } = this.props;
    const tempForm = JSON.parse(JSON.stringify(form));

    if (value) {

      tempForm[name] = data
        ? (tempForm[name] || '') + data
        : value;
      return tempForm;
    }

    delete tempForm[name];
    return tempForm;
  }

  render(): React.ReactNode {
    const { name, renderComponent, validators, children, ...rest } = this.props;
    const { form } = this.context;

    return (
      <> {
        renderComponent
          ?
          FieldWapper(renderComponent, {
            onChange: this.onChange,
            input: {
              ...rest,
              name,
              value: form[name] || '',
              onChange: this.handleNativeField
            },
          })
          :
          <input
            {...rest}
            name={name}
            value={form[name] || ''}
            onChange={this.handleNativeField}
          />
      } </>
    );
  }
}

export default Field
