import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // Fichier CSS pour styliser la page
import ScrollToTop from "../Components/ScrollToTop";
import { useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navige = useNavigate();
  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMsg("check your email to reset password");
        setTimeout(() => {
          setMsg("");
          // history.push('/');
          navige("/connexion");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="auth-container">
      <div className="container">
        <h2>Mot de passe oublié</h2>
        {msg && (
          <>
            <span className="green">{msg}</span>
            <br></br>
          </>
        )}
        <form onSubmit={handleResetPassword}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="auth-links">
            <button type="submit">Envoyer</button>
            <ScrollToTop to="/connexion">Retour à la connexion</ScrollToTop>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MotDePasseOublie;
