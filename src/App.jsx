import Pokemones from "./components/Pokemones"
import Login from "./components/Login"
import NavBar from "./components/NavBar";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {

  return (
      <Router>
        <div className="container mt-3">
          <NavBar/>
          <Switch>
            <Route component={Pokemones} path='/' exact/>
            <Route component={Login} path='/login' exact/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
