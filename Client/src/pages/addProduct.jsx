import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProductThunk } from '../redux/product/product.think';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [form, setForm] = useState({
    name: '',
    price: '',
    discount: '',
    description: '',
    category: '',
    image: null,
  });
  // Dummy categories for now; replace with API data if needed
  const categories = ['fashion', 'electronics', 'home & kitchen', 'health & beauty'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };
    // Handle form submission
    const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name); // at least 3 characters
  formData.append("price", form.price); // make sure it's a number
  formData.append("discount", form.discount || 0);
  formData.append("description", form.description);
  formData.append("category", form.category); // not empty
  formData.append("image", form.image);

  const response = await dispatch(addProductThunk(formData));
 
  if (response?.payload?.success) {
    console.log(response?.payload?.success)
     navigate("/admin/product");
     }
 
};


  return (
    <Box maxWidth={500} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="#fff">
      <Typography variant="h5" mb={2} align="center">Add Product</Typography>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <TextField
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Discount (%)"
          name="discount"
          type="number"
          value={form.discount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={form.category}
            label="Category"
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {form.image && (
          <Typography variant="body2" mt={1} color="text.secondary">
            Selected: {form.image.name}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;