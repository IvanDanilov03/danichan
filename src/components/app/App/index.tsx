import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import FirebaseProvider from '../FirebaseProvider';
import MainPage from '../../pages/MainPage';
import CommonLayout from '../../layout/CommonLayout';
import BoardPage from '../../pages/BoardPage';
import ThreadPage from '../../pages/ThreadPage';
import UserProvider from '../UserProvider';

const App = () => (
  <FirebaseProvider>
    <UserProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
        <CommonLayout>
          <Routes>
            <Route
              path="/b/:boardId/thread/:threadId"
              element={<ThreadPage />}
            />
            <Route path="/b/:boardId" element={<BoardPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CommonLayout>
      </BrowserRouter>
    </UserProvider>
  </FirebaseProvider>
);

export default App;
