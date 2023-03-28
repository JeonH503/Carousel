import './App.css';
import Carousel from './carousel/Carousel';
import {useState} from "react";

function App() {
  const [slides] = useState([
      {name:1,image:"/images/(1).webp"},
      {name:2,image:"/images/(2).webp"},
      {name:3,image:"/images/(3).webp"},
      {name:4,image:"/images/(4).webp"},
      {name:5,image:"/images/(5).webp"},
      {name:6,image:"/images/(6).webp"},
      {name:7,image:"/images/(7).webp"},
      {name:8,image:"/images/(8).webp"},
      {name:9,image:"/images/(9).webp"},
      {name:10,image:"/images/(10).webp"},
      {name:11,image:"/images/(11).webp"},
      {name:12,image:"/images/(12).webp"},
  ])
  return (
    <div className="App">
      <div className='wrap'>
          <Carousel>
            {slides.map(slide => <img alt={slide.name} key={slide.name} className="thumnail" src={slide.image}></img>)}
          </Carousel>
      </div>
    </div>
  );
}

export default App;
