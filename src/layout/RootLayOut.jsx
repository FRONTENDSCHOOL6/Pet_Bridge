import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import Nav from "./Nav";

function RootLayout() {
  return (
    <>
      <Header/>
      <Nav />
        <Outlet />
      <Footer/>
    </>
  )
}

export default RootLayout