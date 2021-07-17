import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
} from '@ionic/react';
import React from 'react';

import { TeaCategory } from '../models/TeaCategory';
import { useTeaContext } from '../hooks/useTeaContext';

import './TeaCategoryListItem.css';

const TeaCategoryItem: React.FC<{ category: TeaCategory }> = ({
  category: { name, description, id },
}) => {
  const { deleteTeaCategory } = useTeaContext();

  return (
    <IonItemSliding className="tea-category-item">
      <IonItem routerLink={`/categories/${id}`}>
        <IonLabel>
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption
          color="danger"
          onClick={() => id && deleteTeaCategory(id)}
        >
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
export default TeaCategoryItem;
