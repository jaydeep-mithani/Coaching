import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormModal from "./FormModal";
import { getAuthToken } from "../utils/auth";
import EventEmitter from "reactjs-eventemitter";
import BookSessionBtn from "../components/BookSessionButton";

const HeroBanner = ({
  title,
  imageUrl,
  header,
  listItems,
  buttonText,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClose = () => {
    setOpen(false);
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

  return (
    <>
      <FormModal open={open} handleClose={handleClose} />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", lg: "row" },
            gap: "22px",
            alignItems: { xs: "end", md: "center" },
            position: "relative",
            zIndex: 1,
            minHeight: { lg: "100vh", xl: "auto" },
          }}
          maxWidth="false"
        >
          <Box
            sx={{
              maxWidth: { xs: "auto  ", md: "100%", lg: "40%" },
              paddingX: { xs: "14px", md: "100px", lg: "24px" },
              paddingY: { xl: "50px" },
            }}
          >
            {title && (
              <Typography
                component={"h4"}
                sx={{
                  fontSize: { xs: "15px", md: "22px" },
                  fontWeight: "700",
                  fontFamily: "'montserrat', cursive",
                  margin: "0.5rem 0",
                }}
              >
                {title}
              </Typography>
            )}
            {header && (
              <Typography
                component={"p"}
                sx={{
                  fontSize: { xs: "22px", md: "30px", lg: "38px" },
                  color: "#671d63",
                  fontWeight: "500",
                  lineHeight: { xs: "27px", md: "36px", lg: "40px" },
                  textTransform: "capitalize",
                  fontFamily: "'montserrat', cursive",
                  margin: "1rem 0",
                }}
              >
                {header}
              </Typography>
            )}
            {description && (
              <Typography
                variant="h6"
                sx={{ my: "1rem", textAlign: { xs: "left", sm: "justify" } }}
              >
                {description}
              </Typography>
            )}
            {listItems && (
              <List>
                {listItems?.map((item) => {
                  return (
                    <ListItem
                      sx={{ padding: "0", alignItems: "flex-start" }}
                      key={item?.key}
                    >
                      <ListItemIcon
                        sx={{ minWidth: "30px", paddingTop: "5px" }}
                      >
                        <CheckCircleIcon sx={{ color: "#671d63" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontWeight: "600",
                          textAlign: { xs: "left", sm: "justify" },
                          fontSize: "1.2rem",
                        }}
                        primary={item?.name}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
            <BookSessionBtn
              defaultText={
                <>
                  <>BOOK YOUR FREE ENERGY AND LIFE PATH READING</>
                </>
              }
              freeSessionText={<>BOOK YOUR FREE ENERGY AND LIFE PATH READING</>}
              bookText={"Book A Session"}
            />
          </Box>
          <Box sx={{ width: { xs: "auto  ", md: "100%", lg: "60%" } }}>
            <img
              src={imageUrl}
              alt="hero banner image"
              style={{ maxWidth: "100%" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroBanner;
