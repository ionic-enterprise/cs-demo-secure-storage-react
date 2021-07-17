import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useTeaContext } from '../hooks/useTeaContext';
import { TeaCategory } from '../models';
import './Home.css';
import TeaCategoryListItem from '../components/TeaCategoryListItem';

const Home: React.FC = () => {
  const { categories } = useTeaContext();

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

        {categories && categories.length > 0 && (
          <IonList>
            {categories.map((cat: TeaCategory) => (
              <TeaCategoryListItem category={cat}></TeaCategoryListItem>
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

export default Home;
