import * as React from 'react';
import { FormContext } from '../../shared/context';

interface InputEvent {
  target: {
    value: string;
  };
  preventDefault: Function;
}

export type FielProps = {
  name: string;
}

class Field extends React.Component<FielProps> {

  static contextType = FormContext;

  constructor(props: FielProps) {
    super(props);
    this.handleNativeField = this.handleNativeField.bind(this);
  }

  handleNativeField(event: InputEvent) {
    const { setForm, form } = this.context;
    const { target: { value } } = event;
    const tempForm = JSON.parse(JSON.stringify(form));

    if (value.length) {
      tempForm[this.props.name] = value;
    } else {
      delete tempForm[this.props.name];
    }

    setForm(tempForm);
  }

  render(): React.ReactNode {
    const { name } = this.props;
    const { form } = this.context;

    return (
      <input
        name={name}
        value={form[name] || ''}
        onChange={this.handleNativeField}
      />
    );
  }
}

export default Field
