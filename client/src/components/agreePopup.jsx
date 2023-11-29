import React, { useState } from "react";
import { MainModal } from "./MainModal";
import { Box, Button, Checkbox, Link, Typography } from "@mui/material";
import DisclaimerModelBtn from "./DisclaimerModelBtn";
import { NavLink, useNavigate } from "react-router-dom";

const AgreePopup = ({ open, handleClose, submit, checked, setChecked }) => {
  const navigate = useNavigate();
  return (
    <>
      <MainModal open={open} handleClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            gap: "7px",
            alignItems: "start",
            marginBottom: "30px",
          }}
        >
          <Checkbox
            size="small"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          <Typography sx={{ marginTop: "7px" }}>
            I agree to Become Your Creator LTD’s{" "}
            <DisclaimerModelBtn text={"Disclaimer"} /> and{" "}
            <Link
              component={NavLink}
              sx={{
                color: "#671d63",
                textDecoration: "none",
                ":hover": { color: "#671d63" },
                borderBottom: "1px solid #671d63",
                borderRadius: 0,
                lineHeight: "10px",
              }}
              to={"/privacy-policy"}
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              component={NavLink}
              sx={{
                color: "#671d63",
                textDecoration: "none",
                ":hover": { color: "#671d63" },
                borderBottom: "1px solid #671d63",
                borderRadius: 0,
                lineHeight: "10px",
              }}
              to={"/terms-and-conditions"}
            >
              T&Cs
            </Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlineds"
            sx={{
              color: "#671d61",
              border: "1px solid #671d63",
              maxWidth: "fit-content",
              fontSize: { xs: "12px", sm: "15px", md: "18px" },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "#671d61",
              border: "1px solid #671d63",
              maxWidth: "fit-content",
              fontSize: { xs: "12px", sm: "15px", md: "18px" },
              "&.Mui-disabled": {
                color: "#fff",
                backgroundColor: "#ddd",
                fontWeight: "400",
                border: "none",
              },
            }}
            disabled={!checked}
            onClick={submit}
          >
            Book Your Coaching
          </Button>
        </Box>
      </MainModal>
    </>
  );
};

export default AgreePopup;
