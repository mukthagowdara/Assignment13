import React, { Component } from 'react'

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
    }

    destroy() {
        this.props.onDestroy(this.props.product.id);
    }

    render () {
        return (
            <tr>
                <td>{this.props.product.product.productid}</td>
                <td>{this.props.product.product.name}</td>
                <td>{this.props.product.product.category}</td>
                <td>${this.props.product.product.price}</td>
                <td>{this.props.product.product.instock==='true' ? 'Yes' : 'No'}</td>
                <td class="text-right"><button id="myBtn" onClick={this.update} class="btn btn-info">Update</button></td>
                <td class="text-right"><button onClick={this.destroy} class="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow