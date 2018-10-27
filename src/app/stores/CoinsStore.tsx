import { observable, action, runInAction } from 'mobx';
import { CoinModel } from '../models/CoinModel';
import { CoinsApiClient } from 'app/data/CoinsApiClient';


export class CoinsStore {

    constructor(coinsApi: CoinsApiClient) {
        this.coins = [];
        this.coinsApi = coinsApi;
        this.coin = new CoinModel()
    }

    readonly coinsApi: CoinsApiClient;

    @observable public coin: CoinModel;
    @observable public coins: Array<CoinModel>;
    @observable public selectedFiat: string = 'EUR';
    @observable public loading: boolean = false;

    @action async fetchCoins() {
        this.startLoading();
        const retrievedCoins = await this.coinsApi.getCoins(this.selectedFiat);
        runInAction(() => {
            this.coins = retrievedCoins;
            this.stopLoading();
        });
    }

    @action async resetCoin() {
        this.coin = new CoinModel();
    }

    @action async fetchCoin(id: number) {
        this.startLoading();
        const retrievedCoin = await this.coinsApi.getCoin(this.selectedFiat, id);
        runInAction(() => {
            this.coin = retrievedCoin;
            this.stopLoading();
        });
    }

    @action setSelectedFiat(fiat: string) {
        this.selectedFiat = fiat;
    }

    @action startLoading(){
        this.loading = true;
    }

    @action stopLoading(){
        this.loading = false;
    }

}
