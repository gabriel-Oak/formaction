import * as React from 'react';
import * as renderer from 'react-test-renderer';


export default function testHook(runHook: any) {
  const HookWrapper: React.FC = () => {
    return <span {...runHook()} />;
  }

  const wrapper = renderer
    .create(<HookWrapper />)
    .toJSON();

  return wrapper && wrapper.props;
}
