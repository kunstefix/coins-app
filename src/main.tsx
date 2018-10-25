import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app';
import { createStores } from './app/stores/createStore';
import { CoinModel } from 'app/models/CoinModel';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { CoinsApi } from 'app/data/CoinsApi';

const defaultCoins = [
  new CoinModel("Bitcoin", 3, "BTC", 324, 23),
  new CoinModel("Litecoin", 3, "BTC", 324, 23),
  new CoinModel("Ethereum", 3, "BTC", 324, 23),
  new CoinModel("Dogecoin", 3, "BTC", 324, 12)
];

//create rest API instance
const coinsApi = new CoinsApi();

// enable MobX strict mode
useStrict(true);

// prepare MOBX store
const rootStore = createStores(coinsApi, defaultCoins);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
