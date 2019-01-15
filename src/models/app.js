import SInfo from 'react-native-sensitive-info';
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
      SInfo.getAllItems({
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      }).then((value) => {
        console.log(36, JSON.parse(value['persist:root']));
      });
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
