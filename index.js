class SearchBar extends React.Component {
	constructor(props) {
  	super(props)
    this.handleChange = this.handleChange.bind(this)
  }

	handleChange() {
  	this.props.onUserInput(
    	this.filterTextInput.value,
      this.stockOnlyInput.checked
    )
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..."
          value={this.props.filterText}
          ref={(input) => this.fieldTextInput = input}
          onChange={this.handleChange} />
        <p>
          <input type="checkbox"
            checked={this.props.stockOnly}
            ref={(input) => this.stockOnlyInput = input}
            onChange={this.handleChange} />
              &nbsp;Show only stocked products
        </p>
      </form>
    );
  }
}

class ProductRow extends React.Component {
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

class ProductTable extends React.Component {
	render() {
  	var rows = []
    this.props.products.forEach((product) => {
    	if (product.name.indexOf(this.props.filterText) === -1 ||
      	!product.stocked && this.props.stockOnly) {
      	return
      }
			rows.push(<ProductRow product={product} key={product.name} />)
    })
  	return (
      <table>
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

class FilterableProductTable extends React.Component {
	constructor(props) {
  	super(props)
    this.state = {
    	filterText: '',
      stockOnly: false,
    }
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          stockOnly={this.state.stockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          stockOnly={this.state.stockOnly}
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

ReactDOM.render(
  <FilterableProductTable products={products} />,
  document.getElementById('app')
);
