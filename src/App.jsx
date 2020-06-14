import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { auth } from './firebase/firebase';
import FrontCover from './pages/FrontCover';
import Login from './pages/Login';
import Video from './pages/Video';
import Celeb from './pages/Celeb';
import DuetRequests from './pages/DuetRequests';
import SignInSuccess from './pages/SignInSuccess';
import './styles.css';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <div className="App">
      <div className="nav-content">
        <h1 id="logo">
          <Link to="/">CAREDUET</Link>
        </h1>
        <div className="authentication">
          <div className="nav-right">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-right">
            <Link to="/celeb">Celebs</Link>
          </div>
          <div className="nav-right">
            <a href="/duetrequests">Duet Requests</a>
          </div>
          <div className="nav-right">
            {!user ? (
              <Link to="/login">Sign in</Link>
            ) : (
              <Link to="/logout">Sign out</Link>
            )}
          </div>
        </div>
      </div>
      <div className="content">
        <Switch>
          <Route path="/" exact component={FrontCover} />
          <Route path="/login" component={Login} />
          <Route path="/video" component={Video} />
          <Route path="/celeb" component={Celeb} />
          <Route path="/duetrequests" component={DuetRequests} />
          <Route path="/signedIn" component={SignInSuccess} />
          {/* <Route path="/celebform" component={CelebForm} /> */}
        </Switch>
      </div>
    </div>
  );
}
