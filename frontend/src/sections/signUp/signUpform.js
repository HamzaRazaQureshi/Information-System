import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, showError] = useState('');

  const handleClick = () => {
    if (email && password && role) {
      navigate('/login', { replace: true });
    } else {
      showError(true);
    }
  };

  const handleRole = (event) => {
    setRole(event.target.value);
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
        <TextField name="email" label="Email address" value={email} onChange={handleEmail} />

        <TextField
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
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={role}
        label="Role"
        onChange={handleRole}
      >
        <MenuItem value="Manager">Manager</MenuItem>
        <MenuItem value="Salesperson">Salesperson</MenuItem>
      </Select>

      <br />
      <div>{error ? <Alert severity="error">Oops! You missed some fileds</Alert> : null}</div>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Create Account
      </LoadingButton>
    </>
  );
}
