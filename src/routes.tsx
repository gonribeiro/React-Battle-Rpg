import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { SaveStoryContextProvider } from './contexts/SaveStoryContext';

import Landing from './pages/Landing';
import Match from './pages/Match';
import HowTo from './pages/HowTo';
import Story from './pages/Story';
import Ranking from './pages/Ranking';

function Routes() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <SaveStoryContextProvider>
                    <Switch>
                        <Route path="/" exact component={Landing} />
                        <Route path="/treining" exact component={Match} />
                        <Route path="/howto" exact component={HowTo} />
                        <Route path="/story-mode" exact component={Story} />
                        <Route path="/story-battle" exact component={Match} />
                        <Route path="/ranking" exact component={Ranking} />
                    </Switch>
                </SaveStoryContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default Routes;