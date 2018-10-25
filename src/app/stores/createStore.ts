import { CoinsStore } from './CoinsStore';
import { CoinModel } from '../models/CoinModel';
import { STORE_COINS } from 'app/constants/Stores';
import { CoinsApi } from 'app/data/CoinsApi';

export function createStores( coinsApi: CoinsApi, defaultCoins?: CoinModel[]) {
  const coinsStore = new CoinsStore(defaultCoins, coinsApi);
  return {
    [STORE_COINS]: coinsStore,
  };
}
