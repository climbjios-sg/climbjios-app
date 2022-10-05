import React, { createContext, useReducer } from 'react';
import { User } from 'src/@types/user';
import { NewUserContextType } from 'src/@types/auth';

enum Types {
  EditName = 'EDIT_NAME',
  EditTelegram = 'EDIT_TELEGRAM',
  EditUsername = 'EDIT_USERNAME',
}

interface NewUserActions {
  type: Types;
  payload: string;
}

const initialState: User = {
  id: undefined,
  name: '',
  telegramHandle: '',
  username: '',
};

const defaultContext: NewUserContextType = {
  user: initialState,
  updateName: (input: string) => {},
  updateTelegram: (input: string) => {},
  updateUsername: (input: string) => {},
  hasFilledProfile: () => false,
  hasFilledOnboardingInfo: () => false,
};

/*
  NewUserContext is only used during onboarading process for new users.
  It temporarily stores the inputted name, telegram handle and username.
  One all 3 fields are filled & pass validation, they will be written into the JWTContext.
  Thereafter, NewUserContext can be ignored.
*/
const NewUserContext = createContext<NewUserContextType>(defaultContext);

const newUserReducer = (state: User, action: NewUserActions) => {
  const { type, payload } = action;
  switch (type) {
    case Types.EditName:
      return {
        ...state,
        name: payload,
      };
    case Types.EditTelegram:
      return {
        ...state,
        telegramHandle: payload,
      };
    case Types.EditUsername:
      return {
        ...state,
        username: payload,
      };
    default:
      return state;
  }
};

interface NewUserProviderProps {
  children: React.ReactNode;
}

const NewUserProvider = ({ children }: NewUserProviderProps) => {
  const [state, dispatch] = useReducer(newUserReducer, initialState);
  const user = state;

  const updateName = (input: string) => {
    dispatch({ type: Types.EditName, payload: input });
  };
  const updateTelegram = (input: string) => {
    dispatch({ type: Types.EditTelegram, payload: input });
  };
  const updateUsername = (input: string) => {
    dispatch({ type: Types.EditUsername, payload: input });
  };

  const hasFilledProfile = () => !!state.name && !!state.telegramHandle;
  const hasFilledOnboardingInfo = () => !!state.name && !!state.telegramHandle && !!state.username;
  return (
    <NewUserContext.Provider
      value={{
        user,
        updateName,
        updateTelegram,
        updateUsername,
        hasFilledProfile,
        hasFilledOnboardingInfo,
      }}
    >
      {children}
    </NewUserContext.Provider>
  );
};

export { NewUserProvider, NewUserContext, initialState };
