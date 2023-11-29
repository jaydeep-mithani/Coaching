import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ServiceCard from "../components/ServiceCard";
import { cradData } from "../utils/constant";

const Services = () => {
  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Container maxWidth="lg" marginBottom="25px">
          <Typography
            align="center"
            color={"#671d63"}
            component={"h2"}
            sx={{
              fontSize: { xs: "18px", sm: "22px", lg: "24px" },
              fontWeight: { xs: "500", sm: "600", lg: "800" },
            }}
          >
            SERVICES
          </Typography>
          <Typography
            align="center"
            component="h2"
            sx={{
              fontSize: { xs: "20px", sm: "24px", lg: "54px" },
              fontWeight: { xs: "500", sm: "700", lg: "800" },
            }}
          >
            You are one decision away from a completely different life
          </Typography>
          <Typography
            variant="body1"
            align="center"
            marginTop="10px"
            sx={{
              fontSize: { sm: "15px", lg: "14px" },
            }}
          >
            Whether you are anxious, unhappy or just wishing to start anew, we
            invite you on a journey of physical, mental and emotional
            transformation! With so many challenges we face in life this
            platform is designed to give you the space and the opportunity to
            reconnect with your inner person and find out what really excites
            you!
          </Typography>
          <Grid container spacing={4} marginTop={5}>
            {cradData?.map((card) => (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <ServiceCard
                  key={card?.id}
                  image={card?.image}
                  title={card?.title}
                  content={card?.content}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Services;
