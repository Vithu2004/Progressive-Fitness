import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

//css
import './App.css'

//page
import Home from './pages/Home/Home';
import AuthLogin from './pages/Login/AuthLogin';
import AuthSignup from './pages/SignUp/AuthSignup';

//React
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import CreateExo from './pages/Creation/CreateExo';
import CreateWorkout from './pages/Creation/CreateWorkout';
import CreatePlan from './pages/Creation/CreatePlan';
import Plan from './pages/Plan/Plan';
import PlanDetail from './pages/PlanDetail/PlanDetail';

setupIonicReact();

//Login Function
const isLogin = (token: string | null) => {
    const history = useHistory();
    useEffect(() => {
        if (token === null) {
            history.push('/login');
        }
    }, []);
}


const App: React.FC = () => (
    <IonApp className="template-app">
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/login">
                    <AuthLogin />
                </Route>
                <Route exact path="/signup">
                    <AuthSignup />
                </Route>
                <Route exact path="/">
                    <Home isLogin={isLogin} />
                </Route>
                <Route exact path="/plan">
                    <Plan isLogin={isLogin} />
                </Route>
                <Route exact path="/plan/:id">
                    <PlanDetail isLogin={isLogin} />
                </Route>
                <Route exact path="/createExo">
                    <CreateExo isLogin={isLogin} />
                </Route>
                <Route exact path="/createWorkout">
                    <CreateWorkout isLogin={isLogin} />
                </Route>
                <Route exact path="/createPlan">
                    <CreatePlan isLogin={isLogin} />
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
