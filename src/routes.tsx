import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Match from './pages/Match';
import HowTo from './pages/HowTo';
import Story from './pages/Story';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/treining" exact component={Match} />
                <Route path="/howto" exact component={HowTo} />
                <Route path="/story-mode" exact component={Story} />
                <Route path="/story-battle" exact component={Match} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;