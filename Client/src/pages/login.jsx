import { useState } from "react";
import AuthImagePattern from "../components/pattern";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);


  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      }
      );

      const check = await api.get("/auth/check");

    setUser(check.data);
    navigate("/");

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-row h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-base-100/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold">Login Page</h1>
          <div className="flex flex-col items-center justify-center mt-8">
            <form className="w-full max-w-sm" action={'/'} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
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
                <p className="text-sm mt-4">
                  Forget password?{" "}
                  <a href="#" className="text-primary hover:text-primary/50">
                    Click here
                  </a>
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="w-full btn btn-primary btn-lg rounded-full mt-2"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm mt-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary hover:text-primary/50">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Enter your credentials to access your account and continue your journey with us."
      />
    </div>
  );
}
