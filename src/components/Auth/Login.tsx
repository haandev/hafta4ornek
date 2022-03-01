import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import React, { FC } from "react"
import useForm from "../../hooks/useForm"
import auth, { User } from "../../services/odevserver/controllers/auth"

interface LoginProps {
  onLogin?: (user: User) => void
}
const Login: FC<LoginProps> = (props) => {
  const form = useForm()
  const handleLoginClick = () => {
    auth.login(form.values).then(({data}) => props.onLogin?.(data))
  }
  return (
    <Box>
      <TextField
        id="username"
        onChange={form.handleChange}
        fullWidth
        label="Username"
        name="username"
        variant="outlined"
        sx={{ marginY: 1 }}
      />
      <TextField
        onChange={form.handleChange}
        id="password"
        fullWidth
        label="Password"
        type="password"
        name="password"
        variant="outlined"
        sx={{ marginY: 1 }}
      />
      <Button
        onClick={handleLoginClick}
        fullWidth
        variant="contained"
        sx={{ marginY: 1 }}
      >
        Giriş Yap
      </Button>
    </Box>
  )
}

export default Login
