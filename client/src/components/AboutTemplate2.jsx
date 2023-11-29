import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BookSessionBtn from "./BookSessionButton";

const AboutTemplate2 = (props) => {
  const { reverse, image, linkText, content, title, id, to } = props;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        padding: "2rem",
      }}
    >
      <Box>
        <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: reverse ? "row" : "row-reverse",
            justifyContent: "space-around",
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: {
                  xs: "275px",
                  sm: "350px",
                  md: "375px",
                  lg: "500px",
                  xl: "600px",
                },
                width: {
                  xs: "275px",
                  sm: "350px",
                  md: "375px",
                  lg: "500px",
                  xl: "600px",
                },
                margin: { xs: "0 auto", lg: "0 0 0 auto" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                objectFit: "cover",
                position: "relative",
              }}
            >
              <img
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  objectPosition:
                    id === "become-your-creator" ? "80% top" : "top center",
                }}
                src={image}
                alt="about"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "20px",
              textAlign: "left",
              fontSize: { xs: "16px", md: "20px" },
              lineHeight: "24px",
              padding: { lg: "0 60px 0 0" },
            }}
          >
            <Typography
              component={"h1"}
              sx={{
                position: "relative",
                color: "#671d63",
                fontSize: { xs: "30px", md: "42px" },
                fontFamily: "'montserrat', cursive",
                "::before": {
                  position: "absolute",
                  bottom: "0",
                  content: `""`,
                  height: "5px",
                  width: "150px",
                  backgroundColor: "goldenrod",
                },
              }}
            >
              {title}
            </Typography>
            {content?.map((paragraph, index) => (
              <Typography
                paragraph
                key={index}
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                  textAlign: { xs: "left", sm: "justify" },
                }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></Typography>
            ))}
            <Typography
              to={to}
              component={Link}
              sx={{
                color: "#671d63",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              {linkText}
            </Typography>
            <BookSessionBtn
              defaultText={
                <>
                  <h2 style={{ margin: "0" }}>BOOK YOUR FREE ENERGY AND LIFE PATH READING</h2>
                  {/* <h2 style={{ margin: "0" }}>Instant download</h2> */}
                </>
              }
              freeSessionText={<span>BOOK YOUR FREE ENERGY AND LIFE PATH READING</span>}
              bookText={<span>Book A Session</span>}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutTemplate2;
