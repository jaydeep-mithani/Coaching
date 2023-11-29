import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { PrimaryBtn } from "./PrimaryBtn";

const EventTemplate = ({ image, children, title, eventUrl, id }) => {
  return (
    <Box
      key={id}
      sx={{
        margin: { xs: "5rem 1rem", sm: "5rem 2rem" },
        boxShadow: "0 5px 12px 2px #00000019",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          maxHeight: { xs: "700px", md: "" },
          display: "flex",
          overflow: "hidden",
          img: {
            width: "100%",
            height: "100%",
            transition: "all 300ms linear",
            objectFit: "cover",
            objectPosition: "top",
            "&:hover": {
              transform: "scale(1.1) rotate(-2deg)",
            },
          },
        }}
      >
        <img src={image} alt="poster" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: {
            xs: "1.5rem",
            sm: "3rem",
            md: "1.5rem",
            lg: "3rem",
          },
          width: { xs: "auto", md: "60%" },
          background: "linear-gradient(to bottom right, #e5e9f8, #d4d8e7)",
        }}
      >
        <Box>
          <Typography
            varient="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", md: "2.5rem", lg: "3.5rem" },
              lineHeight: { xs: "40px", sm: "50px", md: "55px", lg: "60px" },
              fontWeight: 600,
              textAlign: "center",
              marginBottom: { xs: "1rem", md: "2rem" },
              color: "#671d63",
            }}
          >
            {title}
          </Typography>
          <Fragment>{children}</Fragment>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            pt: "3vh",
          }}
        >
          <PrimaryBtn fullWidth row href={eventUrl} target="_blank">
            Get Tickets
          </PrimaryBtn>
        </Box>
      </Box>
    </Box>
  );
};

export default EventTemplate;
