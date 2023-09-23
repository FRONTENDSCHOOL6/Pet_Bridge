import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Index from './pages/Index';
import Map from './pages/Map';
import MyPage from './pages/MyPage';
import Place from './pages/Place';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import SearchProduct from './pages/SearchProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Index />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="place" element={<Place />} />
      <Route path="productlist" element={<ProductList />} />
      <Route path="mypage" element={<MyPage />} />
      <Route
        path="productlist/detail/:productTitle"
        element={<ProductDetail />}
      />
      <Route path="search" element={<SearchProduct />} />
      <Route path="map" element={<Map />} />
      <Route path="about" element={<About Amount={2132154} />} />
    </Route>
  )
);

export default router;
