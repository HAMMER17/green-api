import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import { ChatContextProvider } from './context/ChatContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>

      <Provider store={store}>
        <App />
      </Provider>

    </AuthContextProvider>
  </BrowserRouter>
);

