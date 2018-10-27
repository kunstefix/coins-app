import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app';
import { createStores } from './app/stores/createStore';
import { CoinModel } from 'app/models/CoinModel';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { CoinsApi } from 'app/data/CoinsApi';
import { createBrowserHistory } from 'history';

const defaultCoins = [
  new CoinModel(1, "Bitcoin", 3, "BTC", 324, 23),
  new CoinModel(2, "Litecoin", 3, "BTC", 324, 23),
  new CoinModel(3, "Ethereum", 3, "BTC", 324, 23),
  new CoinModel(4, "Dogecoin", 3, "BTC", 324, 12)
];

//create rest API instance
const coinsApi = new CoinsApi();

// enable MobX strict mode
useStrict(true);

// prepare MOBX store
const history = createBrowserHistory();
const rootStore = createStores(history, coinsApi, defaultCoins);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App store={rootStore} history={history} />
  </Provider>
  ,
  document.getElementById('root')
);
