import React, { useState } from "react";
import {
  Button,
  Paper,
  Popper,
  Menu,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import EventEmitter from "reactjs-eventemitter";

const CommonDropdown = ({
  dropdownItems,
  handleDrawerToggle,
  logout,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    handleDrawerToggle();
  };

  const logOutHandler = async () => {
    setLoggingOut(true);
    localStorage.removeItem("token");
    localStorage.clear();
    setLoggingOut(true);
    handleClose();
    logout();
    setOpen(false);
    EventEmitter.dispatch("logoutSuccess", true);
    navigate("/");
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      {!isMobile && (
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #fff",
            minWidth: "132px",
            ":hover": {
              backgroundColor: isMobile ? "transparent" : "#fff",
              color: "#671d63",
              border: "1px solid #671d63",
            },
          }}
        >
          My Account
        </Button>
      )}
      {!isMobile ? (
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          disablePortal
          sx={{
            zIndex: (theme) => theme.zIndex.tooltip,
            " .MuiPaper-root": {
              background: "#671d61",
            },
          }}
        >
          {({ TransitionProps }) => (
            <Paper
              elevation={3}
              sx={{
                borderRadius: "0px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "white",
                maxWidth: "200px",
                overflow: "hidden",
              }}
            >
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                disableScrollLock={true}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: 250,
                    marginTop: "26px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px !important",
                  },
                }}
                {...TransitionProps}
              >
                {dropdownItems?.map((item) => (
                  <MenuItem key={item?.path} onClick={handleClose}>
                    <Link
                      component={NavLink}
                      to={item?.path}
                      sx={{
                        width: "100%",
                        textDecoration: "none",
                        color: "#671d63",
                      }}
                    >
                      {item?.name}
                    </Link>
                  </MenuItem>
                ))}
                {!loggingOut && (
                  <Button
                    onClick={logOutHandler}
                    sx={{
                      color: "#671d63",
                      border: "1px solid #fff",
                      padding: "5px",
                      margin: "0 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      ":hover": { color: "#673d61" },
                    }}
                  >
                    <LogoutIcon sx={{ p: "5px" }} />
                    Logout
                  </Button>
                )}

                {loggingOut && (
                  <>
                    <CircularProgress color="secondary" />
                    <Typography>Logging out...</Typography>
                  </>
                )}
              </Menu>
            </Paper>
          )}
        </Popper>
      ) : (
        <Box sx={{ width: "250px", margin: "0 auto", textAlign: "center" }}>
          <Accordion
            sx={{
              border: "none",
              boxShadow: "none",
              width: "250px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              sx={{
                width: "150px",
                margin: "0 auto",
                textAlign: "center",
              }}
              id="panel1a-header"
            >
              <Typography
                sx={{
                  color: "#673d67",
                  width: "150px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                My Account
              </Typography>
            </AccordionSummary>
            <Box sx={{ width: "fit-content", textAlign: "left" }}>
              {dropdownItems?.map((item) => {
                return (
                  <AccordionDetails
                    key={item?.name}
                    sx={{
                      width: "215px",
                      textAlign: "center",
                      minHeight: "27px",
                      paddingBottom: "10px",
                    }}
                  >
                    <MenuItem key={item?.path} onClick={handleClose}>
                      <Link
                        component={NavLink}
                        to={item?.path}
                        sx={{
                          width: "100%",
                          textDecoration: "none",
                          color: "#671d63",
                        }}
                      >
                        {item?.name}
                      </Link>
                    </MenuItem>
                  </AccordionDetails>
                );
              })}
            </Box>
            {!loggingOut && (
              <Button
                onClick={logOutHandler}
                variant="text"
                sx={{
                  color: "#673d67",
                  border: "1px solid #671d61",
                  margin: "0 8px 15px",
                  padding: "8px 12px",
                  ":hover": {
                    background: "transparent",
                  },
                }}
              >
                <LogoutIcon sx={{ pr: "10px" }} />
                <Typography>Logout</Typography>
              </Button>
            )}

            {loggingOut && (
              <>
                <CircularProgress color="secondary" />
                <Typography>Logging out...</Typography>
              </>
            )}
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default CommonDropdown;
