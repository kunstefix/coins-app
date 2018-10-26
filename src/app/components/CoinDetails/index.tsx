import { CoinModel } from "app/models/CoinModel";
import { observer } from "mobx-react";
import * as React from "react";


export interface CoinDetailsProps {
    coin: CoinModel;
}

export interface CoinDetailsState {
}

@observer
export class CoinDetails extends React.Component<CoinDetails, CoinDetailsState> {

    render() {
        return (
            <h1>Coin details component</h1>
        );
    }
}