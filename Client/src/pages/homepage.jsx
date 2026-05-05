import Navbar from "../components/Navbar";
import Card from "../components/card";
import Footer from "../components/footer";
import { motion } from "framer-motion";


export default function Homepage({ textTheme ,user}) {
  return (
    <>
      <div className="mx-25 my-5">
        <Navbar  textTheme={textTheme} user={user} />

        <div className="flex flex-col items-center justify-center min-h-[90vh]">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-xl mt-20">Welcome to</h1>
            <span className={`${textTheme} font-black text-9xl`}>GAME</span>
            <span className="text-yellow-500 font-black text-9xl">SHELF</span>
            <p className="text-center text-gray-600 text-lg">
              A platform to challenge your mind through strategic games and
              compete with players around the world. Track your match history,
              earn BIOS, climb the leaderboard, and prove your skills. Begin your
              journey on GameShelf.
            </p>
          </motion.div>
        </div>
        <div className="mt-60 flex flex-col gap-5">
          <p className="text-3xl font-bold">Explore Games</p>
          <div className="carousel w-full space-x-2 p-4">
            <Card
              photo={"zero.jpg"}
              title="Cyberpunk 2077"
              difficulty="Hard"
              player="Asmit"
            />
            <Card
              photo={"download.jpg"}
              title="The Witcher 3"
              difficulty="Medium"
              player="Alex"
            />
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-5">
          <p className="text-3xl font-bold">Upcoming Games</p>
          <div className="carousel w-full space-x-2 p-4">
            <Card
              photo={"zero.jpg"}
              title="Cyberpunk 2077"
              difficulty="Hard"
              player="Asmit"
            />
            <Card
              photo={"download.jpg"}
              title="The Witcher 3"
              difficulty="Medium"
              player="Alex"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}