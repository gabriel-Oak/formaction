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
  label?: string;
  renderComponent?: React.FC | any;
  validators?: Array<(value: any) => string | undefined>;
}

class Field extends React.PureComponent<FieldProps> {

  static contextType = FormContext;

  constructor(props: FieldProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleNativeChange = this.handleNativeChange.bind(this);
    this.handleNativeBlur = this.handleNativeBlur.bind(this);
  }

  componentDidMount() {
    const { fields, form } = this.context;
    const { name } = this.props;

    fields[name] = {
      touched: false,
      errors: this._getErrors(form[name])
    }
  }

  onChange(value: any) {
    const { updateForm } = this.context;

    updateForm(this._formatForm(value));
  }

  handleNativeChange(event: InputEvent) {
    const { updateForm } = this.context;
    const { target: { value } } = event;

    updateForm(this._formatForm(value));
  }

  handleNativeBlur(_event: InputEvent) {
    const { fields, setFields } = this.context;
    const { name } = this.props;

    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        touched: true
      }
    });
  }

  _formatForm(value: any): any {
    const { fields, setFields, form } = this.context;
    const { name } = this.props;

    const tempForm = JSON.parse(JSON.stringify(form));

    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        errors: this._getErrors(value)
      }
    });

    if (value) {
      tempForm[name] = value;
    } else {
      delete tempForm[name];
    }

    return tempForm;
  }

  _getErrors(value: any): any[] {
    let validation = this.props.validators || [];
    return validation
      .map(validate => validate(value))
      .filter(error => error);
  }

  render(): React.ReactNode {
    const { name, label, renderComponent, validators, children, ...rest } = this.props;
    const { form, fields } = this.context;

    return (
      <> {
        renderComponent
          ?
          FieldWapper(renderComponent, {
            onChange: this.onChange,
            meta: fields[name] || {},
            input: {
              ...rest,
              name,
              value: form[name] || '',
              onChange: this.handleNativeChange,
              onBlur: this.handleNativeBlur
            }
          })
          :
          <>
            {
              label &&
              <label htmlFor={name}>
                {label}
              </label>
            }
            <input
              {...rest}
              name={name}
              value={form[name] || ''}
              onChange={this.handleNativeChange}
            />
          </>
      } </>
    );
  }
}

export default Field
