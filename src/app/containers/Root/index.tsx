import * as React from 'react';

export class Root extends React.Component<any, any> {


  render() {
    return (
      <React.Fragment>
        <div className="jumbotron text-center">
          <h2>Cryptocurrency list</h2>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
