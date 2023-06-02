import React, { useState, useContext, useEffect } from "react";
import "../styles/App.css";
import UserAccount from "./UserAccount";
import { useAuth } from "../contexts/AuthContext";
import PostHandler from "./PostHandler";

function App() {
  const { currentUser, handleSignOut } = useAuth();
  const styles = {
    login: {
      padding: "15px",
      display: "flex",
      justifyContent: "center",
    },
  };
  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div>
      <div style={styles.login}>
        <UserAccount />
        <br></br>
      </div>
      {currentUser && <PostHandler></PostHandler>}
    </div>
  );
}

export default App;
