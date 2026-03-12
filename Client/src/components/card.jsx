export default function Card({ photo, title, difficulty, player }) {
    return (
        <div className="carousel-item card border border-base-content/20 w-60 shadow-xl rounded-3xl bg-base-200">
            <div className="w-full aspect-square overflow-hidden flex items-center justify-center rounded-2xl">
                <img className="object-cover" src={photo} alt="Game Image" />
            </div>
            <div className="card-body p-3">
                <h2 className="text-xl font-bold mt-2 text-gray-50">{title}</h2>
                <p className="text-yellow-500">Difficulty: {difficulty}</p>
                <p className="text-gray-500">{player} is playing this game</p>
            </div>
        </div>
    );
}