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

  refreshList = () => {
    this.coinsStore.fetchCoins();

  }


  componentDidMount() {
    this.refreshList();
  }

  render() {

    return (
      <div className="container">
        <h1>CoinsApp Container </h1>
        <CoinsList
          onRefresh={this.refreshList}
          coins={this.coinsStore.coins}
        />
      </div>
    );
  }
}
