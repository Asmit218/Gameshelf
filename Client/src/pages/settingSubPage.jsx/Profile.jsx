import { useRef, useState, useContext, useEffect } from 'react';
import { Camera, Upload, User } from 'lucide-react';
import { AuthContext } from '../../utils/AuthProvider';
import api from '../../utils/axios';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext) || {};

  const [username, setUsername] = useState(user?.userName || '');
  const [avatarSrc, setAvatarSrc] = useState(user?.profilePhoto || '/22.png');
  const [bannerSrc, setBannerSrc] = useState(user?.bgPhoto || '/banner.jpg');
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      if (user.userName) setUsername(user.userName);
      if (user.profilePhoto) setAvatarSrc(user.profilePhoto);
      if (user.bgPhoto) setBannerSrc(user.bgPhoto);
    }
  }, [user]);

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerSrc(URL.createObjectURL(file));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setUsername(user?.userName || '');
    setAvatarSrc(user?.profilePhoto || '/22.png');
    setBannerSrc(user?.bgPhoto || '/banner.jpg');
    setAvatarFile(null);
    setBannerFile(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (username) formData.append("userName", username);
      if (avatarFile) formData.append("profilePhoto", avatarFile);
      if (bannerFile) formData.append("bgPhoto", bannerFile);

      const res = await api.put("/profile/update", formData);
      if (res.data?.user && setUser) {
        setUser(res.data.user);
      }
      alert(res.data?.message || "Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-8 flex flex-col items-center justify-start bg-base-100">
      
      {/* Hidden File Inputs */}
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBannerChange}
      />
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl bg-base-200 border border-base-content/10 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Background / Cover Image Section */}
        <div
          onClick={handleBannerClick}
          onMouseEnter={() => setIsBannerHovered(true)}
          onMouseLeave={() => setIsBannerHovered(false)}
          className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden group cursor-pointer bg-base-300"
        >
          <img
            src={bannerSrc}
            alt="Background Banner"
            className={`w-full h-full object-cover transition-all duration-300 ${
              isBannerHovered ? 'brightness-75 scale-[1.02]' : 'brightness-90'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-transparent to-black/30 pointer-events-none" />

          {/* Change Background Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBannerClick();
            }}
            className="absolute top-4 right-4 btn btn-sm bg-black/60 hover:bg-black/80 text-white border-white/20 backdrop-blur-md rounded-xl font-medium gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-yellow-400" />
            <span>Change Background</span>
          </button>

          {/* Center Hover Overlay */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none transition-opacity duration-200 ${
              isBannerHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl mb-2">
              <Upload className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-sm font-bold tracking-wide drop-shadow">
              Click to upload background image
            </span>
          </div>
        </div>

        {/* Profile Picture & Username Section */}
        <div className="px-6 pb-12 flex flex-col items-center -mt-16 sm:-mt-22 relative z-10">
          
          {/* Profile Picture (Avatar) */}
          <div
            onClick={handleAvatarClick}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
            className="relative group cursor-pointer"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-4 ring-base-100 bg-base-300 shadow-2xl overflow-hidden relative transition-transform duration-300 group-hover:scale-105">
              <img
                src={avatarSrc}
                alt="Profile Avatar"
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isAvatarHovered ? 'brightness-60 scale-105' : ''
                }`}
              />

              {/* Avatar Hover Overlay */}
              <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-opacity duration-200 ${
                  isAvatarHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Camera className="w-8 h-8 text-yellow-400 mb-1" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Change Picture
                </span>
              </div>
            </div>

            {/* Quick Camera Badge on Avatar */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAvatarClick();
              }}
              title="Change profile picture"
              className="absolute bottom-1 right-1 p-2.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/30 transition-transform active:scale-90 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Username Input & Save Action */}
          <div className="w-full max-w-md mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 flex items-center justify-between px-1">
                <span>Username</span>
                <span className="text-xs text-base-content/50 font-normal">Public display name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="userName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="input input-bordered w-full pl-10 pr-4 bg-base-100 font-semibold text-base-content focus:border-yellow-500 focus:outline-none rounded-2xl h-12 text-base"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="btn btn-ghost rounded-2xl px-6 font-semibold text-base-content/70 hover:bg-base-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="btn bg-yellow-500 hover:bg-yellow-400 text-black border-none font-bold rounded-2xl px-8 shadow-lg shadow-yellow-500/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
