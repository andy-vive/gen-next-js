import React from 'react';
import { connect } from 'react-redux';

const Home = () => <div>Home page</div>;

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
export { reducer, REDUCER_NAME } from './home.reducer';
