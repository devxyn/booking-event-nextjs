import React from "react";
import Hello from "@/components/hello";

const Home = () => {
  console.log("What type of a component am I?");

  return (
    <>
      <div className='text-3xl font-bold'>Welcome to next.js</div>
      <Hello />
    </>
  );
};

export default Home;
