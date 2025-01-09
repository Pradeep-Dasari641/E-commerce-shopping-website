import React, { useState, useEffect, useRef } from "react";
import "./pages.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import PopupMessage from "./PopupMessage";
import FooterBar from "../Footer/footerBar";
import { useUserContext } from '../Orders.js/UserContext';
import InputField from './InputField'; // Ensure the path is correct
import HomeNavBar from "../NavBar/HomeNav";

const ProfilePage = () => {
  const { userData, setUserData } = useUserContext();
  const [profilePic, setProfilePic] = useState(false);
  const [image, setImage] = useState(null);
  const [editable, setEditable] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const fileInputRef = useRef(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const storedImage = localStorage.getItem(`profileImage_${email}`);
    if (storedImage) {
      setImage(storedImage);
      setProfilePic(true);
    }

    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, [email, setUserData]);

  useEffect(() => {
    if (image) {
      localStorage.setItem(`profileImage_${email}`, image);
    }
  }, [image, email]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setProfilePic(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeletePic = () => {
    setImage(null);
    setProfilePic(false);
    localStorage.removeItem(`profileImage_${email}`);
  };

  const toggleEditable = () => {
    if (editable) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    }
    setEditable((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <HomeNavBar />
      <div className="profile-container">
        <div className="profile-pic">
          {profilePic ? (
            <>
              <img src={image} alt="Profile" />
              <div className="icon-container">
                <FaEdit className="icon" onClick={handleButtonClick} />
                <FaTrash className="icon" onClick={handleDeletePic} />
              </div>
            </>
          ) : userData.username ? (
            <div className="placeholder">
              <p className="pic-place">No Profile Picture</p>
            </div>
          ) : null}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="file-input"
            style={{ display: "none" }}
          />
          <label className="file-label" onClick={handleButtonClick}>
            +
          </label>
        </div>
        <div className="profile-details">
          <h2>Profile Details</h2>
          <InputField
            label="Full Name"
            name="username"
            value={userData.username}
            readOnly={!editable}
            onChange={handleInputChange}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={userData.email}
            readOnly
          />
          <InputField
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            value={userData.mobileNumber}
            readOnly={!editable}
            onChange={handleInputChange}
          />
          <InputField
            label="House Address"
            name="address"
            value={userData.address}
            readOnly={!editable}
            onChange={handleInputChange}
          />
          <div className="edit-button-container">
            <button className="edit-button" onClick={toggleEditable}>
              {editable ? "Save" : "Edit"}
            </button>
            {profilePic && (
              <button className="save-button" onClick={() => setPopupVisible(true)}>
                Save Profile Picture
              </button>
            )}
          </div>
        </div>
      </div>
      {popupVisible && (
        <PopupMessage
          message="Your details have been saved!"
          onClose={() => setPopupVisible(false)}
        />
      )}
      <FooterBar />
    </div>
  );
};

export default ProfilePage;
