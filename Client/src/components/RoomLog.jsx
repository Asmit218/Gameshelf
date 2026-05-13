import { Trash2 } from "lucide-react";
import api from "../utils/axios.js";
import { useState, useEffect } from "react";

export default function RoomLog({ data, setMyRoom, setRoom, user }) {

    const [joinCodes, setJoinCodes] = useState({});

    const handleJoin = async (roomid, code) => {
        try {
            const res = await api.post(`/rooms/join/${roomid}`, {
                joinCode: code
            });

            setRoom(prev =>
                prev.map(r => r.roomid === roomid ? res.data.data : r)
            );

        } catch (err) {
            console.log(err.response?.data?.message);
            alert(err.response?.data?.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/rooms/delete/${id}`);
            setMyRoom(prev => prev.filter(r => r._id !== id));
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {data.map((value) => (
                <div key={value._id} className="grid grid-cols-6 text-center items-center rounded-full border border-base-content/30 m-2 bg-base-200 h-18">
                    <div>{value.players.length}/{value.playersCount}</div>
                    <div>{value.gameName}</div>
                    <div>{value.createdby}</div>
                    <div>{new Date(value.createdAt).toLocaleString()}</div>

                    {(!(value.playerId === user.playerId)) ?
                        <div className="flex justify-center items-center col-span-2">
                            <button
                                className="btn btn-secondary text-secondary-content shadow-lg py-6 px-15 rounded-full"
                                onClick={() => document.getElementById(`modal-${value._id}`).showModal()}>Join</button>
                            <dialog id={`modal-${value._id}`} className="modal">
                                <div className="modal-box py-15">
                                    <h3 className="font-bold text-2xl">Enter the Joining Code</h3>
                                    <input
                                        className="px-10 py-5 my-10 rounded-full border border-base-content/50 bg-base-200" type="text" name="joinCode" id="joinCode" placeholder="Enter the Joining Code"
                                        value={joinCodes[value.roomid] || ""}
                                        onChange={(e) =>
                                            setJoinCodes(prev => ({
                                                ...prev,
                                                [value.roomid]: e.target.value
                                            }))} />
                                    <div className="">
                                        <button
                                            className="btn btn-secondary text-secondary-content shadow-lg py-6 px-15 rounded-full"
                                            onClick={() => handleJoin(value.roomid, joinCodes[value.roomid])}
                                            disabled={value.players.length >= value.playersCount}>Join</button>
                                    </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div> :
                        <>
                            <div className="flex justify-center"><Trash2 className=" cursor-pointer" onClick={() => handleDelete(value._id)} /></div>
                            <div>
                                <button
                                    className="btn btn-secondary text-secondary-content shadow-lg py-6 px-15 rounded-full"
                                    onClick={() => document.getElementById(`modal-${value._id}`).showModal()}>Join</button>
                                <dialog id={`modal-${value._id}`} className="modal">
                                    <div className="modal-box py-15">
                                        <h3 className="font-bold text-2xl">Enter the Joining Code</h3>
                                        <input
                                            className="px-10 py-5 my-10 rounded-full border border-base-content/50 bg-base-200" type="text" name="joinCode" id="joinCode" placeholder="Enter the Joining Code"
                                            value={joinCodes[value.roomid] || ""}
                                            onChange={(e) =>
                                                setJoinCodes(prev => ({
                                                    ...prev,
                                                    [value.roomid]: e.target.value
                                                }))} />
                                        <div className="">
                                            <button
                                                className="btn btn-secondary text-secondary-content shadow-lg py-6 px-15 rounded-full"
                                                onClick={() => handleJoin(value.roomid, joinCodes[value.roomid])}
                                                disabled={value.players.length >= value.playersCount}>Join</button>
                                        </div>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                            </div>
                        </>}
                </div>
            ))}
        </>
    )
}