import React from '../../../../../../../.cache/typescript/2.9/node_modules/@types/react';
import { Header } from './Header';
import { Body } from './Body';

export const withLayout = WrapComponent => (props) => {
  const Component = () => (
    <React.Fragment>
      <Header />
      <Body>
        <WrapComponent {...props} />
      </Body>
    </React.Fragment>
  );
  return <Component />;
};
