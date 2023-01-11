import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, Button, TextField, InputAdornment, Alert, InputLabel, Select, MenuItem } from '@mui/material';

EditUser.propTypes = {
  selectedUser: PropTypes.string,
};

export default function EditUser(selectedUser) {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [error, showError] = useState('');

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    if (role) {
      const url = 'http://localhost:4300/updateUser';
      const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
      const data = {
        'name': selectedUser.selectedUser,
        'role': role,
      };
      axios.put(url, data, config).then(
        (response) => {
          console.log(response);
          showError(false);
          navigate('/dashboard/app', { replace: true });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      showError(true);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <InputLabel>Role</InputLabel>
        <Select
          required
          value={role}
          label="Role"
          onChange={handleRole}
        >
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Salesperson">Salesperson</MenuItem>
        </Select>
      </Stack>
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>
      <br />
      <div>{error ? <Alert severity="error">Oops! You missed some fileds</Alert> : null}</div>
    </>
  );
}
