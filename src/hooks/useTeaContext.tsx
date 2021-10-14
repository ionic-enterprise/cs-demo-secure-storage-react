import { useCallback, useContext } from 'react';
import { TeaCategory } from '../models/TeaCategory';
import teaCategories from '../services/TeaCategories';
import { TeaContext } from './TeaContext';

export const useTeaContext = () => {
  const [teaState, setTeaState] = useContext(TeaContext);

  const crashTest = async () => {
    const results = await teaCategories.crash();
    console.log(results);
  };

  const getTeaCategory = useCallback(
    (id: number): TeaCategory | undefined => {
      const category = teaState.categories?.find(cat => cat.id === id);
      try {
        if (!category) throw new Error('Tea category cannot be found.');
      } catch (error) {
        setTeaState(s => ({ ...s, error: error.toString() }));
      }
      return category;
    },
    [teaState.categories, setTeaState],
  );

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
    crashTest,
  };
};
