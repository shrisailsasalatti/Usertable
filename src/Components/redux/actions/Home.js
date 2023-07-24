import { getData } from "../../util/api";
import { REQUESTING, SUCCESS, ERROR } from "../../constants/constant";

export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const GET_USER_SUCCESS = "GET_USER_SUCCESS"
export const GET_USER_FAILURE = "GET_USER_FAILURE"


export function getUsersRequest() {
    return {
        type: GET_USER_REQUEST,
        status: REQUESTING
    }
}

export function getUsersSuccess(payload) {
    console.log("test", payload)
    return {
        type: GET_USER_SUCCESS,
        status: SUCCESS,
        payload
    }
}

export function getUsersFailure(error) {
    console.log("test2", error)
    return {
        type: GET_USER_FAILURE,
        status: ERROR,
        payload: {error}
    }
}

export const getUsers = () => {
    return async (dispatch) => {
      dispatch(getUsersRequest());
      try {
        const url = `users?page=1`;
        const result = await getData(url);
        const json = await result.data;
        if (json.error) {
          throw new Error(json.message);
        }
        if (json.status === 200) {
          return dispatch(getUsersSuccess(json.result));
        } else {
          return dispatch(getUsersFailure(json.message));
        }
      } catch (e) {
        return dispatch(getUsersFailure(e.message));
      }
    };
  };