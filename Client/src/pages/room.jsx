import Footer from "../components/footer"
import FriendLog from "../components/FriendLog"
import Navbar from "../components/Navbar"
import RoomLog from "../components/RoomLog"

export default function Room({ textTheme,user }) {
    return (
        <>
            <div className="mx-25 my-5">
                <Navbar user={user} textTheme={textTheme} />
                <div className="flex pt-30">
                    <div className="flex-1 px-5 py-3">
                        <div className="mb-10">
                            <input className="text-xl bg-base-200 text-base-content border border-base-content/30 rounded-full px-4 py-2" placeholder="Search For Friends" type="search" name="search" id="search" />
                        </div>
                        <div>
                            <FriendLog />
                            <FriendLog />
                            <FriendLog />
                            <FriendLog />
                            <FriendLog />
                            <FriendLog />
                            <FriendLog />
                        </div>
                    </div>
                    <div className="flex-4 px-5">
                        <div className="mb-20">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-5xl font-bold py-3">My Rooms</div>
                                <input type="button" value="Create" className="btn btn-primary text-primary-content px-10 h-12 rounded-full mr-10 my-3 text-lg" />
                            </div>
                            <div className="grid grid-cols-6 p-3 font-bold text-xl text-center">
                                <div>Players</div>
                                <div>Games</div>
                                <div>Created By</div>
                                <div>Time</div>
                                <div className="col-span-2">Actions</div>
                            </div>
                            <div>
                                <RoomLog />
                                <RoomLog />
                                <RoomLog />
                            </div>
                        </div>
                        <div className="mb-20">
                            <div className="text-5xl font-bold py-3 mb-6">
                                Global Rooms
                            </div>
                            <div className="grid grid-cols-6 p-3 font-bold text-xl text-center">
                                <div>Players</div>
                                <div>Games</div>
                                <div>Created By</div>
                                <div>Time</div>
                                <div className="col-span-2">Actions</div>
                            </div>
                            <div>
                                <RoomLog type={"global"} />
                                <RoomLog type={"global"} />
                                <RoomLog type={"global"} />
                                <RoomLog type={"global"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}