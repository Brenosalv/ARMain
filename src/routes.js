import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EnterSession from './views/pages/EnterSession';
import CreateSession from './views/pages/CreateSession';
import Session from './views/pages/Session';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={EnterSession}></Route>
      <Route exact path="/create-session" component={CreateSession}></Route>
      <Route path="/session" component={Session}></Route>
      <Route path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;