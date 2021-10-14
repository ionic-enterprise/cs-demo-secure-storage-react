import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React from 'react';
import { useTeaContext } from '../../hooks/useTeaContext';
import { TeaCategory } from '../../models';
import './Categories.css';
import TeaCategoryListItem from './TeaCategoryListItem';

const Categories: React.FC = () => {
  const { crashTest, categories } = useTeaContext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tea Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/categories/add">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonButton onClick={crashTest}>Crash Me</IonButton>
        {categories && categories.length > 0 && (
          <IonList>
            {categories.map((cat: TeaCategory) => (
              <TeaCategoryListItem
                key={cat.id}
                category={cat}
              ></TeaCategoryListItem>
            ))}
          </IonList>
        )}
        {categories && !categories.length && (
          <div className="tea-categories-list--empty">
            <div className="container">
              <h1>No Categories Found</h1>
              <p>Tap the button below to add a tea category to the list!</p>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Categories;
