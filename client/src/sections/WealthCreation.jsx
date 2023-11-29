import { Box, Link, Typography } from "@mui/material";
import { wealthCardItems } from "../utils/constant";
import PageBanner from "./PageBanner";

const WealthCreationSection = () => {
  const handleEmailClick = () => {
    const emailAddress = "example@email.com"; // Replace with your desired email address
    window.location.href = `mailto:${emailAddress}`;
  };
  return (
    <>
      <PageBanner imgSrc="./wealthCreation.jpg" heading="Wealth Creation" />
      <Box sx={{ margin: "4rem 2rem" }}>
        <Box
          sx={{
            display: "flex",
            mx: "auto",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 0 40px",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Typography
            varient="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "3.5rem",
              },
              color: "#671d63",
              fontFamily: "'montserrat',sans-serif",
              maxWidth: "592px",
              position: "relative",
              paddingRight: { lg: "20px" },
              marginBottom: { xs: "40px", lg: 0 },
              marginRight: { lg: "45px" },
              lineHeight: { xs: "35px", sm: "45px", md: "50px", lg: "60px" },
              "&:after": {
                content: { lg: "''" },
                position: "absolute",
                right: 0,
                top: 0,
                width: "4px",
                height: "100%",
                backgroundColor: "#671d63",
              },
            }}
          >
            Discover the Complete 3 Steps to Abundance Activation
          </Typography>
          <Typography
            varient="p"
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              maxWidth: "605px",
              color: "#666",
              fontWeight: 500,
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            Activation, an extraordinary online course designed to guide you on
            your journey towards manifesting wealth and prosperity.
          </Typography>
        </Box>
        <Box>
          {wealthCardItems?.map((cardItem, index) => (
            <Box key={index} sx={{ margin: "2.5rem 0" }}>
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.4rem", md: "1.8rem" } }}
              >
                {cardItem?.title}
              </Typography>
              <Typography
                paragraph
                sx={{
                  color: "#222",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  textAlign: { xs: "left", sm: "justify" },
                }}
              >
                {cardItem?.description}
              </Typography>
            </Box>
          ))}
          <Typography
            paragraph
            sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
          >
            To further enhance your manifestation journey, this package also
            includes the invaluable
            <strong> "Attracting Abundance Guided Meditation."</strong>
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
          >
            For any inquiries or assistance, don't hesitate to reach out to our
            dedicated team at
            <strong>
              <Link
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  color: "#671d63",
                  textDecoration: "none",
                  pl: "5px",
                }}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@becomeyourcreator.com"
                target="_blank"
              >
                support@becomeyourcreator.com
              </Link>
            </strong>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default WealthCreationSection;
