import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";
import { useContext } from "react";
import api from "../utils/axios";

export default function ProfileDropdown({ user: propUser }) {
    const navigate = useNavigate();
    const { user: authUser } = useContext(AuthContext) || {};
    const user = propUser || authUser;

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("token");
            window.location.reload();
            navigate("/");
        }
    };


    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user ?
                        <img
                            src={user.profilePhoto || "/22.png"}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                        :
                        <img
                            src="/user.png"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    }

                </div>
            </div>

            <div className="card dropdown-content bg-base-200 z-1 mt-3 w-60 shadow">
                <div className="card-body">



                    {user ?
                        <>
                            <Link to="/profile" className="border-b border-base-content/20 text-center p-2">Profile</Link>
                            <Link to="/biosStore" className="border-b border-base-content/20 text-center p-2">BiOS : 1000</Link>
                            <Link to="/settings" className="border-b border-base-content/20 text-center p-2">Settings</Link>
                            <button className="btn btn-md btn-error mt-2" onClick={(e) => handleLogout()}>
                                Logout
                            </button>
                        </>

                        :
                        <button className="btn btn-md btn-success mt-2" onClick={() => navigate("/login")}>
                            Login
                        </button>
                    }

                </div>
            </div>
        </div>
    );
}