/**
 * @class ExampleComponent
 */

import * as React from 'react';

import styles from './styles.css';
import Field from './Components/Field';
import Form from './Components/Form';

export type Props = { text: string }

class ExampleComponent extends React.Component<Props> {
  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component: {text}
      </div>
    )
  }
}

export {
  Field,
  Form,
  ExampleComponent
};
