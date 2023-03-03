import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import routes from './routes';
const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
