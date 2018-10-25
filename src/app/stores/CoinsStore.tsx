import { observable, action, runInAction } from 'mobx';
import { CoinModel } from '../models/CoinModel';
import { CoinsApi } from 'app/data/CoinsApi';


export class CoinsStore {

    constructor(fixtures: CoinModel[], coinsApi: CoinsApi) {
        this.coins = fixtures;
        this.coinsApi = coinsApi;
    }
    readonly coinsApi: CoinsApi;
    @observable public coins: Array<CoinModel>;

    @action async fetchCoins() {
        const retrievedCoins = await this.coinsApi.getCoins();

        runInAction(() => {
            this.coins = retrievedCoins;
        });
    }

}
