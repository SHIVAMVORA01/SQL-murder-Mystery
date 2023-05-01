import './Title.png';
import '../src/App.css';
import title from './Title.png';
import { Link} from "react-router-dom";
function App() {
  return (
  <div className='Homepage'>
     <div className='center-title'>
         <img className='image'  src={title} alt="Title" />
         <Link className='start-button' to={'/game'}> Start game</Link>
     </div>
  </div>
  );
}

export default App;
