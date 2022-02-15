import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
import { removeUserInfo } from '../../auth/redux/authReducer';
import { API_PATHS } from '../../../configs/api';
export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object | FormData,
  auth = true,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(url, {
        method,
        body: typeof body === 'object' ? JSON.stringify(body) : body,
        headers:
          contentType !== 'multipart/form-data'
            ? {
                'Content-Type': contentType || 'application/json',
                Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
              }
            : {},
        cache: 'no-store',
      }).then(response => {
        switch (url) {
          case API_PATHS.photo:
            if(method === "get"){
              // // Step 1: obtain a reader
              // const reader = response.body?.getReader();
              // // Step 2: get total length
              // const contentLength = response.headers.get('Content-Length') ? parseInt(response.headers.get('Content-Length')): 0;
              // // Step 3: read the data
              // let receivedLength = 0; // received that many bytes at the moment
              // while(true) {
              //   const {done , value} = await reader?.read();
  
              //   if (done) {
              //     break;
              //   }
  
              //   receivedLength += value.length;
  
              //   console.log(`Received ${receivedLength} of ${contentLength}`)
              // }
            }
            break;
          default:
            break;
        }
        return response
      });
      
      

    const json = await res.json();

    if (res.status === RESPONSE_STATUS_UNAUTHORIZED) {
      // dispatch logout, remove access token here.
      dispatch(removeUserInfo())
      Cookies.remove(ACCESS_TOKEN_KEY)
    }

    return json;
    // throw new Error('Error');
    } catch (error) {
      console.log(error)
    }
  };
}
