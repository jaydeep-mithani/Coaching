import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CoachCarouselCard = ({ id, title, subtitle, imgSrc }) => {
  return (
    <Box
      sx={{
        width: "90%",
        mx: "auto",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        height: "100%",
      }}
    >
      <Link to={`/ourCoachesDetail/${id}`} state={{ name: id }}>
        <img
          src={imgSrc}
          style={{ objectFit: "cover", width: "100%", height: "350px" }}
        />
        <Box
          sx={{
            padding: "0 0 35px 21px",
            position: "absolute",
            zIndex: 111,
            bottom: 0,
            left: 0,
            width: "100%",
            background:
              "linear-gradient(0deg, rgba(234,214,185,1) 18%, rgba(234,214,185,0) 100%)",
            transition: "background 2s",
            "&:hover": {
              background:
                "linear-gradient(0deg, rgba(103,29,99,0.9) 38%, rgba(103,29,99,0) 100%)",
            },
          }}
        >
          <Typography
            component={"h3"}
            sx={{
              fontWeight: 600,
              color: "#fff",
              fontSize: "22px",
              paddingTop: "100px",
            }}
          >
            {title}
          </Typography>
          <Typography
            component={"h6"}
            sx={{ fontWeight: 400, color: "#fff", fontSize: "16px" }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default CoachCarouselCard;
