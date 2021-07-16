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
import { TeaCategory } from '../models';
import './Home.css';

const Home: React.FC = () => {
  const categories: Array<TeaCategory> = [];

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

        {categories.length > 0 && (
          <IonList>
            {categories.map((cat: TeaCategory) => (
              <IonItemSliding>
                <IonItem>
                  <IonLabel>
                    <div>{cat.name}</div>
                    <div>{cat.description}</div>
                  </IonLabel>
                </IonItem>
                <IonItemOptions>
                  <IonItemOption></IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
