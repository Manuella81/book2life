import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './slices/store'
import {FavoriteProvider} from "./context/favoriteContext";
import { ConversationProvider } from "./context/conversationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <FavoriteProvider>
        <ConversationProvider> {/* Remplacez FavoriteProvider par ConversationProvider */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConversationProvider>
      </FavoriteProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
