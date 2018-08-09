import { reduxPage, initStore } from 'commons/redux';
import Home, { REDUCER_NAME, reducer } from 'modules/home';

export default reduxPage(initStore(REDUCER_NAME, reducer))(Home);
