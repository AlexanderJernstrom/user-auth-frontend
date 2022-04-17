import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "./App";

export const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const updatePassword = async () => {
    const response = await fetch(`${API_URL}/api/account/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: `${localStorage.getItem("backend-test-token")}`,
      },
      body: JSON.stringify({ newPassword, token: params.token }),
    });
    const data = await response.json();
    if (data.success) {
      navigate("/");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Reset password</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
          }}
        >
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={updatePassword}>Change password</Button>
        </div>
      </div>
    </div>
  );
};
