import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { MainModal } from "./MainModal";
import {
  getCoaches,
  getSessionsByCoachID,
  getAllSessions,
  getCoachById,
  getAllBookedSessionsByUserId,
} from "../services/session.service";
import SessionCard from "./SessionCard";
import { handlePayment } from "../services/payment.service";
import { PopupModal } from "react-calendly";
import { getUserDetails, setUserDetails } from "../utils/auth";
import { getuserById } from "../services/user.service";
import AgreePopup from "./agreePopup";
import { getDateAndTimeHandler } from "../utils/getDateAndTime";

const BookSession = ({
  open,
  handleClose,
  userDetails,
  coachId,
  isPurchaseModel = false,
}) => {
  const [coach, setCoach] = useState("");
  const [agreePopup, setAgreePopup] = useState(false);
  const [agreePopupPayload, setAgreePopupPayload] = useState({});
  const [checked, setChecked] = useState(false);
  const [coachDetail, setCoachDetail] = useState();
  const [coachList, setCoachList] = useState([]);
  const [sessionList, setSessionList] = useState(null);
  const [bookedSessionList, setBookedSessionList] = useState(false);
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [popup, setPopup] = useState(false);
  const [popupLink, setPopupLink] = useState("");
  const [hasLink, setHasLink] = useState({});
  const [selectedBookedId, setSelectedBookedId] = useState("");

  const [isCoachPage, setIsCoachPage] = useState(false);

  const handleAgreePopupClose = () => {
    setAgreePopupPayload({});
    setAgreePopup(false);
    setChecked(false);
  };

  const handleChange = (event) => {
    setCoach(event.target.value);
    if (userDetails) {
      getSessionsByCoachID(event.target.value)
        .then((res) => {
          purchaseSession(userDetails, res?.data?.sessions);
          getPurchasedCount();
        })
        .catch((err) => console.log(err));
      getAllBookedSessionsByUserId(userDetail._id)
        .then((res) => {
          const filterData = res?.data?.bookedSessions?.filter(
            (i) => i?.session?.coach?._id === event.target.value
          );
          bookedSession(userDetail, filterData);
        })
        .catch((err) => console.log(err));
    }
  };

  const finalDisplaySessionList = (sessions) => {
    const paidSession = sessions?.filter(
      (i) => i?.sessionType !== "freeReading"
    );
    var result = sessions?.reduce((unique, o) => {
      if (
        !unique?.some((obj) => obj?.sessionType === "freeReading") &&
        o?.sessionType === "freeReading" &&
        (o?.isBooked || o?.isPurchased)
      ) {
        unique?.push(o);
      }
      return unique;
    }, []);

    setSessionList(result?.concat(paidSession));
  };

  const bookedSession = (userDetails, data) => {
    const apiSessionList = data;
    if (userDetails && apiSessionList) {
      const data = userDetails?.bookedSession;
      for (let i = 0; i < apiSessionList?.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j]?._id === apiSessionList[i]?._id) {
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
          if (data[j]?.session?._id === apiSessionList[i]?._id) {
            apiSessionList[i].isPurchased = true;
            if (data[j].session.sessionType !== "freeReading") {
              apiSessionList[i].count = count++;
            }
            apiSessionList[i].bookedSessionId = data[j]._id;
          }
        }
      }
      finalDisplaySessionList(apiSessionList);
      // setSessionList(purchaseSession);
    }
  };

  const getPurchasedCount = () => {
    setPurchasedCount(
      userDetails?.purchasedSession?.filter((i) => i?.status === "purchased")
        ?.length
    );
  };

  const purchaseHandler = (sessionId, price_id) => {
    const data = {
      price_id,
      userId: userDetails._id,
      sessionId,
    };
    handlePayment(data)
      .then((res) => {
        window.location.replace(res?.data?.url);
      })
      .catch((err) => console.log("err ::", err));
  };

  const bookHandler = (data) => {
    setPopupLink(data?.calendlyLink);
    setSelectedBookedId(data?.bookedSessionId);
    setPopup(true);
    handleClose();
  };
  const userDetail = getUserDetails();

  const popupCloseHandler = async () => {
    setPopup(false);
    if (userDetail) {
      const { data } = await getuserById(userDetail._id);
      setUserDetails(data);
      getAllSessions()
        .then((res) => {
          purchaseSession(userDetails, res?.data?.sessions);
          getPurchasedCount();
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (
      window.location.pathname === "/our-coaches" ||
      window.location.pathname === "/coaching-with-rita"
    ) {
      setIsCoachPage(true);
      if (window.location.pathname === "/our-coaches") {
        getCoachById(coachId)
          .then((res) => {
            setCoachDetail(res?.data?.coach);
          })
          .catch((err) => console.log(err));
      }
      getSessionsByCoachID(coachId)
        .then((res) => {
          purchaseSession(userDetails, res?.data?.sessions);
          getPurchasedCount();
        })
        .catch((err) => console.log(err));

      getAllBookedSessionsByUserId(userDetail._id)
        .then((res) => {
          const filterData = res?.data?.bookedSessions?.filter(
            (i) => i?.session?.coach?._id === coachId
          );
          bookedSession(userDetail, filterData);
        })
        .catch((err) => console.log(err));
    } else if (window.location.pathname.includes("ourCoachesDetail")) {
      setIsCoachPage(true);

      getCoachById(coachId)
        .then((res) => {
          setCoachDetail(res?.data?.coach);
        })
        .catch((err) => console.log(err));

      getSessionsByCoachID(coachId)
        .then((res) => {
          purchaseSession(userDetails, res?.data?.sessions);
          getPurchasedCount();
        })
        .catch((err) => console.log(err));
    } else {
      setCoach("");
      getCoaches()
        .then((res) => setCoachList(res?.data?.coaches))
        .catch((err) => console.log(err));

      getAllSessions()
        .then((res) => {
          purchaseSession(userDetails, res?.data?.sessions);
          getPurchasedCount();
        })
        .catch((err) => console.log(err));

      getAllBookedSessionsByUserId(userDetail._id)
        .then((res) => {
          bookedSession(userDetail, res?.data?.bookedSessions);
        })
        .catch((err) => console.log(err));
    }
  }, [open]);

  const agreePopupHandler = (data) => {
    setAgreePopupPayload({
      id: data._id,
      stripePriceId: data?.stripePriceId,
    });
    setAgreePopup(true);
  };

  const agreePopupSubmitHandler = () => {
    if (agreePopupPayload.id && agreePopupPayload.stripePriceId) {
      purchaseHandler(agreePopupPayload.id, agreePopupPayload.stripePriceId);
    }
  };

  return (
    <>
      <MainModal open={open} handleClose={handleClose} lg>
        <Typography
          variant="h6"
          sx={{
            color: "#671d63",
            fontWeight: 900,
            borderBottom: "1px solid #aaa",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {isCoachPage && coachDetail?.firstName
            ? `Book your session with ${coachDetail?.firstName} now`
            : "Book your session now"}

          {/* {isPurchased && (
            <Typography
              sx={{
                color: "#000",
                fontWeight: 900,
                paddingBottom: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              All Purchased session : {purchasedCount}
            </Typography>
          )} */}
        </Typography>
        <form>
          {!isCoachPage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontWeight: 900,
                  paddingBottom: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Hi, {userDetails?.name}
              </Typography>
            </Box>
          )}
          {!isCoachPage && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "25px",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    flexBasis: 0,
                    flexGrow: 1,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Choose your coach
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={coach}
                      label="Coach"
                      onChange={handleChange}
                      input={<OutlinedInput label="Choose Your Coach" />}
                    >
                      {coachList?.length > 0 &&
                        coachList?.map((coachItem) => (
                          <MenuItem key={coachItem?._id} value={coachItem?._id}>
                            {coachItem?.firstName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              maxHeight: "50vh",
              paddingRight: "15px",
              paddingLeft: "5px",
              overflowY: "scroll",
              "scrollbar-width": "1px",
              "::-webkit-scrollbar": {
                width: "2px",
                background: "transparent",
              },
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#671d63",
                  fontWeight: 900,
                  borderBottom: "1px solid #aaa",
                  paddingBottom: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Booked session
              </Typography>
              {!isPurchaseModel &&
                (bookedSessionList?.length > 0 ? (
                  <Grid
                    spacing={3}
                    container
                    sx={{
                      marginTop: "0 !important",
                      paddingBottom: "25px",
                      gap: "25px 0",
                    }}
                  >
                    {bookedSessionList?.map((i) => (
                      <Grid key={i?._id} item xs={12} md={6}>
                        <SessionCard
                          title={i?.session?.title}
                          detail={i?.session?.details}
                          sessionLink={hasLink[i?._id] && i?.link}
                          btnText={
                            !hasLink[i?._id]
                              ? i?.isBooked
                                ? "Get Link"
                                : i?.isPurchased
                                ? "Book Now"
                                : "Book Your Coaching"
                              : ""
                          }
                          quantity={i?.count}
                          date={
                            getDateAndTimeHandler(i?.sessionStartDate)
                              ?.formattedDate
                          }
                          time={
                            getDateAndTimeHandler(i?.sessionStartDate)
                              ?.formattedTime
                          }
                          onClick={
                            i?.isBooked
                              ? () => {
                                  setHasLink((prev) => ({
                                    ...prev,
                                    [i?._id]: true,
                                  }));
                                }
                              : () =>
                                  i?.isPurchased
                                    ? bookHandler(i)
                                    : agreePopupHandler(i)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      paddingBottom: "0.5rem",
                      marginBottom: "1rem",
                      textAlign: "center",
                    }}
                  >
                    No session available
                  </Typography>
                ))}
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#671d63",
                  fontWeight: 900,
                  borderBottom: "1px solid #aaa",
                  padding: "1.5rem 0 0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Purchased Session
              </Typography>
              {!isPurchaseModel &&
                (sessionList?.filter(
                  (i) =>
                    (i?.sessionType === "freeReading" &&
                      (i?.isPurchased || i?.isBooked)) ||
                    i?.isPurchased ||
                    i?.isBooked
                )?.length > 0 ? (
                  <Grid
                    spacing={3}
                    container
                    sx={{
                      marginTop: "0 !important",
                      paddingBottom: "25px",
                      gap: "25px 0",
                    }}
                  >
                    {sessionList
                      ?.filter(
                        (i) =>
                          (i?.sessionType === "freeReading" &&
                            (i?.isPurchased || i?.isBooked)) ||
                          i?.isPurchased ||
                          i?.isBooked
                      )
                      ?.map((i) => (
                        <Grid key={i?._id} item xs={12} md={6}>
                          <SessionCard
                            title={i?.title}
                            detail={i?.details}
                            sessionLink={hasLink[i?._id] && i?.sessionLink}
                            btnText={
                              !hasLink[i?._id]
                                ? i?.isBooked
                                  ? "Get Link"
                                  : i?.isPurchased
                                  ? "Book Now"
                                  : "Book Your Coaching"
                                : ""
                            }
                            quantity={i?.count}
                            onClick={
                              i?.isBooked
                                ? () => {
                                    setHasLink((prev) => ({
                                      ...prev,
                                      [i?._id]: true,
                                    }));
                                  }
                                : () =>
                                    i?.isPurchased
                                      ? bookHandler(i)
                                      : agreePopupHandler(i)
                            }
                          />
                        </Grid>
                      ))}
                  </Grid>
                ) : (
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      paddingBottom: "0.5rem",
                      marginBottom: "1rem",
                      textAlign: "center",
                    }}
                  >
                    No session available
                  </Typography>
                ))}
            </Box>
            {/* {isPurchaseModel &&
              (sessionList?.filter(
                (i) =>
                  i.sessionType !== "freeReading" &&
                  !i.isPurchased &&
                  !i.isBooked
              )?.length > 0 ? (
                <Grid
                  spacing={3}
                  container
                  sx={{
                    marginTop: "0 !important",
                    paddingBottom: "25px",
                    // paddingRight: { md: "20px" },
                  }}
                >
                  {sessionList
                    ?.filter(
                      (i) =>
                        i.sessionType !== "freeReading" &&
                        !i.isPurchased &&
                        !i.isBooked
                    )
                    ?.map((i) => (
                      <Grid
                        key={i?._id}
                        sx={{ height: "100% !important" }}
                        item
                        xs={12}
                        md={6}
                      >
                        <SessionCard
                          title={i.title}
                          detail={i.details}
                          sessionLink={hasLink && i?.sessionLink}
                          btnText={
                            i.isBooked
                              ? "Get Link"
                              : i.isPurchased
                              ? "Book Now"
                              : "Book Your Coaching"
                          }
                          onClick={
                            i.isBooked
                              ? () => {
                                  setHasLink(true);
                                }
                              : () =>
                                  i.isPurchased
                                    ? bookHandler(i)
                                    : agreePopupHandler(i)
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    paddingBottom: "0.5rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  No session available
                </Typography>
              ))} */}
          </Box>
        </form>
      </MainModal>
      <AgreePopup
        open={agreePopup}
        handleClose={handleAgreePopupClose}
        submit={agreePopupSubmitHandler}
        checked={checked}
        setChecked={setChecked}
      />
      <PopupModal
        url={`${popupLink}`}
        prefill={{
          email: userDetail?.email,
          name: userDetail?.name,
        }}
        onModalClose={popupCloseHandler}
        open={popup}
        rootElement={document.getElementById("root")}
        utm={{
          utmContent: selectedBookedId,
        }}
      />
    </>
  );
};

export default BookSession;
