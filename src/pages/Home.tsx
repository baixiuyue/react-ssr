// Home.tsx
import React from "react";
import Abc from './components/abc';


const Home = () => {
  // localStorage.setItem('ceshi','123');
  const clickHandel = ()=>{
    alert('hellow react ssr Home')
  }
  return (
    <div>
      <h2 onClick={() => console.log("hello")}>This is Home Page</h2>
      <p>Home is the page ..... more discribe</p>
      <p>-------------------------</p>
      <Abc></Abc>
      <button onClick={clickHandel}>按钮Home</button>
    </div>
  );
};
export default Home;