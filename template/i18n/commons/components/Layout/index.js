import React from 'react';
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
