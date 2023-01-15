import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import signedUser from '../../../_mock/signedUser';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, showError] = useState('');

  const handleClick = () => {
    if (email && password) {
      const url = `http://localhost:4300/validateUser/${email}&${password}`;
      const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
      axios.get(url, config).then(
        (response) => {
          if(response.data.length > 0){
            signedUser.id = response.data[0].id;
            signedUser.name = response.data[0].name;
            signedUser.email = response.data[0].email;
            signedUser.role = response.data[0].role;
            navigate('/dashboard', { replace: true });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      showError(true);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField required name="email" label="Email address" value={email} onChange={handleEmail} />

        <TextField
          required
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <br />
      <div>{error ? <Alert severity="error">Oops! You missed some fileds</Alert> : null}</div>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
