import "./Profile.css";

import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  updateProfile,
  changePassword,
} from "../../services/user.api";

const Profile = () => {

  const { user, fetchProfile } = useAuth();

  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    profileImage: null,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {

    if (user) {

      setProfileData({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        profileImage: null,
      });

    }

  }, [user]);

  // =========================
  // PROFILE INPUT
  // =========================

  const handleProfileChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "profileImage") {

      setProfileData((prev) => ({
        ...prev,
        profileImage: files[0],
      }));

      return;

    }

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // =========================
  // PASSWORD INPUT
  // =========================

  const handlePasswordChange = (e) => {

    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleProfileSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("name", profileData.name);

      formData.append("email", profileData.email);

      formData.append(
        "mobileNumber",
        profileData.mobileNumber
      );

      if (profileData.profileImage) {

        formData.append(
          "profileImage",
          profileData.profileImage
        );

      }

      const data = await updateProfile(formData);

      toast.success(data.message);

      await fetchProfile();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Profile Update Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handlePasswordSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await changePassword(
        passwordData
      );

      toast.success(data.message);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Password Change Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="profilePage">
            {/* Profile Card */}

      <div className="profileCard">

        <div className="profileImage">

          <img
            src={
              user?.profileImage?.url ||
              "https://i.pravatar.cc/200"
            }
            alt="profile"
          />

        </div>

        <div className="profileInfo">

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

          <p>{user?.mobileNumber}</p>

        </div>

      </div>

      {/* Update Profile */}

      <div className="profileSection">

        <h2>Update Profile</h2>

        <form onSubmit={handleProfileSubmit}>

          <div className="formGroup">

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Mobile Number</label>

            <input
              type="text"
              name="mobileNumber"
              value={profileData.mobileNumber}
              onChange={handleProfileChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Profile Image</label>

            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleProfileChange}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Updating..."
              : "Update Profile"}

          </button>

        </form>

      </div>

      {/* Change Password */}

      <div className="passwordSection">

        <h2>Change Password</h2>

        <form onSubmit={handlePasswordSubmit}>

          <div className="formGroup">

            <label>Old Password</label>

            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Updating..."
              : "Change Password"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default Profile;