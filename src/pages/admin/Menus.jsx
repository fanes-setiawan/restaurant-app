import React, { useEffect, useState } from 'react';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: '',
    description: '',
    image_url: '',
    price: '',
  });

  const itemPerPage = 6;
  const totalPages = Math.ceil(menus.length / itemPerPage);
  const paginatedMenus = menus.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(newMenu),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert(data.msg);

      // Fetch menus again to update the list
      setMenus((prevMenus) => [...prevMenus, { id: data.id, ...newMenu }]);
      setShowDialog(false);
      setNewMenu({ name: '', description: '', image_url: '', price: '' });
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found!");
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/menus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setMenus(data.menus);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchData();
  }, []);

  const formatMoney = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Menus</h1>
      <button
        className="btn btn-primary mb-6"
        onClick={() => setShowDialog(true)}
      >
        Add Menu
      </button>

      <ul>
        {menus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {paginatedMenus.map((menu) => (
              <li key={menu.id} className="flex flex-col items-stretch">
                <div className="card bg-base-100 shadow-xl flex flex-col h-full max-w-xs w-full mx-auto">
                  <figure className="h-48 overflow-hidden">
                    <img
                      src={
                        menu.image_url ??
                        'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                      }
                      alt={menu.image_url}
                      className="object-cover w-full h-full"
                    />
                  </figure>
                  <div className="card-body flex flex-col justify-between flex-grow p-4">
                    <h2 className="card-title text-xl font-bold mb-2">{menu.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{menu.description}</p>
                    <div className="card-actions mt-auto">
                      <button className="btn btn-primary w-full">{formatMoney(menu.price)}</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <p>No menus available.</p>
        )}
      </ul>

      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2 mx-2 rounded ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Menu</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={newMenu.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                name="description"
                value={newMenu.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={newMenu.image_url}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={newMenu.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="btn btn-secondary mr-2"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menus;
