class InputName extends React.Component {
  render() {
    return <input type='text' placeholder='enter your name'/>
  }
}

class HelloMessage extends React.Component {
  static propTypes = { name = React.PropTypes.string }
  static defaultProps = { name = 'Stranger' }
  
  render() {
    return (
      <div>
        // <InputName />
        <div>Hello {this.state.name}</div>
      </div>
    )
  }

  onChangeHandler(e) {
    console.log(e.target.value)
  }
}

class Main extends React.Component {
  render() {
    return <HelloMessage />
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)
