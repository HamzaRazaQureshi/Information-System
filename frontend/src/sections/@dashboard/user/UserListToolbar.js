import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import EditUser from './EditUser';
// component
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectedUsers: PropTypes.array,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, selectedUsers }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = (event) => {
    const url = `http://localhost:4300/deleteUser/${selectedUsers[0]}`;
    const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
    axios.delete(url, config).then(
      (response) => {
        navigate('/dashboard/app', { replace: true });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      <StyledRoot
        sx={{
          ...(numSelected === 1 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected === 1 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        )}

        {numSelected === 1 ? (
          <>
            <Tooltip title="Delete">
              <IconButton onClick={handleClick}>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <Iconify icon="mdi:pencil-outline" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )}
      </StyledRoot>
      <div>{isEdit && <EditUser selectedUser={selectedUsers[0]}/>}</div>
    </>
  );
}
