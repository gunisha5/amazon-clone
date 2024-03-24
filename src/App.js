import './App.css';
import Header from './Header';
import { BrowserRouter as Router} from 'react-router-dom';
import {auth} from "./firebase";
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import AnimatedRoutes from './AnimatedRoutes';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(()=>{
    
    auth.onAuthStateChanged((authUser) => {
      console.log('the user is>>',authUser);

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else{
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  },  []) ;
  return (
    <Router>
      <div className="App">
        <Header />
         <AnimatedRoutes/>
      </div>
    </Router>
  );
}

export default App;
