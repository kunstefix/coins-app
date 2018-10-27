import { observer, inject } from "mobx-react";
import * as React from "react";
import { STORE_COINS, STORE_ROUTER } from "app/constants/Stores";
import { CoinsStore } from "app/stores/CoinsStore";
import { Panel, DropdownButton, MenuItem } from "react-bootstrap";
import { fiats } from "app/constants/Fiat";


export interface SettingsProps {
}

export interface CoinDetailsState {
}

@inject(STORE_COINS, STORE_ROUTER)

@observer
export class Settings extends React.Component<SettingsProps, CoinDetailsState> {

    private coinsStore: CoinsStore;

    constructor(props?: SettingsProps, context?: any) {
        super(props, context);
        this.coinsStore = this.props[STORE_COINS] as CoinsStore;
    }

    selectFiat(fiat: string) {
        this.coinsStore.setSelectedFiat(fiat);
        this.coinsStore.fetchCoins();
    }

    render() {

        return (
            <Panel>
                <Panel.Heading>
                    <h3>Settings</h3>

                </Panel.Heading>
                <Panel.Body>
                    <DropdownButton
                        onSelect={(selectedFiat) => this.selectFiat(selectedFiat)}
                        bsStyle="primary"
                        title={this.coinsStore.selectedFiat}
                        id={`dropdown-2`}
                    >
                        {fiats.map((fiat) => (
                            <MenuItem key={fiat} eventKey={fiat}>
                                {fiat}
                            </MenuItem>
                        ))}
                    </DropdownButton>
                </Panel.Body>
            </Panel>
        );
    }
}