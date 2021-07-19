import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { warning } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { useTeaContext } from '../../hooks/useTeaContext';
import './TeaCategoryEditor.css';

interface TeaCategoryEditorProps
  extends RouteComponentProps<{
    id?: string;
  }> {}

const TeaCategoryEditor: React.FC<TeaCategoryEditorProps> = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const { getTeaCategory, saveTeaCategory } = useTeaContext();
  const { control, handleSubmit, reset } = useForm<{
    name: string;
    description: string;
  }>({
    defaultValues: { name: '', description: '' },
    mode: 'onChange',
  });
  const { errors, isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    if (id) {
      const { name, description } = getTeaCategory(parseInt(id, 10)) || {};
      reset({ name, description });
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    id && id !== 'add' && (data.id = parseInt(id, 10));
    await saveTeaCategory(data);
    history.goBack();
  };

  const showError = (fieldName: string) => {
    let error = (errors as any)[fieldName];
    return error ? (
      <div className="error">
        <IonIcon icon={warning} /> &nbsp;
        {error.message ||
          `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(
            1,
          )} cannot be empty`}
      </div>
    ) : null;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categories" />
          </IonButtons>
          <IonTitle>{id ? 'Edit' : 'Add New'} Tea Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonList className="tea-category-editor-form">
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IonInput
                    onIonChange={e => onChange(e.detail.value!)}
                    value={value}
                  ></IonInput>
                )}
                rules={{
                  required: true,
                  minLength: {
                    value: 4,
                    message: 'Name must be at least 4 characters long',
                  },
                }}
              />
            </IonItem>
            {showError('name')}
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IonTextarea
                    rows={5}
                    onIonChange={e => onChange(e.detail.value!)}
                    value={value}
                  ></IonTextarea>
                )}
                rules={{ required: true }}
              />
            </IonItem>
            {showError('description')}
          </IonList>
        </form>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="full"
            type="submit"
            disabled={!(isDirty && isValid)}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default TeaCategoryEditor;
