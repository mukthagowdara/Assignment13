import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleDestroy = this.handleDestroy.bind(this)
    }

    handleDestroy(id) {
        this.props.onDestroy(id)
    }
    
    render() {
        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
        let rows = [];

        productsArray.forEach((product) => {

            console.log("inside table")
            console.log(product)

            if (product.product.name.indexOf(this.props.filterText) === -1) {
                return;
            }

            console.log(product.product.instock)

            rows.push(
                <ProductRow
                    product={product}
                    key={product._id}
                    onDestroy={this.handleDestroy}/>
            )
        });

        return (
            <div>
                <table class="table table-striped table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable