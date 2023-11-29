import { Box, Button, DialogContent, Typography, Link } from "@mui/material";
import React, { useState } from "react";
import { MainModal } from "./MainModal";

const DisclaimerModelBtn = ({ text }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleReadMoreClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button
        sx={{
          color: "#671d63",
          textDecoration: "none",
          ":hover": { color: "#671d63" },
          borderBottom: "1px solid #671d63",
          borderRadius: 0,
          lineHeight: "10px",
        }}
        onClick={handleReadMoreClick}
      >
        {text}
      </Button>
      <MainModal open={open} handleClose={handleClose} lg={true}>
        <Box sx={{ maxHeight: "75vh", overflowY: "auto", overflowX: "hidden" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#671d63",
              fontWeight: 900,
              borderBottom: "1px solid #aaa",
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Become Your Creator LTD. Disclaimer
          </Typography>
          <DialogContent>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              Coaching services offered by Become Your Creator LTD. are designed
              to provide information and education to clients. The company
              focuses on empowering individuals to take control of their lives,
              set goals, and work towards achieving them. However, it is
              important to understand and acknowledge certain guidelines and
              disclaimers to ensure the safety and well-being of all individuals
              involved.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              Firstly, clients must understand that the coaching services
              provided by Become Your Creator LTD. are for informational and
              educational purposes only. The company does not guarantee specific
              outcomes or results, as success depends on individual effort and
              commitment. Clients are solely responsible for applying the
              coaching techniques and strategies in their lives to achieve their
              desired outcomes.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              It is crucial to note that coaching is not a substitute for
              professional advice, therapy, or medical treatment. Clients are
              encouraged to seek appropriate guidance from qualified
              professionals for specific circumstances such as mental health
              issues, medical conditions, or legal matters. While Become Your
              Creator LTD. strives to provide valuable information and support,
              clients should exercise their own judgment and discretion in
              applying the advice and techniques provided.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              The company also does not warrant the completeness, accuracy, or
              reliability of their coaching services. While every effort is made
              to provide valuable and accurate information, clients should
              understand that they assume full responsibility for their actions,
              decisions, and outcomes resulting from their participation in
              coaching.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              In cases where signs of mental illness are identified, Become Your
              Creator LTD. reserves the right to refuse coaching services. The
              well-being and safety of clients are of utmost importance, and
              appropriate professional assistance should be sought in such
              situations.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              Pregnant women and individuals under 18 are not suitable
              candidates for the coaching services provided by Become Your
              Creator LTD. The company believes in providing tailored support
              and guidance to individuals who are of legal age and in
              appropriate physical and emotional states to benefit from the
              coaching process.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              By participating in coaching with Become Your Creator LTD.,
              clients acknowledge and agree to these terms and conditions. They
              understand the importance of seeking professional advice when
              necessary and take full responsibility for their own actions and
              decisions. The company remains committed to providing personalized
              support, ensuring safety, and striving for the effectiveness of
              each coaching experience.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              These guidelines are in place to ensure the safety and well-being
              of all individuals. We deeply care about providing the most
              appropriate and effective support tailored to each client's unique
              circumstances.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
              }}
            >
              Thank you for your understanding and agreement to these terms. We
              appreciate your commitment to your own well-being and the
              importance of seeking appropriate professional advice when needed.
              If you have any further questions or concerns, please feel free to
              reach out to us via email at
            </Typography>
            <Typography
              sx={{
                overflow: "hidden",
              }}
            >
              <Link
                sx={{
                  fontSize: { md: "18px", xs: "15px" },
                  color: "#671d63",
                  textDecoration: "underline",
                }}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@becomeyourcreator.com"
                target="_blank"
              >
                support@becomeyourcreator.com
              </Link>
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                paddingBottom: "15px",
              }}
            >
              We are here to assist you.
            </Typography>
          </DialogContent>
        </Box>
      </MainModal>
    </>
  );
};

export default DisclaimerModelBtn;
