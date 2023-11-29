import React, { useEffect, useState } from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import CoachCarouselCard from '../components/CoachCarouselCard';
import { NavLink } from 'react-router-dom';
import { getCoaches } from '../services/session.service';
const OurCoaches = () => {
  const [coachList, setCoachList] = useState([]);

  useEffect(() => {
    const getCoacheData = async () => {
      const coaches = await getCoaches();
      setCoachList(coaches?.data?.coaches?.reverse());
    };
    getCoacheData();
  }, []);

  return (
    <Box
      sx={{
        paddingY: '30px',
        backgroundColor: 'whitesmoke',
      }}
    >
      <Typography
        className="borderTitle"
        variant="span"
        sx={{
          position: 'relative',
          fontSize: { xs: '32px', sm: '48px' },
          color: '#671d63',
          lineHeight: '48px',
          fontFamily: "'montserrat', sans-serif",
          display: 'flex',
          marginTop: '30px',
          marginBottom: { xs: '40px', md: '75px' },
          justifyContent: 'center',
          '::before': {
            content: `""`,
            position: 'absolute',
            bottom: { xs: '-10px', md: '-40px' },
            height: '3px',
            width: '110px',
            backgroundColor: '#671d63',
          },
        }}
      >
        Our Coaches
      </Typography>
      <Typography
        paragraph
        sx={{
          fontSize: '20px',
          width: { md: '60%', xs: '90%' },
          mx: 'auto',
          marginBottom: '50px',
          textAlign: { xs: 'left', sm: 'justify' },
          textAlignLast: { xs: 'left', sm: 'center' },
        }}
      >
        At Become Your Creator, we have an exceptional team of coaches who specialize in various
        aspects of personal, spiritual, and consciousness growth. Experience the difference that
        working with the absolute best can make in creating the life you truly desire, including
        specific outcomes.
      </Typography>
      <Container>
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass="CoachCarouselCardItem"
          slidesToSlide={1}
          swipeable
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 50,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {coachList?.length > 0 &&
            coachList
              ?.sort((a, b) => (a?.order > b?.order ? 1 : -1))
              ?.map((item) => {
                return (
                  <CoachCarouselCard
                    id={item?._id}
                    key={item?._id}
                    title={item?.firstName}
                    subtitle={item?.intro}
                    imgSrc={item?.image}
                  />
                );
              })}
        </Carousel>
      </Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Link
          component={NavLink}
          to="/our-coaches"
          variant="button"
          sx={{
            color: '#671d63',
            width: 'max-content',
            textDecoration: 'none',
            fontWeight: 'bolder',
            border: 'none',
            padding: '10px 20px',
            marginTop: '2.75rem',
            borderRadius: '10px',
            transition: 'all 0.25s linear',
            backgroundColor: '#EFE6EF',
            '&:hover': {
              backgroundColor: '#671d63',
              color: 'white',
              border: 'none',
            },
          }}
        >
          SEE ALL COACHES
        </Link>
      </Box>
    </Box>
  );
};

export default OurCoaches;
