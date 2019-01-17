export function mapStateToProps(selectors) {
  return (state, props) => {
    const mapStateToProps = {};

    for (var k in selectors) {
      mapStateToProps[k] = selectors[k](state, props);
    }

    return mapStateToProps;
  };
}

export default mapStateToProps;
