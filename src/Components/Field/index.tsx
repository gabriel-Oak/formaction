import * as React from 'react';
import { FormContext } from '../../shared/context';
import FieldWapper from './FieldWrapper';

interface InputEvent {
  target: {
    value: string;
  };
  preventDefault: Function;
}

export type FieldProps = {
  name: string;
  renderComponent: React.FC | any;
  className?: string;
  validators?: Function[];
  disabled?: boolean;
  readonly?: boolean;
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

    if (typeof value === 'number') {
      value = String(value);
    }

    setForm(this._formatForm(form, value));
  }

  handleNativeField(event: InputEvent) {
    const { setForm, form } = this.context;
    const { target: { value } } = event;

    setForm(this._formatForm(form, value));
  }

  _formatForm(form: any, value: string | any[] | any): any {
    const tempForm = JSON.parse(JSON.stringify(form));

    if (value.length) {
      tempForm[this.props.name] = value;
    } else {
      delete tempForm[this.props.name];
    }

    return tempForm;
  }

  render(): React.ReactNode {
    const { name, renderComponent } = this.props;
    const { form } = this.context;

    return (
      <> {
        renderComponent
          ?
          FieldWapper(renderComponent, {
            name: name,
            value: form[name] || '',
            onChange: this.onChange,
          })
          :
          <input
            name={name}
            value={form[name] || ''}
            onChange={this.handleNativeField}
          />
      } </>
    );
  }
}

export default Field
