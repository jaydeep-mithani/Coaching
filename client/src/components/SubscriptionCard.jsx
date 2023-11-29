import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const SubscriptionCard = ({ title, price, description, locked, unlocked }) => {
  return (
    <Card
      sx={{
        width: "280px",
        minWidth: "auto",
        margin: "auto",
        borderRadius: "12px",
        transition: "transform 0.2s ease-in-out",
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
        "&:hover": {
          transform: "scale(1.02)",
        },
        height: "100%",
        padding: "1rem 1.2rem",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          padding: "0 !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "primary", fontWeight: "bold", mb: 2 }}
        >
          {price}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <List sx={{ mb: 1 }}>
          {unlocked?.map((advantage) => (
            <ListItem
              key={advantage}
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon sx={{ minWidth: "30px", padding: "0" }}>
                <CheckIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary={advantage}
                sx={{ width: "fit-content", flex: "none" }}
              />
            </ListItem>
          ))}
          {locked?.map((feature) => (
            <ListItem
              key={feature}
              sx={{ justifyContent: "center" }}
              disablePadding
            >
              <ListItemIcon sx={{ minWidth: "30px", padding: "0" }}>
                <ClearIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={feature}
                sx={{ width: "fit-content", flex: "none" }}
              />
            </ListItem>
          ))}
        </List>
        <Button
          sx={{
            color: "#671d61",
            border: "1px solid #671d63",
            maxWidth: "fit-content",
            fontSize: { xs: "10px", sm: "15px", md: "18px" },
            margin: "0 auto",
          }}
        >
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
