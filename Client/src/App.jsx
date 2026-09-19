import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage';
import Profilepage from './pages/profilepage';
import Roompage from './pages/room';
import Login from './pages/login';
import Signup from './pages/signup';
import Setting from './pages/setting';
import Leaderboardpage from './pages/leaderboardpage';
import Unravel from './pages/games/unravel';
import Handkerchief from './pages/games/Handkerchief';
import { useEffect, useState } from "react";
import api from './utils/axios';
import { AuthContext } from './utils/AuthProvider';
import { useContext } from 'react';

function App() {

  const [textTheme, setTextTheme] = useState("");
  const [loading, setLoading] = useState(true)
  const {user,setUser} = useContext(AuthContext)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check");
        setUser(res.data);

      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  },[]);


  useEffect(() => {

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let light, lighta, lightb, lightc;
      if (media.matches) {
        light = "#1b1816";
        lighta = "#fbfcca";
        lightb = "#d7f3fe";
        lightc = "#ffd0a7";
        setTextTheme("text-white");
      } else {
        light = "#f7f5f3";
        lighta = "#760097";
        lightb = "#626262";
        lightc = "#458228";
        setTextTheme("text-black");
      }


      if (window.FinisherHeader) {
        new window.FinisherHeader({
          "count": 100,
          "size": {
            "min": 2,
            "max": 4,
            "pulse": 0
          },
          "speed": {
            "x": {
              "min": 0.4,
              "max": 0.6
            },
            "y": {
              "min": 0.4,
              "max": 0.6
            }
          },
          "colors": {
            "background": light,
            "particles": [
              lighta,
              lightb,
              lightc
            ]
          },
          "blending": "overlay",
          "opacity": {
            "center": 1,
            "edge": 1
          },
          "skew": 0,
          "shapes": [
            "c"
          ]
        });
      }
    }
    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => {
      media.removeEventListener("change", applyTheme);
    }
  }, []);


  return (
    <>
      <div className="finisher-header -z-10 h-screen inset-0 fixed"></div>
      <div>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/profile" element={<Profilepage/>} />
          <Route path="/room" element={<Roompage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/settings" element={<Setting/>} />
          <Route path="/leaderboard" element={<Leaderboardpage/>} />
          <Route path="/unravel" element={<Unravel/>} />
          <Route path="/handkerchief" element={<Handkerchief/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
