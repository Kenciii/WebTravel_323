import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [location.key]);

  const handleChangeStatus = async (userId) => {
    try {
      await axios.get(`http://localhost:8081/user/status/${userId}`);
      history(location.pathname);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/user/${userId}`);
      history(location.pathname);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <ul className="list-group">
        {users.map((user) =>
          user.username !== "admin" ? (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
              <div>
                <strong>Username:</strong> {user.username} - <strong>Role:</strong> {user.role} - <strong>Status:</strong> {user.status}
              </div>
              <div>
                <button className="btn btn-outline-primary mx-2" onClick={() => handleChangeStatus(user.id)}>
                  Change Status
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ListUsers;
