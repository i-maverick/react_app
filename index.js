import React, {Component} from "react";
import "./App.css";


class SearchBar extends Component {
    constructor(props) {
        super(props);

        // this.handleFilterTextChange  = this.handleFilterTextChange.bind(this);
        // this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked)
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..."
                    value={this.filterText}
                    onChange={this.handleFilterTextChange.bind(this)} />
                <p>
                    <input type="checkbox"
                        checked={this.inStockOnly}
                        onChange={this.handleInStockChange.bind(this)} />
                        &nbsp;Show only stocked products
                </p>
            </form>
        );
    }
}

class ProductRow extends Component {
    render() {
        const product = this.props.product;
        const price = product.stocked
            ? <span style={{color: "red"}}>{product.price}</span>
            : product.price;
        return (
            <tr>
                <td>{product.name}</td>
                <td>{price}</td>
            </tr>
        )
    }
}

class ProductTable extends Component {
    render() {
        const all_products = this.props.products;
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const products = all_products.filter((product) =>
            product.name.indexOf(filterText) !== -1 && (product.stocked || !inStockOnly)
        );

        const rows = products.map((product) => {
            return <ProductRow product={product} key={product.name} />
        });

        // let rows = [];
        // products.forEach(function(product) {
        //     if (product.name.indexOf(filterText) !== -1 && (product.stocked || !inStockOnly))
        //         rows.push(<ProductRow product={product} key={product.name} />);
        // });

        return (
            <table width="500">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            </table>
        )
    }
}

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);

        this.products = props.products;
        this.state = {
            filterText: '',
            inStockOnly: false,
        };

        // this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        // this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({ filterText: filterText });
    }

    handleInStockChange(inStockOnly) {
        this.setState({ inStockOnly: inStockOnly })
    }

    render() {
        return (
        <div>
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange.bind(this)}
                onInStockChange={this.handleInStockChange.bind(this)}
                />
            <ProductTable
                products={this.products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                />
        </div>
        );
    }
}

const products = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
    render() { return <FilterableProductTable products={products} /> }
}

export default App;
