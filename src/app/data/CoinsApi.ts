import axios from 'axios';
import { CoinModel } from 'app/models/CoinModel';
import { action } from 'mobx';

const apilink = 'https://api.coinmarketcap.com/v2/ticker/?limit=100'

export class CoinsApi {
    constructor() { }

    @action
    async getCoins() {
        console.log("fetcham!!!");
        try {
            const response = await axios.get(apilink);
            const dataObject = response.data.data;
            const objectsArray = Object.keys(dataObject).map(i => dataObject[i]);
            const formattedData: CoinModel[] = objectsArray.map(
                (obj) => {
                    return new CoinModel(
                        obj.name,
                        obj.rank,
                        obj.symbol,
                        obj.quotes.USD.price,
                        obj.quotes.USD.percent_change_24h
                    );
                }
            );
            console.log("FORMATTED DATA: ",formattedData);
            return formattedData;
        } catch (error) {
            console.error(error);
        }
    }
}

