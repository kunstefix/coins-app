import { CoinsStore } from './CoinsStore';
import { STORE_COINS, STORE_ROUTER } from 'app/constants/Stores';
import { CoinsApiClient } from 'app/data/CoinsApiClient';
import RouterStore from './RouterStore';
import { History } from 'history';


export function createStores(history: History, coinsApi: CoinsApiClient) {

  const coinsStore = new CoinsStore(coinsApi);
  const routerStore = new RouterStore(history);
  return {
    [STORE_COINS]: coinsStore,
    [STORE_ROUTER]: routerStore,
  };
}
