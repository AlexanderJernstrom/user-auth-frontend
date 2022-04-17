import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./App";

export const Register = () => {
  const [values, setValues] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("backend-test-token")) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      const loginResponse = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const token = await loginResponse.text();
      localStorage.setItem("backend-test-token", token);
      navigate("/");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: " flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={onSubmit}
        >
          <Form.Control
            placeholder="Enter name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setValues((oldValues) => ({
                ...oldValues,
                email: e.target.value,
              }))
            }
          />
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setValues((oldValues) => ({
                ...oldValues,
                password: e.target.value,
              }))
            }
          />
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Button variant="link" onClick={() => navigate("/login")}>
          Already have an account? Login here
        </Button>
      </div>
    </div>
  );
};
