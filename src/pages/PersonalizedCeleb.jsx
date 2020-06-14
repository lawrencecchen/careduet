import React, { useEffect, useState } from 'react';
import {
  useParams,
  useRouteMatch,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { db } from '../firebase/firebase';
import Video from './Video';

const PersonalizedCeleb = () => {
  const { username } = useParams();
  const [celebData, setCelebData] = useState({});
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const docRef = db.collection('celebs').doc(username);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCelebData(doc.data());
        } else {
          setCelebData({ message: 'THIS CELEB DONT EXIST' });
        }
      })
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <Switch>
      <Route exact path={path}>
        <div className="celeb-top">
          <div className="celeb-card">
            <div className="pfp">
              <img
                className="circle-crop"
                src={celebData.profileUrl}
                alt={celebData.username}
              />
            </div>
            <div className="text-content">
              <h2>
                {celebData.firstName} {celebData.lastName}
              </h2>
              <span>{celebData.role}</span>
              <p>{celebData.description}</p>
              <span className="rating">{celebData.rating} / 5 Stars</span>
            </div>
          </div>
          <div className="celeb-button">
            <Link to={`${url}/book`}>
              <button>Send Duet</button>
            </Link>

            <p>How does this work? </p>
          </div>
        </div>
        <div className="hashtag-info">
          <div className="respond-time">
            <h2>Responds in</h2>
            <p>{celebData.responseDays} days</p>
          </div>
          <div className="hashtags">
            <p>{celebData.hashtags}</p>
          </div>
        </div>
      </Route>
      <Route path={`${path}/book`}>
        <Video targetCelebData={celebData} />
      </Route>
    </Switch>
  );
};

export default PersonalizedCeleb;
