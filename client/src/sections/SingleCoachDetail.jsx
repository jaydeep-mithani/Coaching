import { Box, Button, Typography } from "@mui/material";
import BookSessionBtn from "../components/BookSessionButton";
import { PrimaryBtn } from "../components/PrimaryBtn";
import { useNavigate } from "react-router-dom";

const SingleCoachDetail = ({ name, imgSrc, descriptionArr, id }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "2rem auto 3rem",
        boxShadow: "0 3px 12px 1px #dfdfdf",
        borderRadius: "8px",
        overflow: "hidden",
        padding: "1.5rem",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          float: { xs: "none", md: "right" },
          margin: "1.2rem",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          width: { xs: "auto", md: "50%" },
        }}
      >
        <img
          src={imgSrc}
          alt="coach"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Typography paragraph>{name},</Typography>
      {descriptionArr?.map((para, index) => (
        <Typography
          paragraph
          key={index}
          sx={{ textAlign: { xs: "left", sm: "justify" } }}
        >
          {para}
        </Typography>
      ))}
      <Box sx={{ display: "flex", gap: { xs: "12px", md: "25px" } }}>
        <BookSessionBtn
          defaultText={<>BOOK YOUR FREE ENERGY AND LIFE PATH READING</>}
          freeSessionText={
            <>
              BOOK YOUR FREE ENERGY AND LIFE PATH READING
            </>
          }
          bookText={
            <>
              BOOK YOUR FREE ENERGY AND LIFE PATH READING
            </>
          }
          isPurchaseModel={false}
          coachId={id}
        />
        <Box sx={{ margin: "1rem 0", display: "flex" }}>
          <PrimaryBtn onClick={() => navigate("/packages/" + id)} props>
            Book Your Coaching
          </PrimaryBtn>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleCoachDetail;
