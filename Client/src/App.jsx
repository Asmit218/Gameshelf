import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage';
import { useEffect } from "react";

function App() {

  useEffect(() => {
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
          "background": "#001e29",
          "particles": [
            "#fbfcca",
            "#d7f3fe",
            "#ffd0a7"
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
