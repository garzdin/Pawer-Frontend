import { bindActionCreators } from 'redux';

export function mapDispatchToActions(actionCreators) {
  return (dispatch) => {
    const dispatchToProps = { dispatch };

    Object.keys(actionCreators).forEach((k) => {
      dispatchToProps[k] = bindActionCreators(actionCreators[k], dispatch);
    });

    return dispatchToProps;
  };
}

export default mapDispatchToActions;
