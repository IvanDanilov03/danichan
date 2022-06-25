import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Thread } from '../../../../types';

import useThreads from '../../../hooks/useThreads';
import ThreadList from '../../threads/ThreadList';
import ErrorMessage from '../../UI/ErrorMessage';
import LoadingMessage from '../../UI/LoadingMessage';

const BoardPage: React.FC = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const { status, threads, error } = useThreads(boardId ?? '');

  if (status === 'loading') return <LoadingMessage />;
  if (status === 'error') return <ErrorMessage error={error} />;

  if (!boardId) return <Navigate to="/" replace />;

  const onThreadClick = (thread: Thread) => {
    navigate(`/b/${boardId}/thread/${thread.id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto my-5">
        <h1 className="">
          Threads on <i>/b/{boardId}</i>
        </h1>
      </div>
      <ThreadList threads={threads} onThreadClick={onThreadClick} />
    </div>
  );
};

export default BoardPage;
