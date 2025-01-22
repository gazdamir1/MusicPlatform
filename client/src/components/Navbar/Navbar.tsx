/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"
import * as React from "react"
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { useRouter } from "next/navigation"
import styles from "./Navbar.module.scss"

const menuItems = [
  { text: "Главная", href: "/" },
  { text: "Список треков", href: "/tracks" },
  { text: "Список альбомов", href: "/albums" },
]

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Header */}
        <div className={styles.header}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              {open ? (
                <img
                  src="http://localhost:3000/image/LeftArrow.svg"
                  alt="menuButton"
                  className={styles.iconTransition}
                  onClick={handleDrawerClose}
                />
              ) : (
                <img
                  src="http://localhost:3000/image/Menu.svg"
                  alt="menuButton"
                  className={styles.iconTransition}
                  onClick={handleDrawerOpen}
                />
              )}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className={styles.Title}
            >
              MusicHome
            </Typography>
          </Toolbar>
        </div>

        <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
          <List className={styles.Navigation}>
            {menuItems.map(({ text, href }, index) => (
              <ListItem key={href} onClick={() => router.push(href)}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon sx={{ color: "white" }} />
                    ) : (
                      <MailIcon sx={{ color: "white" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Box>
    </div>
  )
}
