import type { Action } from '../../../redux/type';

export const initialState = {
  clients: [],
};

export const reducerClients = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'clients/load':
      return {
        ...state,
        clients: action.payload,
      };
    case 'client/updateStatus':
      return {
        ...state,
        clients: action.payload,
      };

    default:
      return state;
  }
};
