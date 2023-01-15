import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import axios from 'axios';
import { sample } from 'lodash';
// @mui
import { ExportToCsv } from 'export-to-csv';
import { Container, Stack, Typography, Button, TextField, InputAdornment } from '@mui/material';
// components
import { ProductList, AddProduct } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------
let PRODUCTLIST = [];
let ProductReportData = [];

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'Products Report',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

export default function ProductsPage() {
  getAllProducts();
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const handleReportClick = (event) => {
    getProductsForReport();
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | IMS </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {isShown ? 'Add Product' : 'Products'}
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {!isShown && (
              <Button variant="contained" disabled={!PRODUCTLIST.length > 0} onClick={handleReportClick}>
                Generate Report
              </Button>
            )}
            <Button variant="contained" onClick={handleClick}>
              {isShown ? 'Cancel' : 'Add Product'}
            </Button>
          </Stack>
        </Stack>

        {isShown ? <AddProduct /> : <ProductList products={PRODUCTLIST} />}
      </Container>
    </>
  );
}

function getAllProducts() {
  const url = `http://localhost:4300/getAllProducts`;
  const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
  const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
  axios.get(url, config).then(
    (response) => {
      if (response.data.length > 0) {
        PRODUCTLIST = response.data;
        PRODUCTLIST.forEach((prod) => {
          prod.cover = `/assets/images/products/product_${prod.id}.jpg`;
          prod.status = sample(['sale', 'new', '', '']);
          prod.colors =
            (prod.id === 1 && PRODUCT_COLOR.slice(0, 2)) ||
            (prod.id === 2 && PRODUCT_COLOR.slice(1, 3)) ||
            (prod.id === 3 && PRODUCT_COLOR.slice(2, 4)) ||
            (prod.id === 4 && PRODUCT_COLOR.slice(3, 6)) ||
            (prod.id === 23 && PRODUCT_COLOR.slice(4, 6)) ||
            (prod.id === 24 && PRODUCT_COLOR.slice(5, 6)) ||
            PRODUCT_COLOR;
        });
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

function getProductsForReport() {
  const url = `http://localhost:4300/getProductsForReport`;
  const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
  axios.get(url, config).then(
    (response) => {
      if (response.data.length > 0) {
        ProductReportData = response.data;
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(ProductReportData);
      }
    },
    (error) => {
      console.log(error);
    }
  );
}
