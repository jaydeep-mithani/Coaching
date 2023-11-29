import React from "react";
import OurCoachesCard from "../../components/OurCoachesCard";
import PageBanner from "../../sections/PageBanner";
import SuccessCarousel from "../../sections/SuccessCarousel";
import { testimonialOurCoachesData } from "../../utils/constant";
import { Typography } from "@mui/material";

const AllCoaches = () => {
  return (
    <>
      <PageBanner heading="Know more about our coaches" imgSrc="./coach.jpg" />
      <Typography
        sx={{
          fontSize: "20px",
          width: { md: "60%", xs: "90%" },
          mx: "auto",
          marginTop: { xs: "15px", md: "50px" },
          textAlign: { xs: "left", sm: "justify" },
          textAlignLast: { xs: "left", sm: "center" },
        }}
      >
        At Become Your Creator, we have an exceptional team of coaches who
        specialize in various aspects of personal, spiritual, and consciousness
        growth. Experience the difference that working with the absolute best
        can make in creating the life you truly desire, including specific
        outcomes.
      </Typography>
      <OurCoachesCard />
      <SuccessCarousel testimonials={testimonialOurCoachesData} />
    </>
  );
};

export default AllCoaches;
