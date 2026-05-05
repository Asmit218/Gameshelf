import { useNavigate } from "react-router-dom";
import profilepage from "../pages/profilepage";
import { Link } from "react-router-dom";

export default function ProfileDropdown({ user }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:7000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            window.location.reload();
            navigate("/");
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                    {user ?
                    <img src="22.png" alt="profile" />
                    :
                    <img src="user.png" alt="profile" />
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