import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterText: '',
            products: []
        }

        console.log(this.state.products)
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }

        var item = {
            "id": product.id,
            "product": {
               "productid": product.productid,
               "category": product.category,
               "price": product.price,
               "name": product.name,
               "instock": product.instock
              }
        }

        console.log("inside product")
        console.log(item)
        
        fetch('http://localhost:3001/product/create', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })

        this.setState((prevState) => {
            let products = prevState.products
            products.push(item)
            return { products }
        })
    }

    handleDestroy(productId) {

        fetch('http://localhost:3001/product/delete/' + productId, {
                method: 'delete'
            })

        this.setState((prevState) => {
            let products = prevState.products.filter(product => product.id !== productId);
            return { products }
        });
    }

    handleUpdate(product) {

        console.log(product)
        // this.setState((prevState) => {
        //     let products = prevState.products

        //     fetch('http://localhost:3001/product/delete/' + productId, {
        //         method: 'delete'
        //     })

        //     delete products[productId]
        //     return { products }
        // });
    }

    componentDidMount() {
        fetch("http://localhost:3001/product/get")
            .then(res => res.json())
            .then(products => this.setState({products: products}))
            .catch(err => console.log(err.message));
    }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}
                    onUpdate={this.handleUpdate}></ProductTable>
                <ProductForm
                    onSave={this.handleSave}></ProductForm>
            </div>
        )
    }
}

export default Products