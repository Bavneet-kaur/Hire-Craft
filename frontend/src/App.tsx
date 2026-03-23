"use client";
// import React from 'react'
import './index.scss';
import { RouterProvider } from 'react-router';
import {router} from "./routes/app.routes"
function App() {

  return (
    <>
    <div>
      <RouterProvider router = {router} />
    </div>
    </>
  )
}

export default App
