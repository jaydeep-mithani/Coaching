import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import { footerItems } from "../../utils/constant";
import { MainModal } from "../../components/MainModal";
import DisclaimerModelBtn from "../../components/DisclaimerModelBtn";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e5e9f8",
        padding: { md: "5rem", xs: "1rem" },
      }}
    >
      <Box
        sx={{
          maxWidth: "1500px",
          padding: "40px 0",
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: { xs: "space-between", md: "space-between" },
          borderBottom: "1px solid #671d63",
          gap: { xs: "15px", md: "30px" },
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            maxWidth: { md: "50%", xs: "100%" },
            display: { md: "flex", xs: "block" },
            gap: "50px",
            alignItems: "center",
            marginBottom: { xs: "50px", md: "0" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              paddingBottom: "30px",
            }}
          >
            <Box
              sx={{
                borderRadius: "100%",
                overflow: "hidden",
                border: "5px solid #fff",
              }}
            >
              <Link to="/" style={{ display: "flex" }}>
                <img
                  src="/becomeYourCreator.jpeg"
                  alt="logo"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              </Link>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: "#671d63",
                fontSize: "1.2rem",
                fontWeight: 900,
                paddingBottom: { xs: "10px", md: "30px" },
                margin: 0,
              }}
            >
              Become Your Creator LTD.
            </Typography>
            <Typography
              paragraph
              sx={{
                color: "#671d63",
                margin: 0,
                lineHeight: "1.3rem",
                textAlign: { xs: "left", sm: "justify" },
              }}
            >
              Coaching services offered by Become Your Creator LTD. are designed
              to provide information and education to clients. The company
              focuses on empowering individuals to take control of their lives,
              set goals, and work towards achieving them. However, it is
              important to understand and acknowledge certain guidelines and
              disclaimers to ensure the safety and well-being of all individuals
              involved.
              <DisclaimerModelBtn text={"Read More..."} />
            </Typography>
          </Box>
        </Box>
        <Box sx={{ maxWidth: { md: "25%", xs: "50%" } }}>
          <Typography
            variant="h3"
            sx={{
              color: "#671d63",
              fontSize: "1.2rem",
              fontWeight: 900,
              paddingBottom: { xs: "10px", md: "30px" },
              margin: 0,
            }}
          >
            QUICK LINKS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "flex-start",
            }}
          >
            {footerItems?.map((item) => {
              return (
                <Typography
                  key={item?.name}
                  component={Link}
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  to={item?.href}
                  sx={{
                    color: "#671d63",
                    lineHeight: "1.5rem",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                  }}
                >
                  {item?.name}
                </Typography>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: { xs: "1rem", md: "0" },
            alignSelf: "start",
            maxWidth: { md: "25%", xs: "50%" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#671d63",
              fontSize: "1.2rem",
              fontWeight: 900,
              paddingBottom: { xs: "10px", md: "30px" },
              margin: 0,
            }}
          >
            FOLLOW US
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            <Link
              to="https://www.facebook.com/becomeyourcreator?mibextid=LQQJ4d"
              target="_blank"
            >
              <Box
                sx={{
                  color: "#671d63",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  padding: "0.15rem",
                  border: "1px solid #671d63",
                }}
              >
                <FacebookRoundedIcon
                  sx={{ fontSize: "2rem", cursor: "pointer" }}
                />
              </Box>
            </Link>
            <Link
              to="https://www.instagram.com/becomeyourcreator/"
              target="_blank"
            >
              <Box
                sx={{
                  color: "#671d63",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  padding: "0.15rem",
                  border: "1px solid #671d63",
                }}
              >
                <InstagramIcon sx={{ fontSize: "2rem", cursor: "pointer" }} />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingTop: { xs: "1rem", md: "3rem" },
          textAlign: { xs: "left", md: "center" },
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Typography
          varient="span"
          sx={{
            color: "#671d63",
            lineHeight: "1.5rem",
            fontSize: "1.2rem",
          }}
        >
          Become Your Creator - 2023 All rights reserved -{" "}
          <Link
            style={{
              color: "#671d63",
              lineHeight: "1.5rem",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: 900,
            }}
            to="/privacy-policy"
          >
            Privacy
          </Link>{" "}
          -{" "}
          <Link
            style={{
              color: "#671d63",
              lineHeight: "1.5rem",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: 900,
            }}
            to="/terms-and-conditions"
          >
            Terms
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
