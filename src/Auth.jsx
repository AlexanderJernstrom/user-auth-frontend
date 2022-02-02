import React from "react";
import { Button } from "react-bootstrap";

export const Auth = ({ children }) => {
  if (!localStorage.getItem("backend-test-token")) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div>
          <h1>You are not authorized to view this page</h1>
          <p>Please login to view this page</p>
          <Button variant="link">Click here to login</Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
