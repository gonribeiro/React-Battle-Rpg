import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import BattleMode from './pages/Match';
import HowTo from './pages/HowTo';
import Story from './pages/Story';
import StoryBattle from './pages/Match';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/battle-mode" exact component={BattleMode} />
                <Route path="/howto" exact component={HowTo} />
                <Route path="/story-mode" exact component={Story} />
                <Route path="/story-battle" exact component={StoryBattle} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;