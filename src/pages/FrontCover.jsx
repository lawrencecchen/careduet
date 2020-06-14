import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  max-width: 100%;
  overflow: auto;
  white-space: nowrap;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 500;
  padding-left: 70px;
  padding-right: 70px;
`;

const FrontCover = () => {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        setProfileData(results);
      })
      .catch((err) => console.log(err));
  }, []);
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  // };

  return (
    <div>
      <div className="frontBanner">
        <Title>Drop a CareDuet with a celeb to a front-line worker.</Title>
        <h3 style={{ marginTop: '20px' }}>
          Your commission will be donated to a nonprofit.
        </h3>
      </div>
      <div className="section">
        <h1>Featured Celebs</h1>

        <CardsWrapper>
          <Card
            profileUrl="https://media-exp1.licdn.com/dms/image/C5603AQEtpmIyj-J-fA/profile-displayphoto-shrink_400_400/0?e=1597881600&v=beta&t=UGbv2X3v07no3NSnp3s6qmBDcE8MC0tLm3DzpNFKHJA"
            key={-1}
            name="Austin Wang"
            username="austinwang"
            description="Musicizer Founder"
          />
          <Card
            profileUrl="https://www.gstatic.com/tv/thumb/persons/614/614_v9_bc.jpg"
            key={-2}
            name="Bill Gates"
            username="billgates"
            description="Dairy Queen Cashier"
          />
          <Card
            profileUrl="https://www.gstatic.com/tv/thumb/persons/389416/389416_v9_bc.jpg"
            key={-9}
            name="Jennifer Lawrence"
            username="jenniferlawrence"
            description="I'm an Actor"
          />
          <Card
            profileUrl="https://pyxis.nymag.com/v1/imgs/3e9/fd1/903009c51f8c3152f9364dc325c15e4f84-ariana-grande.rsquare.w1200.jpg"
            key={-20}
            name="Ariana Grande"
            username="arianagrande"
            description="Singer"
          />
          <Card
            profileUrl="https://www.mercurynews.com/wp-content/uploads/2019/11/Tesla-Pickup.jpg"
            key={-3}
            name="Elon Musk"
            username="elonmusk"
            description="Indestructible Cars"
          />
          <Card
            profileUrl="https://usatftw.files.wordpress.com/2020/04/jordan-3.jpg?w=1000&h=600&crop=1"
            key={-21}
            name="Michael Jordan"
            username="michaeljordan"
            description="1v1 me bro"
          />
          <Card
            profileUrl="https://parade.com/wp-content/uploads/2018/08/ConstanceWu-FTR.jpg"
            key={-10}
            name="Constance Wu"
            username="constancewu"
            description="Crazy Rich Asians"
          />
          <Card
            profileUrl="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F593b2e4b31358e03e55a0e8c%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D634%26cropX2%3D2468%26cropY1%3D39%26cropY2%3D1874"
            key={-8}
            name="Tom Cruise"
            username="tomcruise"
            description="Nothing is Impossible"
          />
          <Card
            profileUrl="https://www.biography.com/.image/t_share/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg"
            key={-4}
            name="Mark Zuckerberg"
            username="markzuckerberg"
            description="FB"
          />
          <Card
            profileUrl="https://specials-images.forbesimg.com/imageserve/5e8bec80c095010007c004ef/960x0.jpg?cropX1=0&cropX2=1532&cropY1=501&cropY2=1621"
            key={-25}
            name="Addison Rae"
            username="addisonre"
            description="TikTok"
          />
          <Card
            profileUrl="https://i.chzbgr.com/full/8544043520/h30BFC697/mark-cuban-donald-trump-running-mate-election"
            key={-5}
            name="Mark Cuban"
            username="markcuban"
            description="Deal"
          />
          <Card
            profileUrl="https://upload.wikimedia.org/wikipedia/commons/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg"
            key={-6}
            name="Ed Sheeran"
            username="edsheeran"
            description="Shape of You"
          />
          <Card
            profileUrl="https://cdn.costumewall.com/wp-content/uploads/2018/09/pam-beesly.jpg"
            key={-24}
            name="Jenna Fischer"
            username="jennafischer"
            description="Pam from The Office"
          />
          {profileData
            .filter((profile, index) => {
              if (index >= 32 && index <= 47) return profile;
            })
            .map((profile, index) => (
              <Card
                profileUrl={profile.picture.large}
                key={index}
                name={`${profile.name.first} ${profile.name.last}`}
                description=""
              />
            ))}
        </CardsWrapper>
        <p />
      </div>
      <div className="section">
        <h1>Frontline Workers</h1>
        <p>Send a thank-you message to these heroes</p>
        <CardsWrapper>
          {/* <Card
            profileUrl="https://media-exp1.licdn.com/dms/image/C5603AQEtpmIyj-J-fA/profile-displayphoto-shrink_400_400/0?e=1597881600&v=beta&t=UGbv2X3v07no3NSnp3s6qmBDcE8MC0tLm3DzpNFKHJA"
            key={-1}
            name="Austin Wang"
            username="austinwang"
            description=""
          /> */}
          {profileData
            .filter((profile, index) => {
              if (index >= 15 && index <= 31) {
                return profile;
              }
              return null;
            })
            .map((profile, index) => (
              <Card
                profileUrl={profile.picture.large}
                key={index}
                name={`${profile.name.first} ${profile.name.last}`}
                description=""
              />
            ))}
        </CardsWrapper>
      </div>

      <div className="section">
        <h1>Patients</h1>
        <CardsWrapper>
          {/* <Slider {...settings}> */}
          {profileData
            .filter((profile, index) => {
              if (index < 15) return profile;
              return null;
            })
            .map((profile, index) => (
              <Card
                profileUrl={profile.picture.large}
                key={index}
                name={`${profile.name.first} ${profile.name.last}`}
                description="Patient"
              />
            ))}
          {/* <Card name="covid-19" description="Covid-19 frontline relief" /> */}
          {/* </Slider> */}
        </CardsWrapper>
      </div>
    </div>
  );
};

export default FrontCover;
