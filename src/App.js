import './App.css';
import { deleteAllCookies, setCookie } from './helpers/cookie';

function App() {
  // setCookie("name","Phu Tai",1);
  deleteAllCookies();
  console.log(document.cookie);
  return (
    <>App</>
  );
}

export default App;
