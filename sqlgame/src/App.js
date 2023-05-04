import './Title.png';
import '../src/App.css';
import title from './Title.png';
import video from './video.mp4';
import { Link } from "react-router-dom";

function App() {
  return (
  <div className='Homepage'>
     <video className='video-background' autoPlay loop>
         <source src={video} type='video/mp4' />
     </video>
     <div className='center-title'>
         <img className='image'  src={title} alt="Title" />
         <div className='button-container'>
             <Link className='start-button' to={'/game'}> Start game</Link>
         </div>
     </div>
  </div>
  );
}

export default App;
