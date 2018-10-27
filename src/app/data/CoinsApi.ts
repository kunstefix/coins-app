import axios from 'axios';
import { CoinModel } from 'app/models/CoinModel';
import { URL_TICKER, URL_TICKER_LIMIT } from 'app/constants/Urls';

export class CoinsApi {
    constructor() { }

    async getCoins(fiat: string) {
        const url = `${URL_TICKER_LIMIT}&convert=${fiat}`
        try {
            const response = await axios.get(url);
            const dataObject = response.data.data;
            const objectsArray = Object.keys(dataObject).map(i => dataObject[i]);
            const formattedData: CoinModel[] = objectsArray.map(
                (obj) => {
                    return new CoinModel(
                        obj.id,
                        obj.name,
                        obj.rank,
                        obj.symbol,
                        obj.quotes[fiat].price.toFixed(2),
                        obj.quotes[fiat].percent_change_24h
                    );
                }
            );
            console.log("FORMATTED DATA: ", formattedData);
            return formattedData;
        } catch (error) {
            console.error(error);
        }
    }

    async getCoin(fiat: string, id: number) {
        const url = `${URL_TICKER}${id}/?convert=${fiat}`
        try {
            const response = await axios.get(url);
            const dataObject = response.data.data;
            console.log("RETRIEVED DATA SPECIFIC: ", dataObject);

            const obj = new CoinModel(
                dataObject.id,
                dataObject.name,
                dataObject.rank,
                dataObject.symbol,
                dataObject.quotes[fiat].price.toFixed(2),
                dataObject.quotes[fiat].percent_change_24h,
                dataObject.quotes[fiat].volume_24h,
                dataObject.quotes[fiat].market_cap,
                dataObject.quotes[fiat].percent_change_1h,
                dataObject.quotes[fiat].percent_change_7d,
                dataObject.total_supply,
                dataObject.circulating_supply,
            );

            return obj;
        } catch (error) {
            console.error(error);
        }
    }
}

