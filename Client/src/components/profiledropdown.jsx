import { useNavigate } from "react-router-dom";
import profilepage from "../pages/profilepage";

export default function ProfileDropdown() {
    const navigate = useNavigate
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                    <img src="jack-o-lantern.png" alt="profile" />
                </div>
            </div>

            <div className="card dropdown-content bg-base-200 z-1 mt-3 w-60 shadow">
                <div className="card-body">

                    <a onClick={()=>navigate('/profile')} href="/profile" className="border-b border-base-content/20 text-center p-2">Profile</a>
                    <a href="/biosStore" className="border-b border-base-content/20 text-center p-2">BiOS : 1000</a>
                    <a href="/settings" className="border-b border-base-content/20 text-center p-2">Settings</a>
                    <a href="/room" className="border-b border-base-content/20 text-center p-2">Rooms</a>

                    <button className="btn btn-md btn-error mt-2">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}