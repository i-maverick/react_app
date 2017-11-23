import React, {Component} from "react";
import "./App.css";


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange  = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
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
          value={this.props.filterText}
          onChange={this.handleFilterTextChange} />
        <p>
          <input type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange} />
              &nbsp;Show only stocked products
        </p>
      </form>
    );
  }
}

class ProductRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.stocked ? 'yes' : 'no'}</td>
      </tr>
    )
  }
}

class ProductTable extends Component {
  render() {
    let rows = [];
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 ||
        !product.stocked && this.props.inStockOnly) {
        return
      }
      rows.push(<ProductRow product={product} key={product.name} />)
    });
    return (
      <table width="500">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>In stock</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
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
    render() {
      return <FilterableProductTable products={products} />
    }
}

export default App;
