import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteUser({ user, onConfirmDelete, onCancelDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    fetch(`http://localhost:3000/users/delete/${sessionStorage.user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          onConfirmDelete();
          setConfirmDelete(false);

          // Redirect to the /login route
          navigate("/login");
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });

    setConfirmDelete(true);
    window.alert(`You are about to delete ${user.name}. Click "Yes" again to confirm.`);
  };

  return (
    <div>
      {confirmDelete ? (
        <p>{user.name} has been deleted.</p>
      ) : (
        <div>
          <p>Are you sure you want to delete your profile?</p>
          <button className="signup-button" onClick={handleConfirm}>Yes</button>
          <br />
          <button className="nice-button" onClick={onCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
