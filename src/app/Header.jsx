"use client";
import Login from "./Login";
import Logout from "./Logout";
import Link from "next/link";
import { useState, Fragment, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth, logout } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header({ setUserInfo, userInfo }) {
  const [user, loading, error] = useAuthState(auth);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const icon = {
    0: (
      <Link href="/">
        <SearchIcon />
      </Link>
    ),
    1: (
      <Link href="/lists">
        <ListIcon />
      </Link>
    ),
    2: (
      <LogoutIcon
        onClick={() => {
          setIsOpen(false);
          setUserInfo(null);
          logout();
        }}
      />
    ),
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Fragment key={"left"}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                <List>
                  {["Search", "Lists", "Logout"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{icon[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </Fragment>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movie Matcher
            </Typography>
            {!userInfo || !user ? (
              <div>
                <Login setUserInfo={setUserInfo} />
              </div>
            ) : (
              <div className="logged-in-header">
                Welcome, {userInfo.displayName}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
