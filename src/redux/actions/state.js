import AsyncStorage from '@react-native-community/async-storage';

export function addItem(data) {
  return async (dispatch, getState) => {
    const newList = [...getState().state.list, data];
    try {
      await AsyncStorage.setItem('@list', JSON.stringify(newList));
    } catch (e) {}
    dispatch(getListFromAsyncStorage());
  };
}

export function removeItem(id) {
  return async (dispatch, getState) => {
    const newList = getState().state.list.filter((e) => e.id !== id);
    try {
      await AsyncStorage.setItem('@list', JSON.stringify(newList));
    } catch (e) {}
    dispatch(getListFromAsyncStorage());
  };
}
export function finishedItem(id) {
  return async (dispatch, getState) => {
    const newList = getState().state.list;
    newList.forEach((e, i) => {
      if (e.id === id) newList[i].done = true;
    });
    try {
      await AsyncStorage.setItem('@list', JSON.stringify(newList));
    } catch (e) {}
    dispatch(getListFromAsyncStorage());
  };
}
export function getListFromAsyncStorage(data) {
  return async (dispatch, getState) => {
    try {
      const value = await AsyncStorage.getItem('@list');
      if (value !== null) {
        dispatch({type: 'LOAD_LIST', data: JSON.parse(value)});
      }
    } catch (e) {}
  };
}
