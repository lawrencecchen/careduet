import React from 'react';
import './styles.css';
import { Switch, Route, Link } from 'react-router-dom';
import FrontCover from './pages/FrontCover';
import Login from './pages/Login';
import Video from './pages/Video';
import Celeb from './pages/Celeb';
import CelebForm from './pages/CelebForm';
import DuetRequests from './pages/DuetRequests';

export default function App() {
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
            <Link to="/login">Sign in</Link>
          </div>
          <div className="nav-right">
            <a href="/duetrequests">Duet Requests</a>
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
          {/* <Route path="/celebform" component={CelebForm} /> */}
        </Switch>
      </div>
    </div>
  );
}
