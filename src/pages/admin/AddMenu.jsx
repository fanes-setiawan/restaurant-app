import React, { useState } from "react";

const AddMenu = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePost = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:5000/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, price, image_url: imageUrl }),
      });
      const data = await response.json();
      alert(data.msg);
      
      // Reset input fields after successful upload
      if (response.ok) {
        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Tambah Menu Baru</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePost();
        }}
        className="space-y-4"
      >
        <div>
          <input
            type="text"
            placeholder="Nama Produk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <textarea
            placeholder="Deskripsi Produk"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            type="number"
            placeholder="Harga menu"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="URL Gambar"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambahkan Menu
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
