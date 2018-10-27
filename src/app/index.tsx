import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Root } from 'app/containers/Root';
import { Router, Switch, Route } from 'react-router';
import { CoinDetails } from './components/CoinDetails';
import { CoinsList } from './components/CoinsList';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Settings } from './components/Settings/Settings';


// render react DOM
export const App = hot(module)(({ store, history }) => (
  <Root>
    <Navigation routerStore={store.routerStore} />
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={CoinsList} />
        <Route exact path="/details/:id" component={CoinDetails} />
        <Route  exact path="/settings" component={Settings} />

      </Switch>
    </Router>
  </Root>
));

function Navigation({ routerStore }) {
  return (
    <Navbar>
      <Nav>
        <NavItem eventKey={1} onClick={() => routerStore.push("/")}>
          Home
          </NavItem>
        <NavItem eventKey={2} onClick={() => routerStore.push("/settings")}>
          <span className="glyphicon glyphicon-cog"></span>
        </NavItem>
      </Nav>
    </Navbar>
  );

}