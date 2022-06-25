import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useMessages from '../../../hooks/useMessages';
import useThread from '../../../hooks/useThread';
import ThreadMessageForm from '../../forms/ThreadMessageForm';
import MessageList from '../../messages/MessageList';
import ErrorMessage from '../../UI/ErrorMessage';
import LoadingMessage from '../../UI/LoadingMessage';

const ThreadPage: React.FC = () => {
  const routerParams = useParams();
  const boardId = routerParams.boardId ?? '';
  const threadId = routerParams.threadId ?? '';

  const [updated, setUpdated] = useState(false);
  const update = () => setUpdated((prev) => !prev);

  const {
    status: threadObservableStatus,
    thread,
    error: threadObservableError,
  } = useThread(boardId, threadId);
  const {
    status: messagesObservableStatus,
    messages,
    error: messagesObservableError,
  } = useMessages(boardId, threadId, updated);

  if (boardId && !threadId) return <Navigate to={`/b/${boardId}`} replace />;

  if (
    threadObservableStatus === 'loading' ||
    messagesObservableStatus === 'loading'
  )
    return <LoadingMessage />;
  if (
    threadObservableStatus === 'error' ||
    messagesObservableStatus === 'error'
  )
    return (
      <ErrorMessage error={threadObservableError || messagesObservableError} />
    );

  if (!threadId || !boardId) return null;

  return (
    <div className="mt-10">
      <div className="mb-5 text-center">
        <h1 className="font-xl">/b/{boardId}</h1>
      </div>
      <div className="mb-10 text-center">
        <h1 className="font-xl">{thread.title}</h1>
      </div>
      <ThreadMessageForm
        boardId={boardId}
        threadId={threadId}
        onSend={update}
      />
      <div className="mb-5">
        <MessageList messages={messages} />
      </div>
    </div>
  );
};

export default ThreadPage;
