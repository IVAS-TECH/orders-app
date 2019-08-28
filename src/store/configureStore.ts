import { Store, applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer, { State } from './reducer';
import { enhancer as locationEnhancer, middleware as locationMiddleware } from './location/reducer';
import rootSaga from './saga/root';

export default function configureStore(preloadedState: Partial<State> = {}): Store<State> {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(locationMiddleware, sagaMiddleware);
    const enhancers = compose(locationEnhancer, middlewares);
    const store = createStore(reducer, preloadedState, enhancers);
    sagaMiddleware.run(rootSaga);

    return store;
};