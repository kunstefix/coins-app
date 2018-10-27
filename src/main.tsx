import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app';
import { createStores } from './app/stores/createStore';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { CoinsApiClient } from 'app/data/CoinsApiClient';
import { createBrowserHistory } from 'history';

//create rest API instance
const coinsApiClient = new CoinsApiClient();

// enable MobX strict mode
useStrict(true);

// prepare MOBX store
const history = createBrowserHistory();
const rootStore = createStores(history, coinsApiClient);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App store={rootStore} history={history} />
  </Provider>
  ,
  document.getElementById('root')
);
