import React from "react";
import Carousel from "react-material-ui-carousel";
import SuccessStories from "../components/SuccessStoriesCard";
import { Box, Typography } from "@mui/material";

const SuccessCarousel = ({ testimonials }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(#EFE6EF, #F1E2F0)",
          py: "50px",
        }}
      >
        <Typography
          className="borderTitle"
          variant="span"
          sx={{
            position: "relative",
            fontSize: { xs: "32px", sm: "48px" },
            color: "#671d63",
            lineHeight: "50px",
            fontFamily: "'montserrat', sans-serif",
            display: "flex",
            marginBottom: { xs: "30px", md: "50px" },
            justifyContent: { xs: "center", md: "flex-start" },
            marginLeft: { xs: "0px", md: "230px" },
            "::before": {
              position: "absolute",
              bottom: { xs: "-12px", md: "-25px" },
              color: "black",
              content: `""`,
              height: "3px",
              width: "10vw",
              backgroundColor: "#000",
            },
          }}
        >
          Success Stories
        </Typography>
        <Carousel duration={10}>
          {testimonials?.map((item, index) => (
            <SuccessStories
              key={index}
              imgSrc="./successStories.jpg"
              content={item?.review}
              title=""
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default SuccessCarousel;
