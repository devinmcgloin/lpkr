const DefaultOnSSR = () => <span></span>;

class WithoutSSR extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      canRender: false,
    };
  }

  componentDidMount() {
    this.setState({ canRender: true });
  }

  render() {
    const { children, onSSR = <DefaultOnSSR /> } = this.props;
    const { canRender } = this.state;

    return canRender ? children : onSSR;
  }
}

export { WithoutSSR };
