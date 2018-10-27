import * as React from 'react';
import { Table, DropdownButton, MenuItem, Panel, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react';
import { fiats } from 'app/constants/Fiat';
import { CoinsItemRow } from '../CoinsItemRow';
import { STORE_COINS, STORE_ROUTER } from 'app/constants/Stores';
import { CoinsStore } from 'app/stores/CoinsStore';
import { RouterStore } from 'mobx-react-router';

export interface CoinsListProps {
}

export interface CoinsListState {
}

@inject(STORE_COINS, STORE_ROUTER)
@observer
export class CoinsList extends React.Component<CoinsListProps, CoinsListState> {

    private coinsStore: CoinsStore;
    private routerStore: RouterStore;

    constructor(props?: CoinsListProps, context?: any) {
        super(props, context);
        this.coinsStore = this.props[STORE_COINS] as CoinsStore;
        this.routerStore = this.props[STORE_ROUTER] as RouterStore;
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        this.coinsStore.fetchCoins();
    }

    selectCoin = () => {
        //temp test call
        this.coinsStore.fetchCoins();
    }


    private handleClickItemRow = (id) => {
        this.routerStore.push(`/details/${id}`);
    };

    selectFiat(fiat: string) {
        this.coinsStore.setSelectedFiat(fiat);
        this.coinsStore.fetchCoins();
    }

    renderDropdown(id) {

        return (
            <DropdownButton
                onSelect={(selectedFiat) => this.selectFiat(selectedFiat)}
                bsStyle="info"
                title={this.coinsStore.selectedFiat}
                id={`dropdown-${id}`}
            >
                {fiats.map((fiat) => (
                    <MenuItem key={fiat} eventKey={fiat}>
                        {fiat}
                    </MenuItem>
                ))}
            </DropdownButton>
        );
    }

    render() {
        const coins = this.coinsStore.coins;

        return (
            <Panel>
                <Panel.Heading>
                    <h3>List
                        &nbsp;&nbsp;
                        <Button onClick={this.refreshList}>
                            <span className="glyphicon glyphicon-refresh">
                            </span>
                        </Button>
                        &nbsp;&nbsp;
                        {this.coinsStore.loading && <span>Loading...</span>}
                    </h3>
                </Panel.Heading>

                <Panel.Body>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Rank</th>
                                <th>Symbol</th>
                                <th>Price in the selected fiat currency</th>
                                <th>24 hour change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map((coin, index) => (
                                <CoinsItemRow key={index} coin={coin} onItemClick={() => this.handleClickItemRow(coin.id)} />
                            ))}
                        </tbody>
                    </Table>
                </Panel.Body>
            </Panel>);
    }
}