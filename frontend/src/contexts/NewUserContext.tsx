import React, { createContext, useReducer } from 'react';
import { User } from 'src/@types/user';

enum NewUserActionEnum {
  EDIT = 'EDIT',
}

interface NewUserAction {
  type: NewUserActionEnum;
  field: string;
  payload: string;
}

const initialState: User = {
  id: undefined,
  name: '',
  telegramHandle: '',
  username: '',
};
const NewUserContext = createContext<{ state: User; dispatch: React.Dispatch<NewUserAction> }>({
  state: initialState,
  dispatch: () => null,
});

const newUserReducer = (state: User, action: NewUserAction) => {
  const { type, field, payload } = action;
  switch (type) {
    case NewUserActionEnum.EDIT:
      return {
        ...state,
        [field]: payload,
      };
    default:
      return state;
  }
};

interface NewUserProviderProps {
  children: React.ReactNode;
}

const NewUserProvider: React.FC<NewUserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(newUserReducer, initialState);

  return <NewUserContext.Provider value={{ state, dispatch }}>{children}</NewUserContext.Provider>;
};

export { NewUserProvider, NewUserContext, NewUserActionEnum, initialState };
