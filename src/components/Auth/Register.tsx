import { Box, Button, TextField } from "@mui/material"
import React, { FC } from "react"
import useForm from "../../hooks/useForm"
import auth, { User } from "../../services/odevserver/controllers/auth"

interface RegisterProps {
  onRegister?: (user: User) => void
}
const Register: FC<RegisterProps> = (props) => {
  const form = useForm()
  const handleRegisterClick = () => {
    auth.register(form.values).then(({ data }) => props.onRegister?.(data))
  }
  return (
    <Box>
      <TextField
        onChange={form.handleChange}
        id="password"
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
      <TextField
        onChange={form.handleChange}
        id="password"
        fullWidth
        label="Password confirm"
        type="password"
        name="passwordConfirm"
        variant="outlined"
        sx={{ marginY: 1 }}
      />
      <Button
        fullWidth
        onClick={handleRegisterClick}
        variant="contained"
        sx={{ marginY: 1 }}
      >
        Kayıt Ol
      </Button>
    </Box>
  )
}

export default Register
