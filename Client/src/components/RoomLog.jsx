import { Trash2, Play } from "lucide-react";
import api from "../utils/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomLog({ data, setMyRoom, setRoom, user }) {
    const navigate = useNavigate();
    const [joinCodes, setJoinCodes] = useState({});

    const getGameRoute = (gameName, roomid) => {
        const name = (gameName || "").toLowerCase().trim();
        if (name.includes("handkerchief")) {
            return `/handkerchief?roomId=${roomid}`;
        }
        if (name.includes("unravel")) {
            return `/unravel?roomId=${roomid}`;
        }
        return `/unravel?roomId=${roomid}`;
    };

    const handleJoin = async (room, code) => {
        try {
            const res = await api.post(`/rooms/join/${room.roomid}`, {
                joinCode: code
            });

            if (setRoom) {
                setRoom(prev =>
                    prev.map(r => r.roomid === room.roomid ? res.data.data : r)
                );
            }

            const modalEl = document.getElementById(`modal-${room._id}`);
            if (modalEl) modalEl.close();

            navigate(getGameRoute(room.gameName, room.roomid));
        } catch (err) {
            console.log(err.response?.data?.message);
            alert(err.response?.data?.message || "Failed to join room");
        }
    };

    const handleEnterGame = (room) => {
        navigate(getGameRoute(room.gameName, room.roomid));
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/rooms/delete/${id}`);
            if (setMyRoom) {
                setMyRoom(prev => prev.filter(r => r._id !== id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {data.map((value) => (
                <div key={value._id} className="grid grid-cols-6 text-center items-center rounded-full border border-base-content/30 m-2 bg-base-200 h-18">
                    <div>{value.players?.length || 1}/{value.playersCount}</div>
                    <div className="font-bold text-yellow-500">{value.gameName}</div>
                    <div>{value.createdby}</div>
                    <div>{new Date(value.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>

                    {(!(value.playerId === user?.playerId)) ?
                        <div className="flex justify-center items-center col-span-2">
                            <button
                                className="btn btn-secondary text-secondary-content shadow-lg py-3 px-8 rounded-full cursor-pointer"
                                onClick={() => document.getElementById(`modal-${value._id}`).showModal()}>Join</button>
                            <dialog id={`modal-${value._id}`} className="modal">
                                <div className="modal-box py-10">
                                    <h3 className="font-bold text-2xl">Enter the Joining Code</h3>
                                    <p className="text-xs text-base-content/70 mt-1">Room ID: <span className="font-mono font-bold text-yellow-400">{value.roomid}</span></p>
                                    <input
                                        className="px-6 py-4 my-6 rounded-full border border-base-content/50 bg-base-200 text-center font-mono font-bold tracking-widest text-lg"
                                        type="text"
                                        name="joinCode"
                                        placeholder="4-digit code"
                                        maxLength={4}
                                        value={joinCodes[value.roomid] || ""}
                                        onChange={(e) =>
                                            setJoinCodes(prev => ({
                                                ...prev,
                                                [value.roomid]: e.target.value
                                            }))} />
                                    <div>
                                        <button
                                            className="btn btn-secondary text-secondary-content shadow-lg py-3 px-10 rounded-full font-bold cursor-pointer"
                                            onClick={() => handleJoin(value, joinCodes[value.roomid])}
                                            disabled={value.players?.length >= value.playersCount && !value.players?.includes(user?.playerId)}>
                                            Enter Game
                                        </button>
                                    </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div> :
                        <>
                            <div className="flex justify-center">
                                <Trash2 className="cursor-pointer text-error hover:scale-110 transition-transform" onClick={() => handleDelete(value._id)} />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="btn btn-primary text-primary-content shadow-lg py-3 px-8 rounded-full flex items-center gap-1.5 font-bold cursor-pointer"
                                    onClick={() => handleEnterGame(value)}
                                >
                                    <Play className="w-4 h-4" /> Play
                                </button>
                            </div>
                        </>}
                </div>
            ))}
        </>
    )
}