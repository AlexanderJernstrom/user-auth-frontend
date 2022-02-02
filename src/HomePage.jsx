import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./App";

export const HomePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const getUser = async () => {
    const response = await fetch(`${API_URL}/profile`, {
      headers: { authorization: localStorage.getItem("backend-test-token") },
    });
    const json = await response.json();
    setLoading(false);
    setUser(json);
  };

  const deleteAccount = async () => {
    const response = await fetch(`${API_URL}/user/delete`, {
      method: "DELETE",
      headers: { authorization: localStorage.getItem("backend-test-token") },
    });
    if (response.status === 200) {
      localStorage.removeItem("backend-test-token");
      navigate("/");
    }
  };

  const resetPassword = async () => {
    const response = await fetch(`${API_URL}/send-reset-password-email`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("backend-test-token"),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.success) {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ width: "100%" }}>
      {showAlert && <Alert variant="success">Email sent!</Alert>}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <h1>{user?.name}</h1>
        <h4>{user?.email}</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h2>Actions</h2>
          <Button onClick={() => navigate("/search-users")}>
            Search users
          </Button>
          <Button onClick={resetPassword}>Reset password</Button>
          <Button onClick={deleteAccount}>Delete account</Button>
          <Button
            onClick={() => {
              localStorage.removeItem("backend-test-token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
