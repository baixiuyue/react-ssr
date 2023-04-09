// About.tsx
import React from "react";


const Home: React.FC = () => {
  const clickHandel = ()=>{
    alert('hellow react ssr About')
  }
  return (
    <div>
      <h2 onClick={() => console.log("hello")}>This is About Page</h2>
      <p>-------------------------</p>
      <button onClick={clickHandel}>按钮About</button>
    </div>
  );
};
export default Home;