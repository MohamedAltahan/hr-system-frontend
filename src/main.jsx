import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './store/index.tsx';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import './i18n';
import i18n from 'i18next';

// 🟢 Set direction and language on the HTML tag
const lang = i18n.language || localStorage.getItem("lang") || "en";
document.documentElement.lang = lang;
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position='top-left' />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
