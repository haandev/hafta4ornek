import React, { FC, useState } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import TabList from "@mui/lab/TabList"
import Login from "./Login"
import Register from "./Register"
import { User } from "../../services/odevserver/controllers/auth"

interface AuthProps {
  onLogin?: (user: User) => void
  onRegister?: (user: User) => void
}
const Auth: FC<AuthProps> = (props) => {
  const [value, setValue] = useState("login")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box
      sx={{
        typography: "body1",
        backgroundColor: "white",
        marginX: "auto",
        marginY: 10,
        width: "500px",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </TabList>
        </Box>
        <TabPanel value="login">
          <Login onLogin={props.onLogin} />
        </TabPanel>
        <TabPanel value="register">
          <Register onRegister={props.onRegister} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Auth
