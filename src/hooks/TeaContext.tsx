import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import teaCategories from '../services/TeaCategories';
import { TeaCategory } from '../models/TeaCategory';

type Props = { children: React.ReactNode };

interface TeaState {
  error: string | undefined;
  categories: TeaCategory[] | undefined;
}

const initialState: TeaState = {
  error: undefined,
  categories: undefined,
};

export const TeaContext = createContext<
  [TeaState, Dispatch<SetStateAction<TeaState>>]
>([initialState, () => initialState]);

export const TeaProvider = ({ children }: Props) => {
  const [teaState, setTeaState] = useState<TeaState>(initialState);

  const initializeDb = useCallback(async () => {
    try {
      const categories = await teaCategories.getAll();
      setTeaState(s => ({ ...s, categories, error: undefined }));
    } catch (error) {
      setTeaState(s => ({ ...s, error: error.toString() }));
    }
  }, []);

  useEffect(() => {
    initializeDb();
  }, [initializeDb]);

  return (
    <TeaContext.Provider value={[teaState, setTeaState]}>
      {children}
    </TeaContext.Provider>
  );
};
