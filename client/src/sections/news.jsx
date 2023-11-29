import { Box, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import EventTemplate from "../components/EventTemplate";
import { eventsData } from "../utils/constant";

const News = () => {
  const filteredEvent = eventsData?.filter((event) => event?.id === "0")[0];

  return (
    <Box
      sx={{ padding: { xs: "2rem", md: "5rem" }, backgroundColor: "#f2effb" }}
    >
      <Box sx={{ maxWidth: "1500px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            mx: "auto",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Typography
            varient="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "3.5rem",
              },
              color: "#671d63",
              fontFamily: "'montserrat',sans-serif",
              maxWidth: "592px",
              position: "relative",
              paddingRight: { lg: "70px" },
              marginBottom: { xs: "20px", lg: 0 },
              marginRight: { xs: "10px", lg: "45px" },
              lineHeight: { xs: "35px", sm: "45px", md: "50px", lg: "60px" },
              "&:after": {
                content: { lg: "''" },
                position: "absolute",
                right: 0,
                top: 0,
                width: "4px",
                height: "100%",
                backgroundColor: "#671d63",
              },
            }}
          >
            What's new on Become Your Creator
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", md: "1.5rem" },
              maxWidth: "605px",
              color: "#444",
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            Discover the latest updates on Become Your Creator! This is your
            golden opportunity to access all the resources and tools you require
            to make your dreams a reality.
          </Typography>
        </Box>
        {/* <Link
          sx={{ textDecoration: "none" }}
          href="https://allevents.in/online/the-complete-4-steps-to-abundance-activation-6th-7th-8th-and-9th-feb-2024-7pm-bst-2pm-est/80001142719496"
          target="_blank"
          rel="noreferrer"
        > */}
        <Box
          sx={{
            paddingX: { xs: 0, lg: "5rem", xl: "7rem" },
            scale: { xs: "1", md: "0.8" },
            marginY: { xs: "-50px", md: "-80px" },
          }}
        >
          <EventTemplate
            id={filteredEvent?.id}
            image={filteredEvent?.imageUrl}
            title={filteredEvent?.title}
            subtitle={filteredEvent?.subtitle}
            eventUrl={filteredEvent?.eventUrl}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  display: "block",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.2rem",
                    md: "1rem",
                    lg: "1.4rem",
                  },
                  fontWeight: 100,
                  textAlign: "center",
                  color: "#888",
                  fontStyle: "italic",
                  marginBottom: { xs: "1rem", md: "2rem" },
                }}
              >
                {filteredEvent?.host}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  display: "block",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.1rem",
                    lg: "1.2rem",
                  },
                  fontWeight: 800,
                  textAlign: "center",
                  color: "#5b6897",
                  marginBottom: { xs: "1rem", md: "2rem" },
                }}
              >
                {filteredEvent?.subtitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  display: "block",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.1rem",
                    lg: "1.2rem",
                  },
                  fontWeight: 100,
                  textAlign: "center",
                  color: "#364064",
                  margin: "0 auto",
                  marginBottom: { xs: "1rem", md: "2rem" },
                  maxWidth: "500px",
                }}
              >
                {filteredEvent?.shortDescription}
              </Typography>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: "block",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                      md: "1.1rem",
                      lg: "1.2rem",
                    },
                    fontWeight: 900,
                    textAlign: "center",
                    color: "#2a3763",
                    transition: "all 250ms linear",
                    "&:hover": {
                      textShadow: "0 0 15px #2a376344",
                    },
                  }}
                >
                  {filteredEvent?.dateTime}
                </Typography>
              </Link>
            </Box>
          </EventTemplate>
        </Box>
        {/* </Link> */}
      </Box>
      <Link
        component={NavLink}
        to="/events"
        variant="button"
        sx={{
          color: "#671d63",
          width: "max-content",
          textDecoration: "none",
          mt: { lg: "1.3rem" },
          mx: "auto",
          fontWeight: "bolder",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          transition: "all 0.25s linear",
          backgroundColor: "#EFE6EF",
          "&:hover": {
            backgroundColor: "#671d63",
            color: "white",
            border: "none",
          },
          display: "block",
        }}
      >
        SEE ALL EVENTS
      </Link>
    </Box>
  );
};

export default News;
