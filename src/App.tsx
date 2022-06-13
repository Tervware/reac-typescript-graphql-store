import NavBar from './components/NavBar';
import Products from './components/Products';
import TitleSection from './components/filter';
import './App.scss';
import SideBar from './components/SideBar';


import { useSelector } from "react-redux";


 

function App() {
  const currency = useSelector((state: any) => state.cart.currency);
  return ( 
      <div >
        <SideBar >
        </SideBar>
      <NavBar/>
      <TitleSection/>
      <Products currency={currency}/>
    </div>
  );
}

export default App;
