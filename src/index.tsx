import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from '@/app';

const RootApp = () => {
  return <BrowserRouter>
    <App></App>
  </BrowserRouter>;
};
 
hydrateRoot(document.getElementById("root") as any, <RootApp />);
