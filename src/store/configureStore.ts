import { Store, applyMiddleware, compose, createStore } from 'redux';
import reducer, { State } from './reducer';
import { enhancer, middleware } from './location/reducer';

export default function configureStore(/*preloadedState: State*/): Store<State> {
    const middlewares = applyMiddleware(middleware);
    const enhancers = compose(enhancer, middlewares);
    const store = createStore(reducer, /*preloadedState, */enhancers);

    return store;
};