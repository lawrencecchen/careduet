import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router';
import PersonalizedCeleb from './PersonalizedCeleb';

const Celeb = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <div>
            <h1>I'm a creator.</h1>
            <div>
              Sign up for a social issue and donate your earnings to a nonprofit
              charity.
            </div>
          </div>
        </Route>
        <Route path={`${url}/:username`} component={PersonalizedCeleb} />
      </Switch>
    </div>
  );
};

export default Celeb;
