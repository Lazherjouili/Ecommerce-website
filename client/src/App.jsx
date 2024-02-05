// import {Routes,Route} from 'react-router-dom'
// import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Update from './components/Update'
import Create from './components/Create'
import { Navigate } from 'react-router-dom'
import Admin from './pages/Admin'
import ShowOne from './components/ShowOne'
import Home from './pages/Home'
import Wishlist from './components/Wishlist'

import Login from './components/Login'
import Register from './components/Register'
import Footer from './components/Footer'
import RegisterAdmin from './components/RegisterAdmin'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from'js-cookie';
import AdminUsers from './pages/AdminUsers'
import Card from './components/Products/Card'
import ShowOneAdmin from './components/Products/ShowOneAdmin'
function App() {
  const token1= Cookies.get('userToken');
  const [loggedUser, setLoggedUser] = useState(null); // Initialize loggedUser state
  const token = localStorage.getItem('token')
  useEffect(() => {
    const GetLoggedUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', { withCredentials: true });
        console.log('Server Response:', response);

        const { token, loggedUser } = response.data;
        setLoggedUser(loggedUser);
      } catch (error) {
        console.log('Frontend Request Error:', error);
      }
    };

    if (token) {
      GetLoggedUser();
    }
  }, [token]);
  const [card,setCard]=useState([])
const lengthCard=(card)=>{
console.log('*******************',card)
setCard(card)
}

  return (
    <section className='min-h-screen dark:text-gray-100 dark:bg-slate-900 duration-100' >
      < Navbar loggedUser={loggedUser} card={card} />
      <Routes>
        {token1?<>(<Route path={"/"} element={<Home loggedUser={loggedUser} />} />
        <Route path={"/admin"} element={<Admin />} />
        <Route path={"/product/:id/edit"} element={<Update />} />
        <Route path={"/product/new"} element={<Create />} />
        <Route path={"/product/:id"} element={<ShowOne />} />
        <Route path={"/product/:id/admin"} element={<ShowOneAdmin />} />
        <Route path={"/product/favorite"} element={<Wishlist />} />
        <Route path={"/product/cart"} element={<Card lengthCard={lengthCard}/>} />
        <Route path={'/login'} element={<Login setLoggedUser={setLoggedUser}/>} />
        <Route path={'/register'} element={<Register setLoggedUser={setLoggedUser} />} />


        <Route path={'/goback'} element={<Home  />} />
        <Route path={'/admin/register'} element={<RegisterAdmin setLoggedUser={setLoggedUser} />} />
        <Route path={'/admin/users'} element={<AdminUsers />} />)</>:
        <>(<Route to="/home" element={<Navigate to="/" />}/>
          <Route path={"/"} element={<Home loggedUser={loggedUser} />}/>
          <Route path={'/login'} element={<Login setLoggedUser={setLoggedUser}/>} />
        <Route path={'/register'} element={<Register setLoggedUser={setLoggedUser} />} />
        <Route path={'*'} element={<Navigate to={'/'}/>}/>)</>}
        
      </Routes>
      <Footer />
    </section>
  )
}

export default App
