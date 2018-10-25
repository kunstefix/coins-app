import * as React from 'react';

export class Root extends React.Component<any, any> {
  
  render() {
    return (
      <div className="container">
        <h1>Hello world</h1>
        {this.props.children}
      </div>
    );
  }
}
