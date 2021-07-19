import React, {
  useEffect,
  useContext,
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

const TeaProvider = ({ children }: Props) => {
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
export default TeaProvider;

export const useTeaContext = () => {
  const [teaState, setTeaState] = useContext(TeaContext);

  const getTeaCategory = (id: number): TeaCategory | undefined => {
    const category = teaState.categories?.find(cat => cat.id === id);
    try {
      if (!category) throw new Error('Tea category cannot be found.');
    } catch (error) {
      setTeaState(s => ({ ...s, error: error.toString() }));
    }
    return category;
  };

  const saveTeaCategory = async (category: TeaCategory): Promise<void> => {
    try {
      const persistedCategory = await teaCategories.save(category);
      let categories = teaState.categories?.filter(
        cat => cat.id !== persistedCategory.id,
      );
      categories?.push(persistedCategory);
      categories?.sort((a, b) => (a.name > b.name ? 1 : -1));
      setTeaState(s => ({ ...s, categories, error: undefined }));
    } catch (error) {
      setTeaState(s => ({ ...s, error: error.toString() }));
    }
  };

  const deleteTeaCategory = async (id: number): Promise<void> => {
    try {
      await teaCategories.delete(id);
      const categories = teaState.categories?.filter(cat => cat.id !== id);
      setTeaState(s => ({ ...s, categories, error: undefined }));
    } catch (error) {
      setTeaState(s => ({ ...s, error: error.toString() }));
    }
  };

  return {
    error: teaState.error,
    categories: teaState.categories,
    deleteTeaCategory,
    getTeaCategory,
    saveTeaCategory,
  };
};
