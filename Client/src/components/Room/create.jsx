import React, { useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Create = ({ defaultGame = "Unravel", onRoomCreated }) => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState(defaultGame);
  const [joinCode, setJoinCode] = useState("");
  const [playersCount, setPlayersCount] = useState(2);

  const handleCreate = async () => {
    try {
      if (!joinCode || joinCode.length !== 4) {
        alert("Please enter a 4-digit join code");
        return;
      }

      const response = await api.post(
        "/rooms/create",
        {
          gameName: gameName || "Unravel",
          joinCode,
          playersCount: Number(playersCount) || 2,
        }
      );

      const createdRoom = response.data?.data;
      const modalEl = document.getElementById("my_modal_3");
      if (modalEl) modalEl.close();

      if (onRoomCreated) {
        onRoomCreated(createdRoom);
      } else if (createdRoom?.roomid) {
        const lowerName = (gameName || "").toLowerCase();
        if (lowerName.includes("handkerchief")) {
          navigate(`/handkerchief?roomId=${createdRoom.roomid}`);
        } else if (lowerName.includes("unravel")) {
          navigate(`/unravel?roomId=${createdRoom.roomid}`);
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating room");
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary text-primary-content px-8 h-12 rounded-full text-base font-bold shadow-md cursor-pointer"
        onClick={() =>
          document.getElementById("my_modal_3").showModal()
        }
      >
        + Create Room
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box text-center py-8 max-w-md">
          <h3 className="font-extrabold text-2xl mb-4">Create Game Room</h3>

          <div className="flex flex-col px-4 text-left mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 mb-1">Game</label>
            <select
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-base-content/30 bg-base-200 text-sm font-bold"
            >
              <option value="Unravel">Unravel (2 Players)</option>
              <option value="Drop the Handkerchief">Drop the Handkerchief (2 Players)</option>
              <option value="Bloody Dotty">Bloody Dotty</option>
              <option value="Mind Vault">Mind Vault</option>
            </select>
          </div>

          <div className="flex flex-col px-4 text-left mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 mb-1">4-Digit Joining Code</label>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-base-content/30 bg-base-200 font-mono font-bold tracking-widest text-center text-lg"
              type="text"
              maxLength={4}
              placeholder="e.g. 4821"
            />
          </div>

          <div className="flex flex-col px-4 text-left mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 mb-1">Player Capacity</label>
            <input
              value={playersCount}
              onChange={(e) => setPlayersCount(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-base-content/30 bg-base-200 text-sm font-bold"
              type="number"
              min={2}
              max={5}
            />
          </div>

          <button
            onClick={handleCreate}
            className="btn btn-primary text-primary-content shadow-lg py-3 px-12 rounded-2xl text-lg font-bold w-full cursor-pointer"
          >
            Create & Enter Room
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