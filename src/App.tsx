import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { Redirect, Route } from 'react-router-dom';
import TeaProvider from './hooks/useTeaContext';
import Categories from './pages/Categories/Categories';
import TeaCategoryEditor from './pages/TeaCategoryEditor/TeaCategoryEditor';
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <TeaProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/categories/add" component={TeaCategoryEditor} />
          <Route path="/categories/:id" component={TeaCategoryEditor} />
          <Route exact path="/">
            <Redirect to="/categories" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </TeaProvider>
  </IonApp>
);

export default App;
