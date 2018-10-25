import * as React from 'react';
import { STORE_COINS } from 'app/constants/Stores';
import { observer, inject } from 'mobx-react';
import { CoinsList } from 'app/components/CoinsList';
import { CoinsStore } from 'app/stores/CoinsStore';

@inject(STORE_COINS)
@observer
export class CoinsApp extends React.Component<any, any> {

  private coinsStore;
  constructor(props?: any, context?: any) {
    super(props, context);
    this.coinsStore = this.props[STORE_COINS] as CoinsStore;
  }

  componentDidMount() {
    this.coinsStore.fetchCoins()
  }

  render() {

    return (
      <div className="container">
        <h1>CoinsApp Container </h1>
        <CoinsList coins={this.coinsStore.coins} />
      </div>
    );
  }
}
