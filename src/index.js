import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store, {persister} from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister} loading={null}>
        <Router>
          <Routes>
            <Route path="*" element={<App/>}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
