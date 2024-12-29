import React, { useEffect, useState } from 'react';
import { getMenus } from '../api/menus';

const MenuList = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus();
      setMenus(data.menus);
    };
    fetchMenus();
  }, []);

  return (
    <div>
      <h2>Menu List</h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
            <p>Price: Rp{menu.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
