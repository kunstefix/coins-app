import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Root } from 'app/containers/Root';
import { CoinsApp } from './containers/CoinsApp';

// render react DOM
export const App = hot(module)(() => (
  <Root>
    <CoinsApp/>
  </Root>
));
