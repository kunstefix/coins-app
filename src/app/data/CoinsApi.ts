import axios from 'axios';
import { CoinModel } from 'app/models/CoinModel';
import { action } from 'mobx';
import { URL_TICKER } from 'app/constants/Urls';

export class CoinsApi {
    constructor() { }

    @action
    async getCoins(fiat: string) {
        const url = `${URL_TICKER}&convert=${fiat}`
        try {
            const response = await axios.get(url);
            const dataObject = response.data.data;
            const objectsArray = Object.keys(dataObject).map(i => dataObject[i]);
            const formattedData: CoinModel[] = objectsArray.map(
                (obj) => {
                    return new CoinModel(
                        obj.name,
                        obj.rank,
                        obj.symbol,
                        obj.quotes[fiat].price,
                        obj.quotes[fiat].percent_change_24h
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

