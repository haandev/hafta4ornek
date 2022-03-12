import { Box, Button, TextField, Alert } from "@mui/material"
import React, { FC, useState } from "react"
import useForm from "../../hooks/useForm"
import auth, { User } from "../../services/odevserver/controllers/auth"
import { Link } from "react-router-dom"

interface RegisterProps {
  onRegister?: (user: User) => void
}
const Register: FC<RegisterProps> = (props) => {
  const form = useForm()
  const [error, setError] = useState<string>()
  const handleRegisterClick = () => {
    auth
      .register(form.values)
      .then(({ data }) => props.onRegister?.(data))
      .catch((error) => {
        setError(
          error.response.data.issues?.[0]?.message || error.response.data
        )
      })
  }
  return (
    <Box sx={{width:"500px",margin:"auto", backgroundColor:"white"}}>
    {error && (
        <Alert
          onClose={() => setError("")}
          sx={{ marginBottom: 2 }}
          severity="error"
        >
          {error}
        </Alert>
      )}
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
      <Link to="/login">Bir hesabınız zaten var mı?</Link>

    </Box>
  )
}

export default Register
