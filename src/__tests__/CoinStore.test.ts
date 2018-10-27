import { CoinsStore } from "app/stores/CoinsStore";
import { CoinsApiClient } from "app/data/CoinsApiClient";
import { CoinModel } from "app/models/CoinModel";

describe("CoinsStore", () => {
  let apiClient: CoinsApiClient;
  let store: CoinsStore;

  beforeEach(() => {
    apiClient = new CoinsApiClient();
    store = new CoinsStore(apiClient);
  });

  it("fetchCoin should call apiClient method", () => {
    const apiClientSpy = spyOn(apiClient, 'getCoin')
    store.fetchCoin(1);
    expect(apiClientSpy).toHaveBeenCalledWith("EUR", 1);
  });

  it("fetchCoin should set coin property", () => {
    const coinMockObject = new CoinModel(1, "test", 123, "test", 123, 12, 12, 12, 12, 12, 12, 12);

    spyOn(apiClient, 'getCoin').and.callFake(() => { return coinMockObject });

    store.fetchCoin(1).then(() => {
      expect(store.coin).toEqual(coinMockObject);
    });
  });

  it("fetchCoins should call apiClient method", () => {
    const apiClientSpy = spyOn(apiClient, 'getCoins').and.callFake(() => { });
    store.fetchCoins();
    expect(apiClientSpy).toHaveBeenCalled();
  })

  it("fetchCoins should set coins property", () => {
    const coinMockObject = new CoinModel(1, "test", 123, "test", 123, 12, 12, 12, 12, 12, 12, 12);
    const coinsMockArray = [coinMockObject, coinMockObject, coinMockObject];

    spyOn(apiClient, 'getCoin').and.callFake(() => { return coinsMockArray });

    store.fetchCoins().then(() => {
      expect(store.coins).toEqual(coinsMockArray);
    });
  });

  it("setSelectedFiat should set fiat property", () => {
    const fiat = "USD";
    store.setSelectedFiat(fiat);
    expect(store.selectedFiat).toEqual(fiat);
  })

  it("startLoading should set loading property", () => {
    store.startLoading();
    expect(store.loading).toEqual(true);
  })

  it("stopLoading should set loading property", () => {
    store.stopLoading();
    expect(store.loading).toEqual(false);
  })

});