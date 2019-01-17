import { bindActionCreators } from "redux";

export function mapDispatchToActions(actionCreators) {
  return (dispatch, getState) => {
    const mapDispatchToProps = { dispatch };

    for (var k in actionCreators) {
      mapDispatchToProps[k] = bindActionCreators(actionCreators[k], dispatch);
    }

    return mapDispatchToProps;
  };
}

export default mapDispatchToActions;
