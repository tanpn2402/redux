import React from 'react';
import PlaceOrderFNO from './PlaceOrderFNO';

export default class PlaceOrder extends React.Component {
    render() {
        return (
            <PlaceOrderFNO {...this.props} />
        )
    }
}