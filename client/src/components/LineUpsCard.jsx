import { Box, Card, Typography } from "@mui/material";
import React from "react";

const LineUpsCard = ({ title, content, quentity }) => {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "initial",
        p: { xs: "1rem", md: "2rem", lg: "3rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "120px",
          gap: "10px",
          mb: "10px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "#671d63",
            lineHeight: "30px",
            backgroundColor: "#f8e3c4",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {quentity}
          <span>x</span>
        </Typography>
        <Typography
          component={"h1"}
          sx={{
            fontSize: { xs: "18px", sm: "28px" },
            color: "#414141",
            lineHeight: { xs: "22px", sm: "30px" },
            textTransform: "capitalize",
            fontFamily: "'montserrat', sans-serif",

            my: { xs: "8px", md: "10px", lg: "15px" },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        component={"h6"}
        sx={{
          color: "#575757",
          fontSize: { xs: "15px", sm: "23px" },
          lineHeight: { xs: "20px", sm: "28px" },
          mb: { xs: "8px", md: "10px", lg: "15px" },
        }}
      >
        {content}
      </Typography>
    </Card>
  );
};

export default LineUpsCard;
