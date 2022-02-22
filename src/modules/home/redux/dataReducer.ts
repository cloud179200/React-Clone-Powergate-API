import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPayroll, IPhoto } from '../../../models/data';

export interface DataState {
  photos: Array<IPhoto>;
  photosFetchProgress: number;
  payroll?:IPayroll
}

export const setPhotos = createCustomAction('set/setPhotos', (data: Array<IPhoto>) => ({
  data,
}));
export const setPhotosFetchProgress = createCustomAction('set/setPhotosFetchProgress', (data: number) => ({
    data,
  }));
  export const setPayroll = createCustomAction('set/setPayroll', (data: IPayroll) => ({
    data,
  }));

const actions = { setPhotos, setPhotosFetchProgress, setPayroll };

type Action = ActionType<typeof actions>;

export default function reducer(state: DataState = {photos:[], photosFetchProgress: 0}, action: Action) {
  switch (action.type) {
    case getType(setPhotos):
      return { ...state, photos: action.data };
    case getType(setPhotosFetchProgress):
      return { ...state, photosFetchProgress: action.data };
    case getType(setPayroll):
      return {...state, payroll: action.data}
    default:
      return state;
  }
}
