import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage';
import { useEffect } from "react";

function App() {

  useEffect(() => {

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let light, lighta, lightb, lightc;
      if (media.matches) {
        light = "#000000";
        lighta = "#fbfcca";
        lightb = "#d7f3fe";
        lightc = "#ffd0a7";
      } else {
        light = "#ffffff";
        lighta = "#4f4f4e";
        lightb = "#3e494d";
        lightc = "#967e6a";
      }

      if (window.FinisherHeader) {
        new window.FinisherHeader({
          "count": 100,
          "size": {
            "min": 1,
            "max": 3,
            "pulse": 0
          },
          "speed": {
            "x": {
              "min": 0,
              "max": 0.4
            },
            "y": {
              "min": 0,
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
    media.addEventListener("change",applyTheme);
    return () => media.removeEventListener("change",applyTheme);
  }, []);


  return (
    <div className="finisher-header">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App
