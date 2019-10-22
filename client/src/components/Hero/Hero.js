import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

import Context from "context/context";
import { sortRandom } from 'helpers/sortRandom';
import "./Hero.scss";

const GET_IMAGES = gql`
  {
    allImages {
      id
      title
      absolute_filename
    }
  }
`;

export default () => {

  const context = useContext(Context);
  const { showLargeHero, heroTitle, heroImageId } = context;

  const [shuffledImages, setShuffledImages] = useState(null);
  const [heroImage, setHeroImage] = useState({
    absolute_filename:
      "https://websiteuser3.apache.techcollege.dk/assets/images/nature-park-finland.jpg"
  });
  const { data: { allImages } } = useQuery(GET_IMAGES, { suspend: true });

  useEffect(() => {
    if (allImages && !shuffledImages) {
      const shuffle = sortRandom(allImages);
      setShuffledImages(shuffle);
    }
    // eslint-disable-next-line
  }, [allImages])

  useEffect(() => {
    if(!heroImage && shuffledImages) {
      setHeroImage(shuffledImages[1].id)
    }
    // eslint-disable-next-line
  }, [shuffledImages])

  useEffect(() => {
    if (allImages) {
      allImages.find(
        image => image.id === heroImageId && setHeroImage(image)
      );
    }
  }, [heroImageId, allImages]);
  
  return (
    <div>
      {heroImage && (
        <section
          className="hero"
          style={{
            height: showLargeHero ? "40vh" : "25vh",
            background: `no-repeat center/cover url(${heroImage.absolute_filename})`
          }}
        >
          <h1 className="hero__title">{heroTitle}</h1>
        </section>
      )}
    </div>
  );
};

