import React, { useState, useEffect } from "react";
import axios from "axios";

const ListCategory = () => {
  // get Kategori
  useEffect(() => {
    getKategori();
  }, []);
  const [kategori, setKategori] = useState([]);
  const getKategori = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/kategori`
    );
    setKategori(response.data);
  };
  return (
    <div>
      <div className="todo">
        <div className="head">
          <h3>Kategori</h3>
          <i className="bx bx-plus"></i>
          <i className="bx bx-filter"></i>
        </div>
        <ul className="todo-list">
          {kategori.map((kategori) => (
            <li className="completed" key={kategori.id}>
              <p>{kategori.kategori}</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListCategory;
