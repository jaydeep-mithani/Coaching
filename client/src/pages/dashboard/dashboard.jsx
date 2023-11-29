import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import SessionCard from "../../components/SessionCard";
import PageBanner from "../../sections/PageBanner";
import { getDateAndTimeHandler } from "../../utils/getDateAndTime";
const Dashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [linkVisible, setLinkVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const bookedSession = JSON.parse(
      localStorage.getItem("user")
    )?.bookedSession;
    setUpcomingSessions(bookedSession);
    setIsLoading(false);
  }, []);

  const renderUpcomingSessions = (upcomingSessions) => {
    return upcomingSessions?.map((session) => {
      return (
        <>
          <Grid key={session?._id} item xs={12} sm={6} lg={4}>
            <SessionCard
              price={session?.session?.price}
              date={
                getDateAndTimeHandler(session?.sessionStartDate).formattedDate
              }
              time={
                getDateAndTimeHandler(session?.sessionStartDate).formattedTime
              }
              detail={session?.session?.details}
              coachName={session?.session?.coach?.firstName}
              title={session?.session?.title}
              sessionImg={session?.session?.coach?.image}
              btnText={!linkVisible && "Get Link"}
              onClick={() => setLinkVisible(!linkVisible)}
              sessionLink={linkVisible && session?.link}
            />
          </Grid>
        </>
      );
    });
  };

  const userName = JSON.parse(localStorage.getItem("user"))?.name;

  return (
    <>
      <PageBanner
        heading={
          <Typography
            sx={{
              fontSize: { xs: "33px", md: "42px" },
              marginTop: "15px",
              fontFamily: "'montserrat', cursive",
            }}
          >
            Welcome,
            <Typography
              sx={{
                color: "#673d61",
                pl: "10px",
                fontSize: { xs: "33px", md: "42px" },
                textTransform: "capitalize",
              }}
              component={"span"}
            >
              {userName}
            </Typography>
          </Typography>
        }
        bgColor={"#F2EFFB"}
        imgSrc={"wealthCreation.jpg"}
        align={"left"}
      />
      <Box
        sx={{
          padding: { xs: "0 1rem", sm: "0 2rem", md: "0 3rem", lg: "0 4rem" },
        }}
      >
        <Box sx={{ pt: "15px" }}>
          <Typography
            sx={{
              fontSize: { xs: "20px", sm: "25px", md: "30px" },
              marginTop: "15px",
              color: "#673d61",
              fontFamily: "'montserrat', cursive",
              textAlign: "center",
            }}
          >
            Upcoming Sessions
          </Typography>
          <Box>
            <Grid
              spacing={3}
              container
              sx={{
                marginTop: "0 !important",
                paddingBottom: "75px",
                gap: "25px 0",
              }}
            >
              {!isLoading && upcomingSessions && upcomingSessions.length > 0 ? (
                renderUpcomingSessions(upcomingSessions)
              ) : isLoading ? (
                <Backdrop open={sessionsIsLoading}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "25px",
                      padding: "15px 45px",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: "white" }}
                      color="secondary"
                    />
                    <Typography
                      component="span"
                      fontSize={"30px"}
                      fontWeight={"bold"}
                      color={"white"}
                    >
                      Loading Sessions
                    </Typography>
                  </Box>
                </Backdrop>
              ) : (
                <Box
                  sx={{
                    height: {
                      xs: "350px",
                      sm: "400px",
                      md: "450px",
                      lg: "500px",
                    },
                    width: {
                      xs: "350px",
                      sm: "400px",
                      md: "450px",
                      lg: "500px",
                    },
                    margin: "0 auto",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src="./no-data-found.png"
                    alt="no-data-found"
                  />
                </Box>
              )}
            </Grid>
          </Box>
        </Box>
        {/* <Box>
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "25px", md: "30px" },
            marginTop: "15px",
            color: "#673d61",
            textAlign: "center",
          }}
        >
          Subscriptions Plans
        </Typography>
        <Grid
          container
          sx={{
            justifyContent: "center",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {subscriptionData?.map((plan) => {
            return (
              <Grid
                sx={{ height: { xs: "100%", lg: "auto" } }}
                item
                key={plan?.price}
              >
                <SubscriptionCard
                  description={plan?.description}
                  title={plan?.title}
                  price={plan?.price}
                  locked={plan?.locked}
                  unlocked={plan?.unlocked}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box> */}
      </Box>
    </>
  );
};

export default Dashboard;
