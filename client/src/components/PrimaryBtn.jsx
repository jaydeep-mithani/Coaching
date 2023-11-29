import { Button } from "@mui/material";
import React from "react";

export const PrimaryBtn = (props) => {
  return (
    <Button
      disabled={props?.disabled}
      sx={{
        backgroundColor: "#873785",
        display: "flex",
        flexDirection: props.row ? "row" : "column",
        alignItems: "center",
        width: props.fullWidth ? "100%" : { xs: "100%", sm: "max-content" },
        gap: "20px",
        span: { display: "block", fontSize: "16px" },
        color: "#fff",
        borderRadius: "5px",
        padding: { xs: "10px", md: "18px 25px" },
        fontSize: "12px",
        border: "1px solid transparent",
        lineHeight: "16px",
        ":hover": {
          color: "#fff",
          backgroundColor: "#3b0d39",
        },
        "&.Mui-disabled": {
          color: "#fff",
          backgroundColor: "#3b0d39",
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
