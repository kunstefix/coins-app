import * as React from 'react';
import { Button, Grid, Row, Col, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { observer, inject } from 'mobx-react';
import { CoinModel } from 'app/models/CoinModel';
import { fiats } from 'app/constants/Fiat';
import { CoinsItemRow } from '../CoinsItemRow';
import { STORE_COINS } from 'app/constants/Stores';
import { CoinsStore } from 'app/stores/CoinsStore';

export interface CoinsListProps {
    coins: CoinModel[];
    onRefresh: () => any;
}

export interface CoinsListState {
}


@inject(STORE_COINS)
@observer
export class CoinsList extends React.Component<CoinsListProps, CoinsListState> {

    private coinsStore: CoinsStore;
    constructor(props?: CoinsListProps, context?: any) {
        super(props, context);
        this.coinsStore = this.props[STORE_COINS] as CoinsStore;
    }

    selectCoin = () => {
        this.coinsStore.fetchCoins();
    }

    private handleClickRefreshButton = (e: React.SyntheticEvent<any>) => {
        this.props.onRefresh();
    };

    private handleClickItemRow = () => {

    };

    selectFiat(fiat: string){
        this.coinsStore.setSelectedFiat(fiat);
        this.coinsStore.fetchCoins();
    }

    renderTable() {
        const { coins } = this.props;

        return <Table striped bordered condensed hover>
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
                    <CoinsItemRow key={index} coin={coin} onItemClick={this.handleClickItemRow} />
                ))}
            </tbody>
        </Table>;
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

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <Button onClick={this.handleClickRefreshButton}>
                            Refresh
                        </Button>
                        {this.renderDropdown(1)}
                    </Col>
                </Row>
                <br />
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        {this.renderTable()}
                    </Col>
                </Row></Grid>
        );
    }
}