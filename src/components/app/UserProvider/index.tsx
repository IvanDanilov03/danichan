import { signInAnonymously } from 'firebase/auth';
import React, { useEffect, useMemo } from 'react';
import { useAuth, useUser } from 'reactfire';

export interface UserContextInterface {
  uid?: string;
  username?: string;
}

export const UserContext = React.createContext<UserContextInterface>({});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const { data: user } = useUser();
  const { uid, displayName } = user ?? {};

  useEffect(() => {
    if (!uid) {
      signInAnonymously(auth);
    }
  }, [auth, uid]);

  const context = useMemo(
    () => ({
      uid,
      username: displayName === null ? undefined : displayName,
    }),
    [uid, displayName],
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
