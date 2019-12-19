import Field from './Components/Field';
import Form from './Components/Form';
import { isEmail, isNumber, isRequired } from './shared/utils/validators';

export type Props = { text: string }

export {
  Field,
  Form,
  isEmail,
  isNumber,
  isRequired
};
