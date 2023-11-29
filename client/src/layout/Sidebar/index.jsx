import React from "react";
import { sidebarItems } from "../../utils/constant";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {sidebarItems?.map((item) => (
          <ListItem
            key={item?.path}
            sx={{
              "&:hover": {
                backgroundColor: "#f0f0f0", // Add your desired hover background color
                transition: "background-color 0.3s", // Add a smooth transition effect
              },
            }}
          >
            <ListItemText primary={item?.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
