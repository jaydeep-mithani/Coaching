import React, { useEffect, useState } from "react";
import { getUserDetails, getAuthToken, setUserDetails } from "../utils/auth";
import EventEmitter from "reactjs-eventemitter";
import { PrimaryBtn } from "./PrimaryBtn";
import { Box } from "@mui/material";
import FormModal from "../sections/FormModal";
import BookSession from "./bookSessionModel";
import { PopupModal } from "react-calendly";
import { getBookedFreeSession } from "../services/session.service";
import { getuserById } from "../services/user.service";

const BookSessionBtn = ({
  defaultText = (
    <>
      BOOK YOUR FREE ENERGY AND LIFE PATH READING
      {/* BOOK YOUR FREE ENERGY AND LIFE PATH READING */}
    </>
  ),
  freeSessionText,
  bookText,
  coachId,
  isPurchaseModel = false,
}) => {
  const userDetails = getUserDetails();
  const [loginOpen, setLoginOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const handleOpen = () => setLoginOpen(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handlePopupClose = () => {
    setLoginOpen(false);
  };
  const [popup, setPopup] = useState(false);
  const [popupLink, setPopupLink] = useState("");
  const [selectedBookedId, setSelectedBookedId] = useState("");


  const handleFreeReadingBooking = (data) => {
    setPopupLink(data?.calendlyLink);
    setSelectedBookedId(data?.bookedSessionId);
    setPopup(true);
    handleClose();
  }

  const popupCloseHandler = async () => {
    setPopup(false);
    if (userDetails) {
      const { data } = await getuserById(userDetails?._id);
      setUserDetails(data);
      window.location.reload();
    }
  };


  useEffect(() => {
    EventEmitter.subscribe("loginSuccess", (event) => {
      setIsLoggedIn(true);
    });

    EventEmitter.subscribe("logoutSuccess", (event) => {
      setIsLoggedIn(false);
    });
  }, []);

  useEffect(() => {
    if (getAuthToken() === null || getAuthToken().length === 0) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [getAuthToken()]);

  const handleClose = () => {
    setBookingOpen(false);
  };

  let btnText = defaultText;
  let onClickEvent = async () => {
    if (!userDetails.isFreeReadingBooked) {
      const freeSession = await getBookedFreeSession(userDetails?._id)
      const data = {
        calendlyLink : freeSession?.data?.bookedSession[0]?.session?.calendlyLink,
        bookedSessionId : freeSession?.data?.bookedSession[0]?._id
      }
      handleFreeReadingBooking(data)
    } else {
      setBookingOpen(true)
    }
  };
  if (userDetails) {
    if (userDetails.isFreeReadingBooked) {
      btnText = bookText;
    } else {
      btnText = freeSessionText;
    }
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          <FormModal open={loginOpen} handleClose={handlePopupClose} />
          <Box sx={{ margin: "1rem 0" }}>
            <PrimaryBtn onClick={handleOpen}>{btnText}</PrimaryBtn>
          </Box>
        </>
      ) : (
        <>
          <BookSession
            open={bookingOpen}
            handleClose={handleClose}
            userDetails={userDetails}
            coachId={coachId ? coachId : ""}
            isPurchaseModel={isPurchaseModel}
          />
          {btnText && (
            <Box sx={{ margin: "1rem 0" }}>
              <PrimaryBtn onClick={onClickEvent} props>
                {btnText}
              </PrimaryBtn>
            </Box>
          )}
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
        </>
      )}
    </>
  );
};

export default BookSessionBtn;
