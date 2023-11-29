import { Box, Link, Typography } from "@mui/material";
import EventTemplate from "../../components/EventTemplate";
import PageBanner from "../../sections/PageBanner";
import { eventsData } from "../../utils/constant";

const Event = () => {
  return (
    <>
      <PageBanner
        heading="Checkout new events"
        imgSrc="./events.jpg"
        description="Join Rita on a transformative journey to align your energies, become conscious aware of your vibrational state, and empower yourself to consciously create by altering your energies."
      />
      {eventsData?.map((event, id) => (
        <Box sx={{ maxWidth: "1500px", margin: "0 auto" }} key={id}>
          <EventTemplate
            id={event?.id}
            image={event?.imageUrl}
            title={event?.title}
            eventUrl={event?.eventUrl}
          >
            <Box sx={{}}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    display: "block",
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.2rem",
                      md: "1rem",
                      lg: "1.4rem",
                    },
                    fontWeight: 100,
                    textAlign: "center",
                    color: "#888",
                    fontStyle: "italic",
                    marginBottom: { xs: "1rem", md: "2rem" },
                  }}
                >
                  {event?.host}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    display: "block",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                      md: "1.1rem",
                      lg: "1.2rem",
                    },
                    fontWeight: 800,
                    textAlign: "center",
                    color: "#5b6897",
                    marginBottom: { xs: "1rem", md: "2rem" },
                  }}
                >
                  {event?.subtitle}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    display: "block",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                      md: "1.1rem",
                      lg: "1.2rem",
                    },
                    fontWeight: 100,
                    textAlign: "center",
                    color: "#364064",
                    margin: "0 auto",
                    marginBottom: { xs: "1rem", md: "2rem" },
                    maxWidth: "500px",
                  }}
                >
                  {event?.shortDescription}
                </Typography>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "block",
                      fontSize: {
                        xs: "1rem",
                        sm: "1.2rem",
                        md: "1.1rem",
                        lg: "1.2rem",
                      },
                      fontWeight: 900,
                      textAlign: "center",
                      color: "#2a3763",
                      transition: "all 250ms linear",
                      "&:hover": {
                        textShadow: "0 0 15px #2a376344",
                      },
                    }}
                  >
                    {event?.dateTime}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </EventTemplate>
        </Box>
      ))}
    </>
  );
};

export default Event;
