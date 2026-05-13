import { useEffect, useState } from "react";
import Footer from "../components/footer"
import FriendLog from "../components/FriendLog"
import Navbar from "../components/Navbar"
import RoomLog from "../components/RoomLog"
import api from "../utils/axios";
import Create from "../components/Room/create";


export default function Room({ textTheme, user }) {

    const [room, setRoom] = useState([]);
    const [myRoom, setMyRoom] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const room = await api.get("/rooms/show");
                setRoom(room.data);

                const myroom = await api.get("/rooms/myroom");
                setMyRoom(myroom.data);
            } catch (error) {
                console.log("Error in Fetching Rooms : ", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="mx-25 my-5">
                <Navbar user={user} textTheme={textTheme} />

                {user ?
                    <div className="flex pt-30">
                        <div className="flex-1 px-5 py-3">
                            <div className="mb-10">
                                <input className="text-xl bg-base-200 text-base-content border border-base-content/30 rounded-full px-4 py-2" placeholder="Search For Friends" type="search" name="search" id="search" />
                            </div>
                            <div>
                                <FriendLog />
                            </div>
                        </div>
                        <div className="flex-4 px-5">
                            <div className="mb-20">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-5xl font-bold py-3">My Rooms</div>
                                    <Create />
                                </div>
                                <div className="grid grid-cols-6 p-3 font-bold text-xl text-center">
                                    <div>Players</div>
                                    <div>Games</div>
                                    <div>Created By</div>
                                    <div>Time</div>
                                    <div className="col-span-2">Actions</div>
                                </div>
                                <div>
                                    {(myRoom.length) ?
                                        <RoomLog data={myRoom} setMyRoom={setMyRoom} user={user} /> :
                                        <p className="text-center my-10 text-error">No Rooms Available</p>}
                                </div>
                            </div>
                            <div className="mb-20">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-5xl font-bold py-3">
                                        Global Rooms
                                    </div>
                                    <input type="text" placeholder="Enter the Room id" name="search" id="search" className="px-5 py-3 rounded-full text-lg border border-base-content bg-base-200" />
                                </div>
                                <div className="grid grid-cols-6 p-3 font-bold text-xl text-center">
                                    <div>Players</div>
                                    <div>Games</div>
                                    <div>Created By</div>
                                    <div>Time</div>
                                    <div className="col-span-2">Actions</div>
                                </div>
                                <div>
                                    {(room.length) ?
                                        <RoomLog data={room} setRoom={setRoom} setMyRoom={setMyRoom} user={user} /> :
                                        <p className="text-center my-10 text-error">No Rooms Available</p>}
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="flex justify-center items-center h-[65vh] text-4xl font-semibold gap-4">Please Login to Continue this Service<a href="/login" className="text-primary">Login</a></div>
                }
            </div>
            <Footer />
        </>
    )
}