export function mapStateToProps(selectors) {
  return (state, props) => {
    const stateToProps = {};

    Object.keys(selectors).forEach((k) => {
      stateToProps[k] = selectors[k](state, props);
    });

    return stateToProps;
  };
}

export default mapStateToProps;
