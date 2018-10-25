import * as React from 'react';
import { Button, Grid, Row, Col, Table } from 'react-bootstrap'
import { observer } from 'mobx-react';
import { CoinModel } from 'app/models/CoinModel';

export interface CoinsListProps {
    coins: CoinModel[];
    onRefresh: () => any;
}

export interface CoinsListState {
}

@observer
export class CoinsList extends React.Component<CoinsListProps, CoinsListState> {

    constructor(props?: CoinsListProps, context?: any) {
        super(props, context);

    }
    private handleClickRefreshButton = (e: React.SyntheticEvent<any>) => {
        this.props.onRefresh();
      };

    render() {
        const { coins } = this.props;

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <Button
                            onClick={this.handleClickRefreshButton}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>rank</th>
                                    <th>symbol</th>
                                    <th>price in the selected fiat currency</th>
                                    <th>24 hour change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coins.map((todo) => (
                                    <tr key={todo.name}>
                                        <td>{todo.name}</td>
                                        <td>{todo.rank}</td>
                                        <td>{todo.symbol}</td>
                                        <td>{todo.change24h}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button bsStyle="primary">Primary</Button>
                    </Col>
                </Row></Grid>
        );
    }
}