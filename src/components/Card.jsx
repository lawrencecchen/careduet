import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const PhotoWrapper = styled.div`
  background: #707070 url(${(props) => props.photoUrl}) 0% 0% no-repeat
    padding-box;
  background-size: cover;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  width: 139px;
  height: 152px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  font-size: 16px;
`;

const StyledDescription = styled.div`
  font-size: 11px;
`;

const CardWrapper = styled.div`
  margin-right: 28px;
  cursor: pointer;
  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: translateY(-6px);
  }
`;

const Card = ({ name, price, description, profileUrl, username }) => {
  return username ? (
    <Link to={`/celeb/${username}`}>
      <CardWrapper>
        <PhotoWrapper photoUrl={profileUrl} />
        <DescriptionWrapper>
          <div>
            <span>{name.length >= 15 ? name.substring(0, 15) : name}</span>
            <span>{price}</span>
          </div>
          <StyledDescription>{description}</StyledDescription>
        </DescriptionWrapper>
      </CardWrapper>
    </Link>
  ) : (
    <CardWrapper>
      <PhotoWrapper photoUrl={profileUrl} />
      <DescriptionWrapper>
        <div>
          <span>{name}</span>
          <span>{price}</span>
        </div>
        <StyledDescription>{description}</StyledDescription>
      </DescriptionWrapper>
    </CardWrapper>
  );
};

export default Card;
