import ACTION_TYPES from './ActionTypes.js';

export const fetchData = () => ({
  type: ACTION_TYPES.API_PENDING,
});

export const fetchSuccess = (data) => ({
  type: ACTION_TYPES.API_SUCCESS,
  payload: data,
});

export const fetchMultipleSuccess = (data1,data2) => ({
  type: ACTION_TYPES.API_MULTIPLE_SUCCESS,
  payload1: data1,
  payload2: data2,
});

export const fetchError = (error) => ({
  type: ACTION_TYPES.API_ERROR,
  payload: error,
});

export const fetchAuth = (auth) => ({
  type: ACTION_TYPES.API_AUTH,
  payload: auth,
})