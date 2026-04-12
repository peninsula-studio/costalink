import React from "react";

type UserModalContextProps = {
  isUserModalVisible: boolean;
  setIsUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModalContext = React.createContext({} as UserModalContextProps);

export function UserModalProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [isUserModalVisible, setIsUserModalVisible] =
    React.useState<boolean>(false);

  return (
    <UserModalContext.Provider
      value={{ isUserModalVisible, setIsUserModalVisible }}
    >
      {children}
    </UserModalContext.Provider>
  );
}

export const useUserModalContext = () => React.useContext(UserModalContext);
