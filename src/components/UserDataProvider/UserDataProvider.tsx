import React from 'react';
import {UseUserData, useUserData} from '../../utils/useUserData';

type UserDataContextType = UseUserData;

const UserDataContext = React.createContext<UserDataContextType | undefined>(
  undefined,
);

interface UserDataProviderProps {
  children: React.ReactNode;
}

const UserDataProvider = ({children}: UserDataProviderProps): JSX.Element => {
  const value = useUserData();
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

const useUserDataContext = (): UserDataContextType => {
  const context = React.useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserDataContext must be used within a UserDataContext');
  }
  return context;
};

export {UserDataProvider, useUserDataContext};
