import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import withRedux from 'next-redux-wrapper';
import { reducer as form } from 'redux-form';

export const initStore = (
  name = 'CURRENT_PAGE',
  reducer = () => ({}),
) => (initialState) => {
  const rootReducer = combineReducers({
    form,
    [name]: reducer,
  });

  return createStore(
    rootReducer, initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
};

export const reduxPage = makeStore => comp => withRedux(makeStore)(comp);

