import { Box } from "@mui/material";
import ContactForm from "../../sections/ContactForm";

const Contact = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f2effb",
        padding: { xs: "3rem 1rem", md: "5rem 2rem" },
        height: "100%",
      }}
    >
      <ContactForm />
    </Box>
  );
};

export default Contact;
