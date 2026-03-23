"use client";
// import React from 'react'
import './index.scss';
import { RouterProvider } from 'react-router';
import { router } from "./routes/app.routes"
import Loader from './components/loader';
function App() {

  return (
    <>
      <div>
        <RouterProvider router={router} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px", height:"screen" }}>
          <Loader />
        </div>
      </div>
    </>
  )
}

export default App
