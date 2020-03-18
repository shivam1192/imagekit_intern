import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import './App.css';
import Register from './Components/register'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Switch>
            <Route path="/" component={Register}/>
          </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
