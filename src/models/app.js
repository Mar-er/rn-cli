import { AsyncStorage } from 'react-native';
import { createAction, NavigationActions, Storage } from '../utils';
import * as authService from '../services/auth';

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false);
      yield put(createAction('updateState')({ login, loading: false }));

      AsyncStorage.getAllKeys().then((res) => {
        console.log(33, res);
      });

      Storage.get('persist:root').then((res) => {
        console.log(38, res);
      });

      if (login) {
        yield put(NavigationActions.navigate({ routeName: 'Home' }));
      } else {
        yield put(NavigationActions.navigate({ routeName: 'Login' }));
      }
    },
    * login({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }));
      const login = yield call(authService.login, payload);
      if (login) {
        yield put(NavigationActions.back());
      }
      yield put(createAction('updateState')({ login, fetching: false }));
      Storage.set('login', login);
      console.log('login');
    },
    * logout(action, { call, put }) {
      yield call(Storage.set, 'login', false);
      yield put(createAction('updateState')({ login: false }));
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' });
    },
  },
};
