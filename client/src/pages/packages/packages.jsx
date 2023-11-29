import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import PageBanner from "../../sections/PageBanner";
import CheckIcon from "@mui/icons-material/Check";
import { productDescriptionData } from "../../utils/constant";
import { useEffect, useState } from "react";
import { PrimaryBtn } from "../../components/PrimaryBtn";
import { getCoaches } from "../../services/session.service";
import { useParams } from "react-router-dom";
import AgreePopup from "../../components/agreePopup";
import { getUserDetails } from "../../utils/auth";
import { handlePayment } from "../../services/payment.service";

const Packages = () => {
  const { id } = useParams();
  const [radioValue, setRadioValue] = useState();
  const [modeValue, setModeValue] = useState();
  const [currentCoach, setCurrentCoach] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [pack, setPack] = useState(null);
  const [coachList, setCoachList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [agreePopup, setAgreePopup] = useState(false);
  const [checked, setChecked] = useState(false);
  const [agreePopupPayload, setAgreePopupPayload] = useState({});
  const userDetails = getUserDetails();

  const handleAgreePopupClose = () => {
    setAgreePopupPayload({});
    setAgreePopup(false);
    setChecked(false);
  };

  const agreePopupSubmitHandler = () => {
    if (
      agreePopupPayload?.id &&
      agreePopupPayload?.stripePriceId &&
      agreePopupPayload?.mode
    ) {
      purchaseHandler(
        agreePopupPayload?.id,
        agreePopupPayload?.stripePriceId,
        agreePopupPayload?.mode
      );
    }
  };

  const agreePopupHandler = (data) => {
    setAgreePopupPayload({
      id: currentSession,
      stripePriceId: radioValue,
      mode: modeValue,
    });
    setAgreePopup(true);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    setModeValue(
      pack.sessions
        ?.filter((session) => session?.sessionType !== "freeReading")[0]
        ?.stripePrice?.filter((i) => i?.priceId === event.target.value)[0]?.mode
    );
  };
  const handleCoachChange = (event) => {
    setCurrentCoach(event.target.value);
    setPack(coachList?.filter((coach) => coach?._id === event.target.value)[0]);
    setCurrentSession(
      coachList
        ?.filter((coach) => coach?._id === event.target.value)[0]
        ?.sessions?.filter(
          (session) => session?.sessionType !== "freeReading"
        )[0]?._id
    );
  };
  const handleSessionChange = (event) => {
    setCurrentSession(event.target.value);
  };

  useEffect(() => {
    getCoaches()
      .then((res) => {
        setCoachList(res?.data?.coaches);
        if (!id) {
          setCurrentCoach(
            res?.data?.coaches?.filter((coach) => coach?.order === 1)[0]?._id
          );
          setCurrentSession(
            res?.data?.coaches
              ?.filter((coach) => coach?.order === 1)[0]
              ?.sessions?.filter(
                (session) => session?.sessionType !== "freeReading"
              )[0]?._id
          );
          setPack(res?.data?.coaches?.filter((coach) => coach?.order === 1)[0]);
          setRadioValue(
            res?.data?.coaches
              ?.filter((coach) => coach?.order === 1)[0]
              ?.sessions?.filter(
                (session) => session?.sessionType !== "freeReading"
              )[0]?.stripePrice[0]?.priceId
          );
          setModeValue(
            res?.data?.coaches
              ?.filter((coach) => coach.order === 1)[0]
              ?.sessions?.filter(
                (session) => session?.sessionType !== "freeReading"
              )[0]?.stripePrice[0]?.mode
          );
        } else {
          setCurrentCoach(
            res?.data?.coaches?.filter((coach) => coach?._id === id)[0]?._id
          );
          setCurrentSession(
            res?.data?.coaches
              ?.filter((coach) => coach?._id === id)[0]
              ?.sessions?.filter(
                (session) => session?.sessionType !== "freeReading"
              )[0]?._id
          );
          setPack(res?.data?.coaches?.filter((coach) => coach?._id === id)[0]);
          setRadioValue(
            res?.data?.coaches
              ?.filter((coach) => coach?._id === id)[0]
              ?.sessions?.filter(
                (session) => session?.sessionType !== "freeReading"
              )[0]?.stripePrice[0]?.priceId
          );
          setModeValue(
            res?.data?.coaches
              ?.filter((coach) => coach?._id === id)[0]
              ?.sessions?.filter(
                (session) => session?.sessionType !== "freeReading"
              )[0]?.stripePrice[0]?.mode
          );
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const purchaseHandler = (sessionId, price_id, mode) => {
    const data = {
      price_id,
      userId: userDetails?._id,
      sessionId,
      mode,
    };
    console.log("data :::", data);
    handlePayment(data)
      .then((res) => {
        window.location.replace(res?.data?.url);
      })
      .catch((err) => console.log("err ::", err));
  };

  return (
    <>
      <PageBanner heading="Our Packages" imgSrc="./plan.jpg" />
      {!isLoading ? (
        <>
          <Box
            sx={{
              padding: { xs: "20px" },
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <Box sx={{ padding: "20px 0" }}>
              <Typography
                paragraph
                sx={{
                  position: "relative",
                  fontSize: { xs: "0.9rem", sm: "1.25rem", md: "1.75rem" },
                  color: "#671D63",
                  padding: "12px 0",
                  fontWeight: "900",
                  borderBottom: "4px solid goldenrod",
                  width: "max-width",
                  textAlign: { xs: "left", sm: "justify" },
                  zIndex: "-1",
                }}
              >
                {productDescriptionData?.title}
              </Typography>
              {productDescriptionData?.data?.map((passage, index) => (
                <Box key={index}>
                  {passage?.type === "para" && (
                    <Typography
                      paragraph
                      sx={{
                        fontSize: "1rem",
                        textAlign: { xs: "left", sm: "justify" },
                        fontWeight: "100",
                        marginBottom: "16px",
                      }}
                    >
                      {passage?.content}
                    </Typography>
                  )}
                  {passage?.type === "bullet" && (
                    <ul>
                      {passage?.content?.map((bullet, index) => (
                        <li key={index}>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              fontWeight: "100",
                            }}
                          >
                            {bullet}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Typography
              variant="h4"
              sx={{
                maxWidth: "1100px",
                margin: "1rem auto 2rem",
                padding: "20px",
                paddingBottom: "10px",
                color: "#671d63",
                borderBottom: "4px solid goldenrod",
              }}
            >
              Pick a plan
            </Typography>
            {currentCoach && (
              <Box
                sx={{
                  maxWidth: "1100px",
                  margin: "50px auto",
                  display: "flex",
                }}
              >
                <FormControl
                  sx={{
                    minWidth: { xs: "100%", sm: "240px" },
                    borderColor: "#671d61",
                    color: "#671d63",
                    marginTop: { xs: "16px", sm: 0 },
                    marginLeft: "auto",
                  }}
                  size="medium"
                >
                  <InputLabel id="demo-select-large-label">
                    Choose Your Coach
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentCoach}
                    label="Coach"
                    onChange={handleCoachChange}
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
            )}
            {pack && currentSession ? (
              <>
                <Box
                  sx={{
                    maxWidth: "1100px",
                    margin: "50px auto",
                    textAlign: "center",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 10px 1px #ddd",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#671d63", padding: "1rem" }}
                  >
                    {`COACH ${pack?.firstName?.toLocaleUpperCase()}`}
                  </Typography>
                  {pack?.sessionFees?.oneToOne?.length &&
                    pack?.sessionFees?.oneToOne?.map((plan, index) => (
                      <Box
                        key={index}
                        sx={{ backgroundColor: "#671d63", padding: "1rem" }}
                      >
                        <Typography
                          paragraph
                          sx={{
                            margin: 0,
                            color: "#f2effb",
                            fontSize: { xs: "14px", md: "18px" },
                            marginBottom: "24px",
                            span: {
                              display: "block",
                              fontSize: { xs: "28px", md: "35px" },
                              fontWeight: 900,
                              color: "#fff",
                            },
                          }}
                        >
                          {plan?.title}
                          <span>£{plan?.price?.toLocaleString("en-UK")}</span>
                        </Typography>
                      </Box>
                    ))}
                </Box>
                <Box
                  sx={{
                    maxWidth: "1100px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    margin: {
                      xs: "20px auto",
                    },
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px 1px #ddd",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      flexBasis: 0,
                    }}
                  >
                    <Box
                      sx={{
                        maxHeight: "500px",
                        overflow: "hidden",
                        textAlign: "center",
                        img: {
                          margin: "0 auto",
                          maxWidth: "100%",
                          height: "auto",
                          objectFit: "cover",
                          objectPosition: "top",
                        },
                      }}
                    >
                      <img src={pack?.image} alt={pack?.coach} />
                    </Box>
                    <Box sx={{ paddingBottom: "2rem" }}>
                      <Typography
                        variant="h4"
                        sx={{
                          textAlign: "center",
                          fontWeight: 900,
                          color: "#671d63",
                          padding: "1rem",
                        }}
                      >
                        One-One Coaching Options
                      </Typography>
                      {pack?.sessionFees?.oneToOne?.length &&
                        pack?.sessionFees?.oneToOne?.map((fee, index) => (
                          <Box key={index} sx={{ margin: "1rem 0 2rem" }}>
                            <Typography
                              variant="h5"
                              sx={{
                                textAlign: "center",
                                fontWeight: 500,
                                color: "#000",
                              }}
                            >
                              Twice a week for 3 months £
                              {fee?.price?.toLocaleString("en-UK")}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "12px",
                                paddingLeft: "12px",
                                paddingBottom: "5px",
                              }}
                            >
                              <CheckIcon sx={{ color: "#671d63" }} />
                              <Typography>Pay in Full</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "12px",
                                paddingLeft: "12px",
                              }}
                            >
                              <CheckIcon sx={{ color: "#671d63" }} />
                              <Typography>
                                Or pay £
                                {(Number(fee?.price) / 3).toLocaleString(
                                  "en-UK"
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                  <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
                    <Box sx={{ padding: "1rem", minHeight: { md: "800px" } }}>
                      <Box
                        sx={{
                          maxWidth: "1100px",
                          margin: "10px auto 15px",
                          display: "flex",
                        }}
                      >
                        <FormControl
                          sx={{
                            minWidth: { xs: "100%", sm: "240px" },
                            borderColor: "#671d61",
                            color: "#671d63",
                            marginTop: { xs: "16px", sm: 0 },
                            marginLeft: "auto",
                          }}
                          size="medium"
                        >
                          <InputLabel id="demo-select-large-label">
                            Choose a Session
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentSession}
                            label="Session"
                            onChange={handleSessionChange}
                            input={<OutlinedInput label="Choose a Session" />}
                          >
                            {pack?.sessions?.filter(
                              (session) =>
                                session?.sessionType !== "freeReading"
                            )?.length > 0 &&
                              pack?.sessions
                                ?.filter(
                                  (session) =>
                                    session?.sessionType !== "freeReading"
                                )
                                ?.map((session) => (
                                  <MenuItem
                                    key={session?._id}
                                    value={session?._id}
                                  >
                                    {session?.title}
                                  </MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          padding: "1rem",
                          border: "1px solid #671d63",
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "10px",
                              borderBottom: "4px solid goldenrod",
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{ color: "#671d63", fontWeight: 500 }}
                            >
                              Item
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "#671d63", fontWeight: 500 }}
                            >
                              Price
                            </Typography>
                          </Box>
                          <RadioGroup
                            aria-labelledby="coach group"
                            name="coaches"
                            value={radioValue}
                            onChange={handleRadioChange}
                          >
                            {pack?.sessions?.filter(
                              (session) => session?._id === currentSession
                            )[0]?.stripePrice?.length &&
                              pack?.sessions
                                ?.filter(
                                  (session) => session?._id === currentSession
                                )[0]
                                ?.stripePrice?.map((plan, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      backgroundColor: "#f2effb",
                                      marginTop: "2rem",
                                      padding: "1rem",
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                      transition: "all 100ms linear",
                                      "&:hover": {
                                        transform: "scale(0.98)",
                                      },
                                    }}
                                  >
                                    <FormControlLabel
                                      value={plan?.priceId}
                                      control={<Radio />}
                                      label={
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              flexGrow: 4,
                                              flexBasis: 0,
                                            }}
                                          >
                                            {plan?.title}
                                          </span>
                                          <span
                                            style={{
                                              fontSize: "20px",
                                              fontWeight: 900,
                                              color: "#671d63",
                                              flexGrow: 1,
                                              flexBasis: 0,
                                            }}
                                          >{` £${plan?.price?.toLocaleString(
                                            "en-UK"
                                          )}`}</span>
                                        </Box>
                                      }
                                      sx={{
                                        "&.Mui-checked": {
                                          color: "#671d63",
                                        },
                                      }}
                                    />
                                  </Box>
                                ))}
                          </RadioGroup>
                        </Box>
                        <Box sx={{ display: "flex", marginTop: "4rem" }}>
                          <PrimaryBtn
                            onClick={() => agreePopupHandler({})}
                            fullWidth
                          >
                            Proceed to purchase
                          </PrimaryBtn>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  margin: "1rem auto 3rem",
                  padding: "2rem",
                  borderRadius: "8px",
                  boxShadow: "0 4px 15px 0 #eee",
                  maxWidth: "900px",
                  color: "#671d63",
                  fontWeight: 700,
                }}
              >{`No sessions available for ${
                coachList?.filter((coach) => coach?._id === currentCoach)[0]
                  ?.firstName
              } at the moment.`}</Typography>
            )}
          </Box>
        </>
      ) : (
        <Box sx={{ padding: "3.5rem 0", textAlign: "center" }}>
          <CircularProgress
            sx={{ color: "#671d63", mx: "auto", textAlign: "center" }}
            color="secondary"
          />
        </Box>
      )}
      <AgreePopup
        open={agreePopup}
        handleClose={handleAgreePopupClose}
        submit={agreePopupSubmitHandler}
        checked={checked}
        setChecked={setChecked}
      />
    </>
  );
};

export default Packages;
