import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Backdrop, Box, Grid, OutlinedInput, Typography } from "@mui/material";

import {
  getAllBookedSessionsByUserId,
  getAllSessions,
  getCoaches,
  getSessionsByCoachId,
} from "../../services/session.service";
import SessionCard from "../../components/SessionCard";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserDetails, setUserDetails } from "../../utils/auth";
import { handlePayment } from "../../services/payment.service";
import { PopupModal } from "react-calendly";
import { getuserById } from "../../services/user.service";
import PageBanner from "../../sections/PageBanner";
import { getDateAndTimeHandler } from "../../utils/getDateAndTime";

export default function SelectSmall() {
  const [sessionsIsLoading, setSessionsIsLoading] = useState(false);
  const [filteredSessionsisLoading, setFilteredSessionsIsLoading] =
    useState(false);
  const [coachList, setCoachList] = useState([]);
  const [currentCoach, setCurrentCoach] = useState();
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [hasLink, setHasLink] = useState({});
  const [popup, setPopup] = useState(false);
  const [popupLink, setPopupLink] = useState("");
  const [selectedBookedId, setSelectedBookedId] = useState("");
  const [bookedSessionList, setBookedSessionList] = useState(false);
  const userDetails = getUserDetails();
  const handleChange = (event) => {
    setCurrentCoach(event.target.value);
  };

  const handleSelect = async (coachId) => {
    if (userDetails) {
      setSessionsIsLoading(true);
      getSessionsByCoachId(coachId)
        .then((res) => {
          purchaseSession(userDetails, res?.data?.sessions);
        })
        .catch((err) => console.log(err));
      setSessionsIsLoading(false);

      getAllBookedSessionsByUserId(userDetails._id)
        .then((res) => {
          const filterData = res?.data?.bookedSessions?.filter(
            (i) => i?.session?.coach._id === coachId
          );
          bookedSession(
            userDetails,
            coachId ? filterData : res?.data?.bookedSessions
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const bookedSession = (userDetails, data) => {
    const apiSessionList = data;
    if (userDetails && apiSessionList) {
      const data = userDetails?.bookedSession;
      for (let i = 0; i < apiSessionList.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j]._id === apiSessionList[i]._id) {
            apiSessionList[i].isBooked = true;
          }
        }
      }
    }
    setBookedSessionList(apiSessionList);
  };

  const purchaseSession = (userDetails, data) => {
    const apiSessionList = data;
    if (userDetails && apiSessionList) {
      const data = userDetails?.purchasedSession;
      for (let i = 0; i < apiSessionList.length; i++) {
        let count = 1;
        for (let j = 0; j < data.length; j++) {
          if (data[j].session._id === apiSessionList[i]._id) {
            apiSessionList[i].isPurchased = true;
            if (data[j].session.sessionType !== "freeReading") {
              apiSessionList[i].count = count++;
            }
            apiSessionList[i].bookedSessionId = data[j]._id;
          }
        }
      }
      setFilteredSessions(apiSessionList);
    }
  };

  const DivideSessions = ({ filteredSessions }) => {
    // const booked = filteredSessions
    //   ?.filter((session) => {
    //     if (currentCoach === "") return true;
    //     else if (session?.coach?.firstName === currentCoach) return true;
    //     else return false;
    //   })
    //   ?.filter((filteredSession) => filteredSession?.isBooked);
    const bought = filteredSessions
      ?.filter((session) => {
        if (!currentCoach) return true;
        else if (session?.coach?.firstName === currentCoach) return true;
        else return false;
      })
      ?.filter((filteredSession) => filteredSession?.isPurchased);
    // const toPurchase = filteredSessions
    //   ?.filter((session) => {
    //     if (currentCoach === "") return true;
    //     else if (session?.coach?.firstName === currentCoach) return true;
    //     else return false;
    //   })
    //   ?.filter(
    //     (filteredSession) =>
    //       !filteredSession?.isPurchased && !filteredSession?.isBooked
    //   );

    const filteredFreeSessions = bought?.filter(
      (session) => session?.sessionType === "freeReading"
    );

    const lowestOrder = Math.min(
      ...filteredFreeSessions?.map((session) => session?.coach?.order)
    );
    const sessionWithLowestOrder = filteredFreeSessions?.filter(
      (session) => session?.coach?.order === lowestOrder
    );
    const paidSession = bought?.filter((i) => i?.sessionType !== "freeReading");

    const finalDisplaySessionList = sessionWithLowestOrder?.concat(paidSession);

    return (
      <>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "20px", md: "26px" },
            display: "block",
            margin: "0 0.7rem",
            borderBottom: "1px solid #671d63",
          }}
        >
          Booked Sessions
        </Typography>
        <Grid
          spacing={3}
          container
          sx={{
            margin: "0 !important",
            width: "100% !important",
          }}
          rowGap={"15px"}
        >
          {bookedSessionList && bookedSessionList?.length ? (
            bookedSessionList?.map((session) => (
              <Grid
                key={session?._id}
                spacing={1}
                item
                xs={12}
                md={6}
                lg={4}
                sx={{
                  padding: {
                    xs: "16px 0 !important",
                    md: "12px !important",
                    lf: "24px !important",
                  },
                }}
              >
                <SessionCard
                  coachName={session?.session?.coach?.firstName}
                  sessionLink={hasLink[session?._id] && session?.link}
                  date={
                    getDateAndTimeHandler(session?.sessionStartDate)
                      .formattedDate
                  }
                  time={
                    getDateAndTimeHandler(session?.sessionStartDate)
                      .formattedTime
                  }
                  detail={session?.session?.details}
                  title={session?.session?.title}
                  btnText={
                    !hasLink[session?._id]
                      ? session?.isBooked
                        ? "Get Link"
                        : session?.isPurchased
                        ? "Book Now"
                        : "Book Your Coaching"
                      : ""
                  }
                  onClick={
                    session?.isBooked
                      ? () => {
                          setHasLink((prev) => ({
                            ...prev,
                            [session?._id]: true,
                          }));
                        }
                      : () =>
                          session?.isPurchased
                            ? bookHandler(session)
                            : purchaseHandler(
                                session?._id,
                                session?.stripePriceId
                              )
                  }
                />
              </Grid>
            ))
          ) : (
            <Typography
              sx={{ fontSize: { xs: "16px", md: "20px" }, marginLeft: "1rem" }}
            >
              {!currentCoach
                ? "No sessions have been booked yet..."
                : `You have not booked any sessions from coach ${currentCoach}.`}
            </Typography>
          )}
        </Grid>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "20px", md: "26px" },
            display: "block",
            margin: "5rem 0.7rem 0",
            borderBottom: "1px solid #671d63",
          }}
        >
          Purchased Sessions
        </Typography>
        <Grid
          spacing={3}
          container
          sx={{
            margin: "0 !important",
            width: "100% !important",
          }}
          rowGap={"15px"}
        >
          {finalDisplaySessionList && finalDisplaySessionList?.length ? (
            finalDisplaySessionList?.map((session) => (
              <Grid
                key={session?._id}
                spacing={1}
                item
                xs={12}
                md={6}
                lg={4}
                sx={{
                  padding: {
                    xs: "16px 0 !important",
                    md: "12px !important",
                    lf: "24px !important",
                  },
                }}
              >
                <SessionCard
                  coachName={session?.coach?.firstName}
                  sessionLink={hasLink[session?._id] && session?.sessionLink}
                  date={session?.date}
                  time={session?.time}
                  sessionImg={session?.coach?.coachImg}
                  detail={session?.details}
                  price={session?.price}
                  title={session?.title}
                  quantity={session?.count}
                  btnText={
                    !hasLink[session?._id]
                      ? session?.isBooked
                        ? "Get Link"
                        : session?.isPurchased
                        ? "Book Now"
                        : "Book Your Coaching"
                      : ""
                  }
                  onClick={
                    session?.isBooked
                      ? () => {
                          setHasLink((prev) => ({
                            ...prev,
                            [session?._id]: true,
                          }));
                        }
                      : () =>
                          session?.isPurchased
                            ? bookHandler(session)
                            : purchaseHandler(
                                session?._id,
                                session?.stripePriceId
                              )
                  }
                />
              </Grid>
            ))
          ) : (
            <Typography
              sx={{ fontSize: { xs: "16px", md: "20px" }, marginLeft: "1rem" }}
            >
              {!currentCoach
                ? "You don't seem to have any unbooked purchased sessions..."
                : `No sessions from coach ${currentCoach?.firstName} have been bought yet...`}
            </Typography>
          )}
        </Grid>
        {/* <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '20px', md: '26px' },
            display: 'block',
            margin: '5rem 0.7rem 0',
            borderBottom: '1px solid #671d63',
          }}
        >
          Purchase Sessions
        </Typography>
        <Grid
          spacing={3}
          container
          sx={{
            margin: '0 !important',
            width: '100% !important',
          }}
          rowGap={'15px'}
        >
          {toPurchase && toPurchase?.filter((i) => i.sessionType !== 'freeReading').length ? (
            toPurchase
              ?.filter((i) => i.sessionType !== 'freeReading')
              .map((session) => (
                <Grid
                  key={session?._id}
                  spacing={1}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  sx={{
                    padding: {
                      xs: '16px 0 !important',
                      md: '12px !important',
                      lf: '24px !important',
                    },
                  }}
                >
                  <SessionCard
                    coachName={session?.coach?.firstName}
                    sessionLink={hasLink[session._id] && session?.sessionLink}
                    date={session?.date}
                    time={session?.time}
                    sessionImg={session?.coach?.coachImg}
                    detail={session?.details}
                    price={session?.price}
                    title={session?.title}
                    btnText={
                      !hasLink[session._id]
                        ? session.isBooked
                          ? 'Get Link'
                          : session.isPurchased
                          ? 'Book Now'
                          : 'Purchase'
                        : ''
                    }
                    onClick={
                      session?.isBooked
                        ? () => {
                            setHasLink((prev) => ({
                              ...prev,
                              [session._id]: true,
                            }));
                          }
                        : () =>
                            session?.isPurchased
                              ? bookHandler(session)
                              : purchaseHandler(session?._id, session?.stripePriceId)
                    }
                  />
                </Grid>
              ))
          ) : (
            <Typography sx={{ fontSize: { xs: '16px', md: '20px' }, marginLeft: '1rem' }}>
              {currentCoach === ''
                ? 'No sessions availabel to purchase...'
                : `You have bought all sessions available from coach ${currentCoach}.`}
            </Typography>
          )}
        </Grid> */}
      </>
    );
  };

  useEffect(() => {
    const getData = async () => {
      setSessionsIsLoading(true);
      setFilteredSessionsIsLoading(true);
      const coachesData = await getCoaches();
      if (userDetails) {
        getAllSessions()
          .then((res) => {
            setSessions(res?.data?.sessions);
            purchaseSession(userDetails, res?.data?.sessions);
          })
          .catch((err) => console.log(err));
        getAllBookedSessionsByUserId(userDetails._id)
          .then((res) => {
            bookedSession(userDetails, res?.data?.bookedSessions);
          })
          .catch((err) => console.log(err));
      }
      if (coachesData) {
        setCoachList(coachesData?.data?.coaches);
      }
      setFilteredSessionsIsLoading(false);
      setSessionsIsLoading(false);
    };
    getData();
  }, []);

  const bookHandler = (data) => {
    setPopupLink(data?.calendlyLink);
    setSelectedBookedId(data?.bookedSessionId);
    setPopup(true);
  };

  const popupCloseHandler = async () => {
    setPopup(false);
    if (userDetails) {
      const { data } = await getuserById(userDetails._id);
      setUserDetails(data);
      getAllSessions()
        .then((res) => {
          setSessions(res?.data?.sessions);
          purchaseSession(userDetails, res?.data?.sessions);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const purchaseHandler = (sessionId, price_id) => {
    if (userDetails) {
      const data = {
        price_id,
        userId: userDetails._id,
        sessionId,
      };
      handlePayment(data)
        .then((res) => {
          window.location.replace(res?.data?.url);
        })
        .catch((err) => console.log("err :", err));
    }
  };
  return (
    <>
      <PageBanner imgSrc="./prevPurchase.jpg" heading="Sessions" />
      <Box
        sx={{
          color: "#671d61",
          padding: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
        }}
      >
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: "end",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: { xs: "20px", sm: "24px", md: "27px" } }}
            ></Typography>
            <FormControl
              sx={{
                minWidth: { xs: "100%", sm: "240px" },
                borderColor: "#671d61",
                color: "#671d63",
                marginTop: { xs: "16px", sm: 0 },
              }}
              size="medium"
            >
              <InputLabel id="demo-select-large-label">
                Choose Your Coach
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentCoach}
                onChange={handleChange}
                input={<OutlinedInput label="Choose Your Coach" />}
                sx={{ mb: { xs: "25px", sm: 0 } }}
              >
                {coachList?.length > 0 && coachList?.map((singleCoach) => {
                  return (
                    <MenuItem
                      key={singleCoach?._id}
                      value={singleCoach?.firstName}
                      sx={{
                        backgroundColor: "#fff",
                        color: "#671d61",
                        ":hover": {
                          backgroundColor: "#671d61",
                          color: "#fff",
                        },
                      }}
                      onClick={() => {
                        setCurrentCoach(singleCoach);
                        handleSelect(singleCoach?._id);
                        // getSessionsByCoachId(singleCoach?._id);
                      }}
                    >
                      {singleCoach?.firstName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Grid
            spacing={3}
            container
            sx={{
              margin: "0 !important",
              width: "100% !important",
            }}
            rowGap={"15px"}
          >
            {filteredSessionsisLoading || sessionsIsLoading ? (
              <Backdrop open={sessionsIsLoading}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "25px",
                    padding: "15px 45px",
                  }}
                >
                  <CircularProgress sx={{ color: "white" }} color="secondary" />
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
            ) : filteredSessions?.length > 0 &&
              (!sessionsIsLoading || !filteredSessionsisLoading) ? (
              <DivideSessions filteredSessions={filteredSessions} />
            ) : (
              <Typography
                sx={{ color: "#671d63", fontSize: "45px", margin: "40px auto" }}
              >
                No Sessions Found....
              </Typography>
            )}
          </Grid>
        </Box>
        <PopupModal
          url={`${popupLink}`}
          prefill={{
            email: userDetails?.email,
            name: userDetails?.name,
          }}
          onModalClose={popupCloseHandler}
          open={popup}
          rootElement={document.getElementById("root")}
          utm={{
            utmContent: selectedBookedId,
          }}
        />
      </Box>
    </>
  );
}
