import React from "react";
import { PrimaryBtn } from "./PrimaryBtn";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Box,
} from "@mui/material";

const ServiceCard = (props) => {
  return (
    <>
      <Card
        padding={0}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            height: "400px",
            width: "100%",
          }}
        >
          <CardMedia
            sx={{
              transition: "transform 0.6s ease-in-out",
              "&:hover": {
                transform: " scale(1.1)",
              },
            }}
            component="img"
            alt="Crad Image"
            height="400"
            src={props.image}
          />
        </Box>
        <CardContent
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "#671d63",
              paddingBottom: "10px",
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              paddingBottom: "10px",
            }}
          >
            {props.content}
          </Typography>
        </CardContent>
        <CardActions style={{ paddingTop: "10px", marginLeft: "auto" }}>
          <PrimaryBtn style={{ padding: "15px" }}>Book Now</PrimaryBtn>
        </CardActions>
      </Card>
    </>
  );
};

export default ServiceCard;
