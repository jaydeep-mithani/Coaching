import React from "react";
import { PrimaryBtn } from "./PrimaryBtn";
import { Box, Container, Typography } from "@mui/material";

const ServiceDetailCard = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          align="center"
          color={"#671d63"}
          component={"h2"}
          sx={{
            fontSize: { xs: "22px", md: "24px" },
            fontWeight: { xs: "800", md: "1000" },
            lineHeight: "36px",
            letterSpacing: "2px",
          }}
        >
          CORPORATE ENGAGEMENT & WELLNESS PROGRAMS TO CONVEY THE EMPLOYERS CARE
        </Typography>
        <Typography
          align="left"
          color={"#414141"}
          component={"h2"}
          sx={{
            fontSize: { xs: "24px", md: "30px" },
            fontWeight: { xs: "800", md: "1000" },
            padding: "10px",
          }}
        >
          Description
        </Typography>
        <Box sx={{ padding: "10px", marginBottom: "1rem" }}>
          <Typography
            align="left"
            color={"#3a3a3a"}
            variant={"body1"}
            marginBottom={"20px"}
            sx={{
              lineHeight: "24px",
              fontSize: { xs: "18px", md: "20px" },
              fontWeight: "500",
            }}
          >
            Great leaders are the result of deliberate learning and practice.
            Coaching is a powerful & structured tool that builds strong
            relationships through open, courageous conversations & activities.
            Employers and their employees are increasingly interested in
            business coaching & wellness programs. Both, individuals and
            organisations are adopting mindfulness into their training as it has
            proven to be an effective tool for team building as well as
            encourages creativity and responsibility for personal growth.
            Mindfulness is an important development approach for improving
            abilities, wisdom to manage mind, and performance concerning
            specific skills and goals. If you are a Small to Medium (SME)
            company in need of executive coaching to help you widen your
            thinking, make better decisions, we can assist.
          </Typography>

          <Typography
            align="left"
            variant={"body1"}
            color={"#3a3a3a"}
            marginBottom={"10px"}
            sx={{
              lineHeight: "24px",
              fontSize: { xs: "18px", md: "20px" },
              fontWeight: "500",
            }}
          >
            Ascertaining which type of program is beneficial for your
            organisation and employees may seem like a grand mission. We
            recognize that every company is different, so we collaborate with
            you to create a mindfulness program that meets your individual or
            organization’s development needs.
          </Typography>
        </Box>
        <PrimaryBtn style={{ marginLeft: "auto", padding: "15px" }}>
          Book Now
        </PrimaryBtn>
      </Container>
    </>
  );
};

export default ServiceDetailCard;
