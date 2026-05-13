import React, { useState } from "react";
import axios from "axios";
import api from "../../utils/axios";

const Create = () => {
  const [gameName, setGameName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [playersCount, setPlayersCount] = useState("");

  const handleCreate = async () => {
    try {
      const response = await api.post(
        "/rooms/create",
        {
          gameName,
          joinCode,
          playersCount,
        }
      );
      window.location.reload();
      alert("Room created successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating room");
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary text-primary-content px-10 h-12 rounded-full text-lg"
        onClick={() =>
          document.getElementById("my_modal_3").showModal()
        }
      >
        Create
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box text-center py-10">
          <h3 className="font-bold text-2xl mb-5">Create a Room</h3>

          <div className="flex flex-col px-15">
            <label>Game Name</label>
            <input
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="px-10 py-5 my-5 rounded-full border border-base-content/50 bg-base-200"
              type="text"
              placeholder="Enter the Game Name"
            />
          </div>

          <div className="flex flex-col px-15">
            <label>Joining Code</label>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="px-10 py-5 my-5 rounded-full border border-base-content/50 bg-base-200"
              type="text"
              placeholder="4 digit code"
            />
          </div>

          <div className="flex flex-col px-15">
            <label>Team Size(Max. 5 players)</label>
            <input
              value={playersCount}
              onChange={(e) => setPlayersCount(e.target.value)}
              className="px-10 py-5 my-5 rounded-full border border-base-content/50 bg-base-200"
              type="number"
              max={5}
            />
          </div>

          <button
            onClick={handleCreate}
            className="btn btn-primary text-primary-content shadow-lg py-6 px-15 mt-5 rounded-full text-xl font-bold"
          >
            Create
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Create;