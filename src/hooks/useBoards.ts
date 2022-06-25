import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  CollectionReference,
  getDocs,
  query,
} from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import { Board, Observable } from '../../types';

export type BoardsObservable = Observable<Board[], 'boards'>;

const useBoards = (): BoardsObservable => {
  const firestore = useFirestore();
  const [observable, setObservable] = useState<BoardsObservable>({
    status: 'loading',
    boards: undefined,
    error: undefined,
  });

  const loadBoards = useCallback(async () => {
    try {
      const boardsCollection = collection(
        firestore,
        'boards',
      ) as CollectionReference<Board>;
      const boardsQuery = query(boardsCollection);
      const boardsSnapshot = await getDocs(boardsQuery);
      const boards = boardsSnapshot.docs.map((boardDoc) => ({
        id: boardDoc.id,
      }));

      setObservable({
        status: 'success',
        boards,
        error: undefined,
      });
    } catch (e) {
      setObservable({
        status: 'error',
        boards: undefined,
        error: e,
      });
    }
  }, [firestore]);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  return observable;
};

export default useBoards;
