import { ReactNode, useState, createContext } from 'react';
// calls
import { authenticate } from "src/api";

export type AuthContextProps = {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  name: string;
  username: string;
  telegramUsername: string;
  accessToken: string;
  refreshToken: string;
  onLogin: VoidFunction;
  onRedirect: (accessToken: string, refreshToken: string) => void;
}

const initialState: AuthContextProps = {
  isAuthenticated: false,
  isOnboarded: false,
  name: "",
  username: "",
  telegramUsername: "",
  accessToken: "",
  refreshToken: "",
  onLogin: () => {},
  onRedirect: (accessToken: string, refreshToken: string) => {},
}

const AuthContext = createContext(initialState);

type AuthProviderProps = {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(true);
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleLogin = () => {
    authenticate();
  }

  const handleRedirect = (accessToken: string, refreshToken :string) => {
    setIsAuthenticated(true);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    // TODO: Check if user has been onboarded already or not, and update state for
    // isOnboarded
    // name
    // username
    // telegram_username
  } 

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isOnboarded,
        name,
        username,
        telegramUsername,
        accessToken,
        refreshToken,
        onLogin: handleLogin,
        onRedirect: handleRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };