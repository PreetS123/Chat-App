import React from "react";

export const ProfileModal = ({ isModalOpen, closeModal, user }) => {
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={closeModal}
          ></div>

          <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center z-10 w-screen overflow-y-auto"
          >
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:max-w-md">
              {/* Your modal content here */}
              <div className="p-4">
                <h3 className="text-gray-700">{user.username}</h3>
                <img
                  className="w-60 h-46 rounded-sm"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="..."
                />
                <p className="text-gray-400 font-semibold">{user.email}</p>
              </div>
              <div className="border-t border-gray-200 p-2 flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-white bg-red-800 hover:bg-red-800 rounded-md px-2 py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
