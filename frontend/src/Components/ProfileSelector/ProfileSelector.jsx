import React from "react";
import "./ProfileSelector.css";
import boysImages from "./boysImages.json";
import girlsImages from './girlsImages.json';

const ProfileSelector = ({ handleProfileModelClose,handleSetImage }) => {
  const handleCloseBtn = () => {
    handleProfileModelClose();
  };

  const handleClickImage = (link)=>{
    handleSetImage(link);
    handleProfileModelClose();
  }
  return (
    <div className="ProfileSelector">
      <div className="profile-card">
        <div className="profile-header">
          <div className="">Select Profile Image</div>
          <div style={{ cursor: "pointer" }} onClick={handleCloseBtn}>
            Close X
          </div>
        </div>
        <div className="profile-section">
          <div className="profile-section-gender">
            {
                boysImages.map((item,index)=>{
                    return(
                    <div className="profile-pic-div" onClick={()=>handleClickImage(item.link)}>
                    <img className="profile-pic"src={item.link}/>
                </div>
                    );
                })
            }
          </div>
          <div className="profile-section-gender">
            {
                girlsImages.map((item,index)=>{
                    return(
                    <div className="profile-pic-div" onClick={()=>handleClickImage(item.link)}>
                    <img className="profile-pic"src={item.link}/>
                </div>
                    );
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
