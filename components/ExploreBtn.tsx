"use client";

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button type='button' id='explore-btn' className='mt-8 mx-auto' onClick={() => console.log("pressed")}>
      <a href='#events'>
        Explore Events
        <Image src='/icons/arrow-down.svg' alt='arrow-down' width={24} height={24} />
      </a>
    </button>
  );
};

export default ExploreBtn;
