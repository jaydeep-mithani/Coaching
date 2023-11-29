import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SellIcon from "@mui/icons-material/Sell";

const SessionCard = ({
  title,
  detail,
  coachName,
  price,
  date,
  time,
  sessionImg,
  btnText,
  onClick,
  sessionLink,
  quantity,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        justifyContent: "space-between",
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        borderRadius: "7px",
        transition: "transform 0.35s ease-in-out",
        "&:hover": {
          transform: "scale(1.002)",
        },
        padding: "10px 20px",
      }}
    >
      {sessionImg && (
        <CardMedia
          component="img"
          height="250"
          image={sessionImg}
          alt={sessionImg}
        />
      )}
      <CardContent
        sx={{
          height: sessionImg ? "calc(100% - 250px)" : "100%",
          marginTop: sessionImg ? "8px" : 0,
          display: "grid",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: { md: "75px" },
          }}
        >
          {title && (
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "15px", sm: "20px", md: "25px" },
                mb: { xs: 1, md: 2 },
                color: "#671d63",
              }}
            >
              {title}
            </Typography>
          )}
          {coachName && (
            <Box
              sx={{
                mb: { xs: 1, md: 2 },
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <PersonOutlineIcon sx={{ color: "#671d63" }} />
              <Typography
                component={"span"}
                sx={{
                  fontSize: { xs: "15px", sm: "20px" },
                  color: "#671d63",
                }}
              >
                {" " + coachName}
              </Typography>
            </Box>
          )}
        </Box>
        {detail && (
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.2,
              fontSize: { xs: "15px", sm: "20px" },
            }}
          >
            {detail}
          </Typography>
        )}

        <Box
          sx={{
            mb: { xs: 1, md: 2 },
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {date && (
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "15px", sm: "15px", md: "18px" },
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <CalendarMonthIcon sx={{ color: "#671d63", width: "25px" }} />
              <Typography
                sx={{ fontSize: { xs: "15px", sm: "15px", md: "18px" } }}
              >
                {date}
              </Typography>
            </Typography>
          )}
          {time && (
            <Typography
              component={"div"}
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <AccessTimeIcon sx={{ color: "#671d63" }} />
              <Typography
                sx={{ fontSize: { xs: "15px", sm: "15px", md: "18px" } }}
              >
                {time}
              </Typography>
            </Typography>
          )}
        </Box>

        {sessionLink && (
          <a
            href={sessionLink}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <Box sx={{ fontSize: "12px", color: "#671d63", lineHeight: 1.85 }}>
              {sessionLink}
            </Box>
          </a>
        )}

        {quantity && (
          <Typography
            sx={{
              backgroundColor: "#671d63",
              maxWidth: "fit-content",
              padding: "2px 12px",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "14px", md: "18px" },
              mb: 1,
            }}
          >
            {Number(quantity) === 1
              ? "Available Session"
              : "Available Sessions "}
            : {quantity}
          </Typography>
        )}

        <Box
          component={"div"}
          sx={{ display: "flex", alignItems: "center", py: { xs: "10px" } }}
        >
          {price && (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                gap: "5px",
              }}
            >
              <SellIcon sx={{ color: "#671d63", width: "25px" }} />
              <Typography
                component={"span"}
                sx={{
                  fontSize: { xs: "15px", sm: "20px", md: "25px" },
                }}
              >
                {"  $" + price}
              </Typography>
            </Box>
          )}

          {btnText && (
            <Button
              variant="outlineds"
              sx={{
                color: "#671d61",
                border: "1px solid #671d63",
                marginLeft: "auto",
                maxWidth: "fit-content",
                fontSize: { xs: "12px", sm: "15px", md: "18px" },
                mb: 2,
              }}
              onClick={onClick}
            >
              {btnText}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
