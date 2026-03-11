import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Homepage() {
  return (
    <div className="mx-20 my-5">
      <Navbar />

      <div className="flex justify-center items-center flex-col">
        <motion.div className="max-w-3xl mt-80 text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-lg text-gray-300 mt-20">
            Welcome to
          </h1>
          <span className="text-white font-black text-9xl">GAME</span>
          <span className="text-yellow-500 font-black text-9xl">SHELF</span>
          <p className="text-center text-gray-600 text-lg">
            A platform to track your gaming achievements and compete with friends on the leaderboard. Explore your gaming history, earn badges, and share your progress with the community. Start your gaming journey today!
          </p>
        </motion.div>

      </div>
        <div className="mt-50 flex flex-col gap-10">
          <p className="text-3xl font-bold">Explore</p>
          <div className="card border border-base-content/20 w-80 shadow-xl rounded-3xl">
            <div className="card-image">
              <img className="w-full h-full object-cover rounded-3xl p-4" src="picture.jpg" alt="Game Image" />
            </div>
            <div className="card-body">
              <h2 className="text-xl font-bold mt-2 text-gray-50">Cyberpunk 2077</h2>
              <p className="text-yellow-500">Difficulty: Hard</p>
              <p className="text-gray-500">Asmit is playing this game</p>
            </div>
          </div>
        </div>
    </div>
  )
}