/* eslint-disable prettier/prettier */
import React from 'react';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './Redux/Store';
import AppNavigator from './app-navigator/AppNavigator';
import { authSaga } from './Redux/Saga';

const middleware = [];
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middleware));
const createAppropriateStore = createStore;
const store = createAppropriateStore(rootReducer, composeWithDevTools(...enhancers));
sagaMiddleware.run(authSaga);
function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}
export default App;
