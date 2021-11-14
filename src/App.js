import React,{useEffect ,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

//local
import Questions from './components/Questions/Questions';
import Login from './components/auth/Login';
import './App.css';
import { selectUser ,login ,logout } from './features/userSlice';
import { auth } from './firebase';

function App() {

 const user = useSelector(selectUser)
 const dispatch = useDispatch();

   useEffect(() => {
     auth.onAuthStateChanged((authUser)=>{
          if(authUser){
            dispatch(
              login({
                uid : authUser.uid,
                email: authUser.email,
                displayName:authUser.displayName,
                photo : authUser.photoURL
              })
            )
            console.log(authUser)
          }
          else{
             dispatch(logout())
          }
     })
    
   }, [dispatch])

  return (
    <div className="app">
        {
          user ? (<Questions/>) : (<Login/>)
        }
    </div>
  );
}

export default App;
