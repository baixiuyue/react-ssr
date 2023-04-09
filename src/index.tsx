import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from '@/app';

const RootApp = () => {
  return <BrowserRouter>
    <App></App>
  </BrowserRouter>;
};
const rootElement = document.getElementById("root");
const root = createRoot(rootElement as any);

// hydrateRoot(document.getElementById("root") as any, <RootApp />);
console.log('process.env.SSR', process.env.SSR); // client

declare var module;
if (module.hot) {
  root.render(<RootApp />);
  module.hot.accept();
} else {
  hydrateRoot(document.getElementById("root") as any, <RootApp />);
}
