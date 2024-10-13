import React, { useState, useEffect, useRef } from 'react';

const images = [
  "https://media.discordapp.net/attachments/1293755238246907906/1295052041651093535/Screenshot_2024-10-13_at_10.53.38_AM.png?ex=670d3eb3&is=670bed33&hm=84b609421a3d58dab819364f79b98d1d2adac2797360626ff7ff0a60b761d2fd&=&width=1050&height=598",
    "https://media.discordapp.net/attachments/1293755238246907906/1295067370452156498/Screenshot_2024-10-13_at_11.53.01_AM.png?ex=670d4cfa&is=670bfb7a&hm=3eb63bded528ca650e5041ccaab00e5b138a61ed6d98b1cd924f0865012d7dd5&=&format=webp&quality=lossless&width=1924&height=1080",
  "https://media.discordapp.net/attachments/1293755238246907906/1295051132678307992/Screenshot_2024-10-13_at_10.45.21_AM.png?ex=670d3dda&is=670bec5a&hm=de1b99c22ac94941affb4c29425cec31748d2fd612f07270cf94749c5133ee63&=&width=1050&height=596"
];
const delay = 2500;

function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow w-full overflow-hidden">
      <div
        className="slideshowSlider flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="slide flex-shrink-0 w-full" key={idx}>
            <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      <div className="slideshowDots flex justify-center mt-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot w-3 h-3 mx-1 rounded-full bg-gray-400 cursor-pointer ${index === idx ? 'bg-[#5fbf00]' : ''}`}
            onClick={() => setIndex(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
