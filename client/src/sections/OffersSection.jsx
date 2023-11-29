import React from "react";
import { Grid, Typography, Button, Paper, Box } from "@mui/material";
import BookSessionBtn from "../components/BookSessionButton";

const OfferSection = () => {
  return (
    <Grid
      container
      sx={{
        height: "max-content",
        justifyContent: { xs: "space-around", md: "center" },
        alignItems: { sm: "center" },
        padding: "4rem 2rem",
        backgroundColor: "#E6D7ED",
      }}
    >
      <Grid item xs={12} md={5} lg={6} sx={{ order: { xs: 2, md: 1 } }}>
        <Typography
          paragraph
          sx={{
            fontSize: { xs: "20px", md: "34px" },
            color: "#671d63",
            fontFamily: '"montserrat", sans-serif',
            fontWeight: 100,
            margin: { xs: "auto", sm: "0" },
            padding: "16px 0",
            textAlign: { xs: "justify", md: "left" },
          }}
        >
          Here's Your Chance To Start Getting Everything You'll Ever Need To
          Live A Life Of Abundance, Attract Endless Happiness And Fulfilment...
        </Typography>
        <BookSessionBtn
          defaultText={
            <>
              <h2 style={{ margin: "0" }}>BOOK YOUR FREE ENERGY AND LIFE PATH READING</h2>
            </>
          }
          freeSessionText={<span>BOOK YOUR FREE ENERGY AND LIFE PATH READING</span>}
          bookText={<span>Book A Sessions</span>}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        lg={3}
        sx={{
          order: { xs: 1, md: 2 },
          justifyContent: { sm: "flex-start", md: "center" },
          display: { xs: "grid", sm: "block" },
        }}
      >
        <Box
          sx={{
            margin: { xs: "0 auto", md: "0" },
            width: { xs: "275px", md: "400px", lg: "450px" },
            height: { xs: "275px", md: "400px", lg: "450px" },
          }}
        >
          <img
            src="./offers.JPG"
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="#"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default OfferSection;
