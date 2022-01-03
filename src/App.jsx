import React, { useEffect, useState } from 'react'
import Pokemones from "./components/Pokemones"
import Login from "./components/Login"
import NavBar from "./components/NavBar";

import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { auth } from './firebase';


function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)
  //Reading user information
  useEffect(()=>{
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        console.log('USER_BACKEND', user)
        if(user){
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  },[])

  const RutaProtegida = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if (usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest}/>
      } else {
        return <Redirect to='/login' {...rest}/>  
      }
    } else {
      //If the user doesn't exist
      return <Redirect to='/login' {...rest}/>
    }
  }
  return firebaseUser !== false ? (
      <Router>
        <div className="container mt-3">
          <NavBar/>
          <Switch>
            <RutaProtegida component={Pokemones} path='/' exact/>
            <Route component={Login} path='/login' exact/>
          </Switch>
        </div>
      </Router>
  ) : (
    <div>Cargando...</div>
  )
}

export default App;
