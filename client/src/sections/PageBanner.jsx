import React from "react";
import { Box, Container, Typography } from "@mui/material";
const PageBanner = ({ heading, imgSrc, bgColor, align }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: bgColor ? bgColor : "transparent",
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: { xs: "100%", md: "100%" },
          backgroundRepeat: "no-repeat",
          height: { xs: "350px", md: "auto" },
          backgroundPosition: { xs: "center center", md: "top center" },
          position: "relative",
          "::after": {
            content: "' '",
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5) 100%, rgba(212,167,32,0.5) 01%);",
            zIndex: 0,
            top: 0,
            left: 0,
          },
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%  ", md: "100%", lg: "100%" },
              padding: {
                xs: "50px 20px",
                sm: "100px 50px",
                md: "140px 50px",
                lg: "200px 75px",
              },
            }}
          >
            {heading && (
              <Typography
                component={"p"}
                sx={{
                  fontSize: { xs: "32px", md: "42px", lg: "72px" },
                  textAlign: align ? align : "center",
                  color: "#671d63",
                  fontWeight: "bold",
                  lineHeight: { xs: "27px", md: "36px", lg: "62px" },
                  textTransform: "capitalize",
                  fontFamily: "'montserrat', cursive",
                }}
              >
                {heading}
              </Typography>
            )}
            {/* {description && (
              <Typography
                variant="h6"
                sx={{ my: "1rem", textAlign: {align} }}
              >
                {description}
              </Typography>
            )} */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PageBanner;
