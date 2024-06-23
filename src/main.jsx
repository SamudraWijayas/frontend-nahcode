import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import axios from "axios";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/main.css";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import 'antd/dist/reset.css'; // Import stylesheet Ant Design

AOS.init();

axios.defaults.withCredentials = true;
// Hapus token dari localStorage saat aplikasi dimulai
// localStorage.removeItem('token');

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
