import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aheader from "./LoginForm";  
import Cookies from 'js-cookie';
import Home from "./Home";
import MensWearOptions from "./Options Bar/Mens/MensWear"
import MensShirts from "./Options Bar/Mens/MensShirts";
import ShirtDetails from "./Options Bar/Mens/ShirtDetails"; 
import WomenWearOptions from "./Options Bar/Women Items/WomenWear";
import WomensDresses from "./Options Bar/Women Items/women-dresses";
import DressDetails from "./Options Bar/Women Items/dressDetails";
import WomensJewellery from "./Options Bar/Women Items/jewellery";
import JewelleryDetails from "./Options Bar/Women Items/JewelleryDetails";
import WomensWatches from "./Options Bar/Women Items/watches";
import WatchDetails from "./Options Bar/Women Items/watchDetails";
import BeautyProducts from "./Options Bar/Women Items/beauty";
import BeautyDetails from "./Options Bar/Women Items/beautyDetails";
import Fragrances from "./Options Bar/Women Items/Fragrances";
import FragranceDetails from "./Options Bar/Women Items/frangranceDetails";
import Skincare from "./Options Bar/Women Items/skinCare";
import SkincareDetails from "./Options Bar/Women Items/skinCareDetails";
import Tops from "./Options Bar/Women Items/tops";
import TopDetails from "./Options Bar/Women Items/topsDetails";
import WomensBags from "./Options Bar/Women Items/bags";
import BagDetails from "./Options Bar/Women Items/bagsDetails";
import WomensShoes from "./Options Bar/Women Items/shoes";
import ShoeDetails from "./Options Bar/Women Items/shoeDetails";
import FurnitureList from "./Options Bar/Home&Furniture/furniture";
import FurnitureDetails from "./Options Bar/Home&Furniture/furnitureDetails";
import HomeDecoration from "./Options Bar/Home&Furniture/decoration";
import DecorationDetails from "./Options Bar/Home&Furniture/decorationDetails";
import KitchenAccessories from "./Options Bar/Home&Furniture/Kaccessories";
import AccessoryDetails from "./Options Bar/Home&Furniture/KaccessDetails";
import Laptops from "./Options Bar/Electronics/laptops";
import LaptopDetails from "./Options Bar/Electronics/laptopDetails";
import MobileAccessories from "./Options Bar/Electronics/mobileAcces";
import MobileAccessoryDetails from "./Options Bar/Electronics/mobileAccesDetails";
import Smartphones from "./Options Bar/Electronics/smartPhone";
import SmartphoneDetails from "./Options Bar/Electronics/smartPhoneDetails";
import Tablets from "./Options Bar/Electronics/tablet";
import TabletDetails from "./Options Bar/Electronics/tabletDetails";
import SportsAccessories from "./Options Bar/Sports/sports";
import SportsDetails from "./Options Bar/Sports/sportsDetails";
import MensShoes from "./Options Bar/Mens/mensShoes";
import MenShoeDetails from "./Options Bar/Mens/mensShoeDetails";
import MensWatches from "./Options Bar/Mens/mensWatches";
import MenWatchDetails from "./Options Bar/Mens/mensWatchDetails";
import Sunglasses from "./Options Bar/Mens/menSunglasses";
import SunglassDetails from "./Options Bar/Mens/sunGlassesDetails";
import Profile from "./Profile/profile";
import { CartProvider } from "./CartItems/CartContext"; 
import Cart from "./CartItems/Cart";
import FooterBar from "./Footer/footerBar";
import MyOrder from "./Orders.js/myOrder";
import { UserProvider } from './Orders.js/UserContext';
import NavBar from "./NavBar/navBar";
import About from "./Footer/About";
import OrderHistory from "./Orders.js/History";
import ProfilePage from "./Profile/profile";


// PrivateRoute Component (for protecting certain routes)
function PrivateRoute({element}) {
  const verified = Cookies.get('Verified');
  if(verified === 'true') {
    return element;
  } else {
    console.log("unauthorized");
  }
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <MensWearOptions />
          <WomenWearOptions />
          <Routes>
            <Route path="/" element={<Aheader />} />
            <Route path="/" element={<NavBar />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mens-shirts" element={<MensShirts />} />
            <Route path="/shirt/:id" element={<ShirtDetails />} />
            <Route path="/women-dresses" element={<WomensDresses />} />
            <Route path="/dress/:id" element={<DressDetails />} />
            <Route path="/jewellery" element={<WomensJewellery />} />
            <Route path="/jewellery/:id" element={<JewelleryDetails />} />
            <Route path="/watches" element={<WomensWatches />} />
            <Route path="/watch/:id" element={<WatchDetails />} />
            <Route path="/beauty" element={<BeautyProducts />} />
            <Route path="/beauty/:id" element={<BeautyDetails />} />
            <Route path="/Fragrances" element={<Fragrances />} />
            <Route path="/fragrance/:id" element={<FragranceDetails />} />
            <Route path="/skinCare" element={<Skincare />} />
            <Route path="/skincare/:id" element={<SkincareDetails />} />
            <Route path="/tops" element={<Tops />} />
            <Route path="/top/:id" element={<TopDetails />} />
            <Route path="/bags" element={<WomensBags />} />
            <Route path="/bag/:id" element={<BagDetails />} />
            <Route path="/shoes" element={<WomensShoes />} />
            <Route path="/shoe/:id" element={<ShoeDetails />} />
            <Route path="/furniture" element={<FurnitureList />} />
            <Route path="/furniture/:id" element={<FurnitureDetails />} />
            <Route path="/decoration" element={<HomeDecoration />} />
            <Route path="/decoration/:id" element={<DecorationDetails />} />
            <Route path="/Kaccessories" element={<KitchenAccessories />} />
            <Route path="/accessory/:id" element={<AccessoryDetails />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/laptop/:id" element={<LaptopDetails />} />
            <Route path="/mobileAcces" element={<MobileAccessories />} />
            <Route path="/accessory/:id" element={<MobileAccessoryDetails />} />
            <Route path="/smartPhone" element={<Smartphones />} />
            <Route path="/smartphone/:id" element={<SmartphoneDetails />} />
            <Route path="/tablet" element={<Tablets />} />
            <Route path="/tablet/:id" element={<TabletDetails />} />
            <Route path="/sports" element={<SportsAccessories />} />
            <Route path="/sportsDetails/:id" element={<SportsDetails />} />
            <Route path="/mensShoes" element={<MensShoes />} />
            <Route path="/shoe/:id" element={<MenShoeDetails />} />
            <Route path="/mensWatches" element={<MensWatches />} />
            <Route path="/watch/:id" element={<MenWatchDetails />} />
            <Route path="/menSunglasses" element={<Sunglasses />} />
            <Route path="/sunglass/:id" element={<SunglassDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/myOrder" element={<MyOrder />} />
            <Route path="/History" element={<OrderHistory />} />
            <Route path="/footerBar" element={<FooterBar />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
