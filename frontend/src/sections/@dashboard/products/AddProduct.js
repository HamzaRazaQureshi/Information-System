import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, Button, TextField, InputAdornment, Alert } from '@mui/material';

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [error, showError] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    if (name) {
      const url = 'http://localhost:4300/addProduct';
      const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
      const data = {
        'name': name,
        'description': description,
        'price': price,
      };
      axios.post(url, data, config).then(
        (response) => {
          console.log(response);
          showError(false);
          navigate('/dashboard/app', { replace: true })         
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
        <TextField required name="name" label="Product Name" value={name} onChange={handleName} />
        <TextField name="description" label="Product Description" value={description} onChange={handleDescription} />
        <TextField
          required
          label="Product Price"
          name="price"
          type="number"
          value={price}
          onChange={handlePrice}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
          }}
        />
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
