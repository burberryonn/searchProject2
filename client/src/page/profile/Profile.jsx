import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const { user } = useUser();
  const [table, setTable] = useState([]);

  const historyTable = async (id) => {
    if (id) {
      const field = await axios.get(`/api/requestHistory/onlyUser/${id}`);
      setTable(field.data);
    }
  };

  const deleteRequest = async (id) => {
    const field = await axios.delete(`/api/requestHistory/${id}`);
    if (field.data.message === "success") {
      setTable((prev) => prev.filter((el) => el.id !== id));
    }
  };

  useEffect(() => {
    historyTable(user?.id);
  }, [user]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h1>Ваша истори мистер {user?.name}</h1>
        </div>
        <div className="profile-table-container">
          <table className="profile-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Good Request</th>
                <th>Bad Request</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {table.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.goodRequest}</td>
                  <td>{el.badRequest}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteRequest(el.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;
