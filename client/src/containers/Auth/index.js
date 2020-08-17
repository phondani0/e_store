import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

function Auth(props) {

  useEffect(() => {
    props.getAuth();
  }, []);

  return (<></>);
}

export default connect(
  null,
  actions
)(Auth);