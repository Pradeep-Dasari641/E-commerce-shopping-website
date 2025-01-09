import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import MensWearOptions from "./Options Bar/Mens/MensWear";
import WomenWearOptions from "./Options Bar/Women Items/WomenWear";
import HomeAndFurniture from "./Options Bar/Home&Furniture/H&F";
import Electronics from "./Options Bar/Electronics/Electronics";
import SportsItems from "./Options Bar/Sports/sportsItem";
import NavBar from "./NavBar/navBar";
import FooterBar from "./Footer/footerBar";
import { useNavigate } from "react-router-dom";






function Home() {
  const [shirts, setShirts] = useState([]);
  const [tops, setTops] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [watches, setWatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/mens-shirts")
      .then((response) => {
        setShirts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the shirts:", error);
      });
  }, []);

  const handleCardClick = (shirt) => {
    navigate("/shirt/:id", { state: { shirt } }); // Navigate with shirt data
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/womens-dresses")
      .then((response) => {
        setTops(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the tops:", error);
      });
  }, []);

  const handleWomenCardClick = (top) => {
    navigate("/top/:id", { state: { top } }); // Navigate with shirt data
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/fragrances")
      .then((response) => {
        setFragrances(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the fragrances:", error);
      });
  }, []);

  const handleFragranceCardClick = (fragrance) => {
    navigate("/fragrance/:id", { state: { fragrance } }); // Navigate with shirt data
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/mens-watches")
      .then((response) => {
        setWatches(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the watches:", error);
      });
  }, []);

  const handleWatchCardClick = (watch) => {
    navigate("/watch/:id", { state: { watch } }); // Navigate with shirt data
  };

  return (
    <div className="Home page">
      <NavBar />

      <div className="container">
        <div className="image-with-options">
          <div className="image-container">
            <img
              className="image"
              src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR89kJZ5mQZj51_-C1vac74DyVFQvQUkxwtOvKrv9xKXpqOWAjDrTvRbAGDlcDJ-jNHz2Y1KaqCfwOWuIoLztLjKvRdlkPDsydlyx7HqaNB7X9ZYWsmTxR16g&usqp=CAE"
              alt="Men's Wear"
            />
          </div>
          <b className="heading">Men's Wear</b>
          <MensWearOptions />
        </div>

        <div className="image-with-options">
          <div className="image-container">
            <img
              className="image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGteZflg6OuCKVtIkTrfqTl1DnQuGLRRbVhw&s"
            />
          </div>
          <b className="heading">Women's Wear</b>
          <WomenWearOptions />
        </div>

        <div className="image-with-options">
          <div className="image-container">
            <img
              className="image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLn4-_k6k1dOKZx6mxKsbtLzIcZjW68SJ8Rg&s"
            />
          </div>
          <b className="heading">Home & Furniture</b>
          <HomeAndFurniture />
        </div>

        <div className="image-with-options">
          <div className="image-container">
            <img
              className="image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QK8YL-qCg8EG7VVcKoJM-TxWyWkg_38NJA&s"
            />
          </div>
          <b className="heading">Electronics</b>
          <Electronics />
        </div>

        <div className="image-with-options">
          <div>
            <div className="image-container">
              <img
                className="image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuk77R2PFjMvTiLnhcGg6Qkv0wJck3pDW8dQ&s"
              />
            </div>
            <b className="heading">Sport's Accessories</b>
            <SportsItems />
          </div>
        </div>
      </div>

      <div className="ad">
        <div className="ad-images">
          <img src="https://www.shutterstock.com/image-vector/colorful-discount-sale-podium-special-600nw-2055955985.jpg" alt="Ad Image 1" className="ad-image" />
          <img src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150322012.jpg" alt="Ad Image 2" className="ad-image" />
          <img src="https://s.tmimgcdn.com/scr/800x500/375400/big-sale-on-store-and-online-fifty-percent-off-banner-design_375455-original.jpg" alt="Ad Image 3" className="ad-image" />
        </div>
      </div>

      <h3 className="card-section-heading">Mens Wear</h3>
      <div className="outer-container">
        <div className="card-container">
          <div className="items">
            {shirts.map((shirt) => (
              
              <div className="card" key={shirt.id} onClick={() => handleCardClick(shirt)}>
                <img
                  src={shirt.thumbnail}
                  alt={shirt.title}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{shirt.title}</h3>
                  <span><b className="item-price">Price:</b> {shirt.price}$</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="card-section-heading">Womens Wear</h3>
      <div className="outer-container">
        <div className="card-container">
          <div className="items">
            {tops.map((top) => (
              <div className="card" key={top.id} onClick={() => handleWomenCardClick(top)}>
                <img
                  src={top.thumbnail}
                  alt={top.title}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{top.title}</h3>
                  <span><b className="item-price">Price:</b> {top.price}$</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="card-section-heading"> Fragrances</h3>
      <div className="outer-container">
        <div className="card-container">
          <div className="items">
            {fragrances.map((fragrance) => (
              <div className="card" key={fragrance.id} onClick={() => handleFragranceCardClick(fragrance)}>
                <img
                  src={fragrance.thumbnail}
                  alt={fragrance.title}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{fragrance.title}</h3>
                  <span><b className="item-price">Price:</b> {fragrance.price}$</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="card-section-heading"> Watches</h3>
      <div className="outer-container">
        <div className="card-container">
          <div className="items">
            {watches.map((watch) => (
              <div className="card" key={watch.id} onClick={() => handleWatchCardClick(watch)}>
                <img
                  src={watch.thumbnail}
                  alt={watch.title}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{watch.title}</h3>
                  <span><b className="item-price">Price:</b> {watch.price}$</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterBar />

    </div>
  );
}

export default Home;







