export class CoinModel {
    constructor(
        public id?: number,
        public name?: string,
        public rank?: number,
        public symbol?: string,
        public price?: number,
        public change24h?: number,
        public volume24h?: number,
        public market_cap?: number,
        public change1h?: number,
        public change7d?: number,
        public total_supply?: number,
        public circulating_supply?: number,

    ) { }
}