import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import axios from "axios";
function Profile() {
  const { user } = useUser();
  const [table, useTable] = useState([]);

  const historyTable = async (id) => {
    if (id){
      const field = await axios.get(`/api/requestHistory/onlyUser/${id}`);
      useTable(field.data);
    }
  
  };

 
  const deleteRequest = async (id) => {
    const field = await axios.delete(`/api/requestHistory/${id}`);
    if (field.data.message === "success") {
      console.log(id, table);
      useTable((prev) => prev.filter((el) => el.id !== id));
    }
  };

  useEffect(() => {
    historyTable(user?.id);
  }, [user]);
  return (
    <>
      <div>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
      </div>
      <div>
        {table.map((el) => {
          return (
            <div key={el.id}>
              <div>
                {el.goodRequest} {el.badRequest}
              </div>
              <button
                onClick={() => {
                  deleteRequest(el.id);
                }}
              >
                Delete{" "}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Profile;
