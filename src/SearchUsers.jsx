import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./App";

export const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const searchUsers = async (e) => {
    const res = await fetch(`${API_URL}/users/search?search=${search}`, {
      headers: { authorization: localStorage.getItem("backend-test-token") },
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ position: "absolute", top: "0px", left: "0px" }}>
        <Button variant="link" onClick={() => navigate("/")}>
          Go to home
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Search for users</h1>
        <div style={{ width: "40%", display: "flex", gap: "0.5rem" }}>
          <Form.Control
            style={{ width: "75%" }}
            placeholder="Enter user name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="primary" onClick={searchUsers}>
            Search
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem",
        }}
      >
        <h1>Results</h1>
        {results.map((user) => (
          <div key={user.id} style={{ textAlign: "center" }}>
            <h5>{user.name}</h5>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
