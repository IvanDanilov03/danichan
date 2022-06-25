import React, { ReactNode } from 'react';
import * as firebase from 'firebase/app';
import {
  FirestoreProvider,
  AuthProvider,
  FirebaseAppProvider,
} from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const app = firebase.initializeApp({
    apiKey: 'AIzaSyDXZlsWGapR84lINikLYzZvd3HFVOJfKn8',
    authDomain: 'danichan-9bd52.firebaseapp.com',
    projectId: 'danichan-9bd52',
    storageBucket: 'danichan-9bd52.appspot.com',
    messagingSenderId: '762188304491',
    appId: '1:762188304491:web:c54621fbc247d057ce612e',
    measurementId: 'G-N0BFTK5WXK',
  });

  const firestore = getFirestore(app);
  const auth = getAuth(app);

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirestoreProvider sdk={firestore}>
        <AuthProvider sdk={auth}>{children}</AuthProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
};

export default FirebaseProvider;
