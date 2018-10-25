export class CoinModel {
    constructor(
        public name: string,
        public rank: number,
        public symbol: string,
        public price: number,
        public change24h: number,
    ) { }
}