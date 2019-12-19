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

  componentDidMount() {
    const { fields, form } = this.context;
    const { name, validators } = this.props;
    const validation = validators || [];

    fields[name] = {
      touched: false,
      errors: validation
        .map(validate => validate(form[name]))
        .filter(error => error)
    }
  }

  onChange(value: any) {
    const { setForm } = this.context;

    setForm(this._formatForm(value));
  }

  handleNativeField(event: InputEvent) {
    const { setForm } = this.context;
    const { target: { value } } = event;

    setForm(this._formatForm(value));
  }

  _formatForm(value: any): any {
    const { fields, setFields, form } = this.context;
    const { name, validators } = this.props;
    const validation = validators || [];

    const tempForm = JSON.parse(JSON.stringify(form));

    setFields({
      ...fields,
      [name]: {
        touched: true,
        errors: validation
          .map(validate => validate(value))
          .filter(error => error)
      }
    });

    if (value) {
      tempForm[name] = value;
    } else {
      delete tempForm[name];
    }

    return tempForm;
  }

  render(): React.ReactNode {
    const { name, renderComponent, validators, children, ...rest } = this.props;
    const { form, fields } = this.context;

    return (
      <> {
        renderComponent
          ?
          FieldWapper(renderComponent, {
            onChange: this.onChange,
            meta: fields[name],
            input: {
              ...rest,
              name,
              value: form[name] || '',
              onChange: this.handleNativeField
            }
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
