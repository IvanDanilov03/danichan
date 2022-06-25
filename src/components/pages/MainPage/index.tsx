/* eslint-disable jsx-a11y/no-distracting-elements */
import { Link } from 'react-router-dom';

import boardsImageSrc from '../../../static/images/boards.gif';
import useBoards from '../../../hooks/useBoards';
import ErrorMessage from '../../UI/ErrorMessage';
import LoadingMessage from '../../UI/LoadingMessage';

const MainPage = () => {
  const { status, boards, error } = useBoards();

  if (status === 'loading') return <LoadingMessage />;
  if (status === 'error') return <ErrorMessage error={error} />;

  return (
    <div className="mb-5">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <marquee behavior="alternate" direction="right">
        <img src={boardsImageSrc} alt="boards" />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
      </marquee>
      {/* eslint-disable no-undef */}
      <table className="[&_td]:border [&_td]:border-red-400 [&_td]:border-solid [&_td_>_*]:p-1 border-4 border-red-400 border-double p-10 mx-auto mt-5 mb-10 bg-white">
        <tbody>
          <tr>
            {boards.map(({ id }) => (
              <td key={id}>
                <Link to={`b/${id}`}>{id}</Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
