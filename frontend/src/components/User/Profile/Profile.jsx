import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:1000/api/store/user/information", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://localhost:1000/api/store/user/update-profile-pic", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profileImage: base64Image }),
        });

        const result = await res.json();

        if (res.ok) {
          toast.success("Profile picture updated successfully");
          setUser(result.user);
          navigate("/user-dashboard"); 

        } else {
          toast.error(result.message || "Failed to update profile picture");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while updating image");
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-image-container">
          <img
            src={
              user.profileImage ||
              "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png"
            }
            alt="Profile"
            className="profile-image"
          />
          <label className="upload-label" htmlFor="profile-upload">
            &#9998; Change
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>

        <div className="profile-info">
          <h2 className="profile-username">{user.username}</h2>
          <p className="profile-email">{user.email}</p>
          {/* You can add more user info here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
