import { useState } from "react";
import AuthImagePattern from "../components/pattern";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

export default function Signup({ setUser }) {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup",
        {
          userName,
          email,
          password,
        }
      );


      const check = await api.get("auth/check");
      setUser(check.data);
      console.log("Signup success")
      navigate("/")

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div className="flex flex-row h-screen justify-center items-center">
      <AuthImagePattern
        title="Welcome!"
        subtitle="Join our community and start your journey with us."
      />
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-base-100/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold">Sign Up Page</h1>
          <div className="flex flex-col items-center justify-center mt-8">
            <form className="w-full max-w-sm" action={'/'} onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
              <div className="mb-4">
                <label
                  className="block text-base-content text-md font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="border border-base-content/20 rounded-full py-3 px-4 w-full focus:outline-none"
                  id="userName"
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-base-content text-md font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border border-base-content/20 rounded-full py-3 px-4 w-full focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-base-content text-md font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-base-content/20 rounded-full py-3 px-4 w-full focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="w-full btn btn-primary btn-lg rounded-full mt-2"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:text-primary/50">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
