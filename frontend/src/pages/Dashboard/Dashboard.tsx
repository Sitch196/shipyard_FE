import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.styles.css";
import { Ship, User } from "../../types";
import { api } from "../../services/api";

const Dashboard = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userStr));
    fetchShips();
  }, [navigate]);

  const fetchShips = async () => {
    try {
      const data = await api.ships.getAll();
      setShips(data);
    } catch (error) {
      console.error("Error fetching ships:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user?.name}</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="dashboard-content">
        {ships.map((ship) => (
          <div key={ship.id} className="ship-card">
            <h3>{ship.name}</h3>
            <p>Status: {ship.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
