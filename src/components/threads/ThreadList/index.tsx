import { Thread } from '../../../../types';

export interface ThreadListProps {
  threads: Thread[];
  onThreadClick: (thread: Thread) => void;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, onThreadClick }) => {
  const isEmpty = threads.length === 0;
  return (
    <ul>
      {isEmpty && (
        <div className="bg-white mx-auto p-5 text-center">
          <h2>No threads yet :c</h2>
          <p>Admin will create new soon...</p>
        </div>
      )}
      {threads.map((thread) => {
        const { id, title } = thread;
        const onClick = () => onThreadClick(thread);

        return (
          <li key={id} className="bg-white first:mt-0 mt-5">
            <button
              type="button"
              onClick={onClick}
              className="w-full h-full py-5 px-3"
            >
              {title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ThreadList;
