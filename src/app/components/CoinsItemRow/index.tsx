import * as React from "react";
import { CoinModel } from "app/models/CoinModel";
import { observer } from "mobx-react";


export interface CoinsItemProps {
    coin: CoinModel;
    onItemClick?: () => any;
}

export interface CoinsItemState {
}

@observer
export class CoinsItemRow extends React.Component<CoinsItemProps, CoinsItemState> {

    constructor(props?: CoinsItemProps, context?: any) {
        super(props, context);
    }

    private handleClickItem = (e: React.SyntheticEvent<any>) => {
        this.props.onItemClick();
    };

    render() {
        const coin = this.props.coin;
        return (
            <tr style={{cursor: 'pointer'}} key={coin.name} onClick={ this.handleClickItem } >
                <td>{coin.name}</td>
                <td>{coin.rank}</td>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
                <td>{coin.change24h}</td>
            </tr>
        );
    }

}