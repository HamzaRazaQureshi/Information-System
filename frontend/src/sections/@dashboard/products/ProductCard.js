import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Box, Card, Link, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import EditProduct from './EditProduct';
import Iconify from '../../../components/iconify';
import signedUser from '../../../_mock/signedUser';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const navigate = useNavigate();
  const { name, cover, price, colors, status } = product;
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    if(signedUser.role === 'Manager'){
      setIsShown(true); 
    }
  };

  const handleClose = () => {
    setIsShown(false);
  };

  const handleDelete = () => {
    const url = `http://localhost:4300/deleteProduct/${product.id}`;
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

  return (
    <>
      {!isShown && (
        <Card>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {status && (
              <Label
                variant="filled"
                color={(status === 'sale' && 'error') || 'info'}
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  textTransform: 'uppercase',
                }}
              >
                {status}
              </Label>
            )}
            <StyledProductImg alt={name} src={cover} />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color="inherit" underline="hover">
              <Typography variant="subtitle2" noWrap onClick={handleClick}>
                {name}
              </Typography>
            </Link>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <ColorPreview colors={colors} />
              <Typography variant="subtitle1">Rs {price}</Typography>
            </Stack>
          </Stack>
        </Card>
      )}
      {isShown && (
        <div>
          <IconButton variant="contained" onClick={handleClose}>
            <Iconify icon="mdi:close-thick" />
          </IconButton>
          <IconButton variant="contained" onClick={handleDelete} sx={{ float: 'right' }}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
          <EditProduct product={product} />
        </div>
      )}
    </>
  );
}
