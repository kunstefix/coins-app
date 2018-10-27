import { CoinsStore } from './CoinsStore';
import { CoinModel } from '../models/CoinModel';
import { STORE_COINS, STORE_ROUTER } from 'app/constants/Stores';
import { CoinsApi } from 'app/data/CoinsApi';
import RouterStore from './RouterStore';
import { History } from 'history';


export function createStores(history: History, coinsApi: CoinsApi, defaultCoins?: CoinModel[]) {

  const coinsStore = new CoinsStore(defaultCoins, coinsApi);
  const routerStore = new RouterStore(history);
  return {
    [STORE_COINS]: coinsStore,
    [STORE_ROUTER]: routerStore,
  };
}
