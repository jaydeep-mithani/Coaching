import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PrimaryBtn } from "./PrimaryBtn";
import BookSessionBtn from "./BookSessionButton";
import { getCoachByName } from "../services/session.service";

const SuccessStories = ({
  id,
  title,
  content,
  imgSrc,
  reverse,
  descriptionArr,
  wholeContent,
  isDetailPage,
  isOurCoachCard = false,
}) => {
  const [coachDetail, setCoachDetail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getRita = async () => {
      await getCoachByName("rita")
        .then((res) => {
          setCoachDetail(res.data.coach);
        })
        .catch((err) => console.log(err));
    };

    getRita();
  }, []);

  return (
    <Box sx={{ paddingTop: 6, position: "relative" }}>
      <Box
        component={"div"}
        sx={{ mx: { xs: "20px", md: "50px", lg: "225px" } }}
        key={title}
        className="story"
      >
        <Paper
          elevation={3}
          sx={{
            width: "90%",
            position: "relative",
            display: "flex",
            flexDirection: {
              xs: "column",
              md: isDetailPage ? "column" : !reverse ? "row" : "row-reverse",
            },
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: "2.5rem 1.5rem",
            margin: "0 auto",
          }}
        >
          {!descriptionArr ? (
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                top: { xs: "-30px", lg: "-48px" },
                right: !reverse ? "0.9rem" : null,
                left: reverse ? "0.9rem" : null,
                fontSize: { xs: "45px", sm: "55px", md: "85px" },
                fontWeight: "bold",
                color: "#671d63",
                // lineHeight: { xs: "30px", sm: "35px", md: "85px", lg: "120px" },
                backgroundColor: "#f8e3c4",
                borderRadius: "50%",
                width: { xs: "40px", md: "55px" },
                height: { xs: "40px", md: "55px" },
                padding: "10px",
                textAlign: "center",
              }}
            >
              ”
            </Typography>
          ) : null}
          <Box
            sx={{
              width: { md: "35%", xs: "100%" },
              maxHeight: "350px",
              height: {
                md: "auto",
                sm: "550px",
                xs: "350px",
              },
              margin: {
                xs: isDetailPage ? "0 auto" : "2px auto",
                md: isDetailPage ? "10px auto" : 0,
              },
              objectFit: { xs: "contain", md: "cover" },
            }}
            className="coachesImg"
          >
            <img
              src={imgSrc}
              alt="story image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: !isDetailPage ? "60%" : "100%",
                lg: !isDetailPage ? "63%" : "100%",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "18px", sm: "28px" },
                color: !isDetailPage ? "#414141" : "#671D63",
                lineHeight: { xs: "22px", sm: "30px" },
                textTransform: "capitalize",
                fontFamily: "'montserrat', sans-serif",
                px: { xs: "1rem", md: "2rem", lg: "3rem" },
                my: { xs: "8px", md: "10px", lg: "15px" },
              }}
            >
              {title}
            </Typography>
            {wholeContent
              ? descriptionArr?.map((para, index) => (
                  <Typography
                    key={index}
                    variant="h6"
                    sx={{
                      color: "#575757",
                      fontSize: { xs: "15px", sm: "16px" },
                      lineHeight: { xs: "20px", sm: "18px" },
                      px: { xs: "1.2rem", md: "2.2rem", lg: "3.2rem" },
                      mb: { xs: "8px", md: "10px", lg: "15px" },
                    }}
                  >
                    {para}
                  </Typography>
                ))
              : descriptionArr?.slice(0, 2)?.map((para) => (
                  <Fragment key={para}>
                    <Typography
                      paragraph
                      sx={{
                        color: "#575757",
                        fontSize: { xs: "15px", sm: "16px" },
                        lineHeight: { xs: "20px", sm: "18px" },
                        px: { xs: "1.2rem", md: "2.2rem", lg: "3.2rem" },
                        mb: { xs: "8px", md: "10px", lg: "15px" },
                        textAlign: { xs: "left", sm: "justify" },
                      }}
                    >
                      {para}
                    </Typography>
                  </Fragment>
                ))}

            {isOurCoachCard && (
              <Box
                sx={{
                  margin: "0.5rem 0",
                  px: { xs: "1.2rem", md: "2.2rem", lg: "3.2rem" },
                }}
              >
                <Typography
                  to={
                    id === coachDetail[0]?._id
                      ? `/coaching-with-rita`
                      : `/ourCoachesDetail/${id}`
                  }
                  component={Link}
                  sx={{
                    color: "#671d63",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  Read More...
                </Typography>
              </Box>
            )}

            {descriptionArr && !wholeContent && (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  px: { xs: "1.2rem", md: "2.2rem", lg: "3.2rem" },
                }}
              >
                {isOurCoachCard && (
                  <BookSessionBtn
                    defaultText={"Book a session now"}
                    freeSessionText={"Book a free session"}
                    bookText={"Book a session now"}
                    coachId={id}
                  />
                )}

                {isOurCoachCard && (
                  <Box sx={{ margin: "1rem 0" }}>
                    <PrimaryBtn
                      onClick={() => navigate("/packages/" + id)}
                      props
                    >
                      Book Your Coaching
                    </PrimaryBtn>
                  </Box>
                )}
              </Box>
            )}
            {content && (
              <Typography
                paragraph
                sx={{
                  color: "#575757",
                  textAlign: { xs: "left", sm: "justify" },
                  fontSize: { xs: "15px", sm: "23px" },
                  lineHeight: { xs: "20px", sm: "28px" },
                  px: { xs: "1.2rem", md: "2.2rem", lg: "3.2rem" },
                  mb: { xs: "8px", md: "10px", lg: "15px" },
                }}
              >
                {content}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SuccessStories;
