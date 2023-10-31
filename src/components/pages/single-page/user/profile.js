import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditUser from './edituser'

function userProfile({ user, setUser, setUsers, setEditFormOpen, onConfirmDelete, onCancelDelete }) {
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
    }

    const handleDeleteAccount = () => {
        // Use window.confirm to ask the user for confirmation
        const shouldDelete = window.confirm(`Are you sure you want to delete your account? This action cannot be undone.`);
        if (shouldDelete) {
            // If the user confirms, proceed with the delete action
            handleConfirm();
        }
    }

    return (
        <div>
            <p className="profile-text">Hello {user.name}</p>
            <EditUser user={user} setUser={setUser} setUsers={setUsers} setEditFormOpen={setEditFormOpen} />

            {confirmDelete ? (
                <p>{user.name} has been deleted.</p>
            ) : (
                <div>
                    <br />
                    {/* Use the Delete Account link to initiate the confirmation dialog */}
                    <p className="account-delete-button" onClick={handleDeleteAccount}>Delete Account</p>
                    <br />

                </div>
            )}
        </div>
    )
}

export default userProfile;
