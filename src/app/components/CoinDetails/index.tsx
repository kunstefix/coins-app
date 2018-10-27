import { CoinModel } from "app/models/CoinModel";
import { observer, inject } from "mobx-react";
import * as React from "react";
import { STORE_COINS, STORE_ROUTER } from "app/constants/Stores";
import { CoinsStore } from "app/stores/CoinsStore";
import { Panel, Button } from "react-bootstrap";


export interface CoinDetailsProps {
    coin: CoinModel;
    match: any
}

export interface CoinDetailsState {
}

@inject(STORE_COINS, STORE_ROUTER)

@observer
export class CoinDetails extends React.Component<CoinDetailsProps, CoinDetailsState> {

    private coinsStore: CoinsStore;

    constructor(props?: CoinDetailsProps, context?: any) {
        super(props, context);
        this.coinsStore = this.props[STORE_COINS] as CoinsStore;
    }

    componentDidMount() {
        this.refreshCoin();
    }

    componentWillUnmount(){
        this.coinsStore.resetCoin();
    }

    refreshCoin = () => {
        this.coinsStore.fetchCoin(this.props.match.params.id);
    }

    render() {
        const coin = this.coinsStore.coin;
        const {
            name,
            price,
            rank,
            symbol,
            market_cap,
            volume24h,
            change24h,
            change1h,
            change7d,
            total_supply,
            circulating_supply,

        } = coin;

        return (coin &&
            <Panel>
                <Panel.Heading>
                    <h3>{coin.name} &nbsp;
                        <Button onClick={this.refreshCoin}>
                            <span className="glyphicon glyphicon-refresh">
                            </span>
                        </Button>
                        &nbsp; &nbsp;
                        {this.coinsStore.loading && <span>Loading...</span>}
                    </h3>

                </Panel.Heading>
                <Panel.Body>
                    <dl>
                        <dt>Name</dt>
                        <dd>{name}</dd>
                        <br />

                        <dt>Rank</dt>
                        <dd>{rank}</dd>
                        <br />

                        <dt>Price</dt>
                        <dd>{price}</dd>
                        <br />

                        <dt>Symbol</dt>
                        <dd>{symbol}</dd>
                        <br />

                        <dt>Marcet cap</dt>
                        <dd>{market_cap}</dd>
                        <br />

                        <dt>Volume 24h</dt>
                        <dd>{volume24h}</dd>
                        <br />

                        <dt>Change 24h</dt>
                        <dd>{change24h}</dd>
                        <br />

                        <dt>Change 7h</dt>
                        <dd>{change7d}</dd>
                        <br />

                        <dt>Change 1h</dt>
                        <dd>{change1h}</dd>
                        <br />

                        <dt>Total supply</dt>
                        <dd>{total_supply}</dd>
                        <br />

                        <dt>Cicrulating supply</dt>
                        <dd>{circulating_supply}</dd>
                        <br />


                    </dl>
                </Panel.Body>
            </Panel>
        );
    }
}