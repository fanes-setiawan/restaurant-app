import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const MenuForm = ({ onAdd }) => {
  const [menu, setMenu] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(menu);
    setMenu({ name: "", description: "", image_url: "", price: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nama Menu"
        name="name"
        value={menu.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Deskripsi"
        name="description"
        value={menu.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="URL Gambar"
        name="image_url"
        value={menu.image_url}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Harga"
        name="price"
        value={menu.price}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Tambah Menu
      </Button>
    </Box>
  );
};

export default MenuForm;
