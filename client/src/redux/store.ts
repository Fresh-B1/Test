import { legacy_createStore as createStore } from 'redux';
import { useDispatch } from 'react-redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

// чтобы диспатч был умным
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export default store;
