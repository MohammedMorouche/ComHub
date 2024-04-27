// import React from 'react';
import "./login.css"; // Fichier CSS pour styliser la page
import ScrollToTop from "../Components/ScrollToTop";
import { useContext, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import {useHistory} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
function Connexion() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  const navitage = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(
          "Connexion réussie. Vous allez maintenant être redirigé automatiquement vers la page d'accueil."
        );
        setEmail("");
        setPassword("");
        setError("");
        setTimeout(() => {
          setSuccess("");
          // history.push('/');
          navitage("/");
        }, 3000);
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="auth-container">
      <div className="container">
        <h2>Connexion</h2>
        {success && (
          <>
            <span className="green">{success}</span>
            <br></br>
          </>
        )}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-links">
            <button type="submit">Se connecter</button>
            <ScrollToTop to="/inscription">Créer un compte</ScrollToTop>
            <ScrollToTop to="/mot-de-passe-oublie">
              Mot de passe oublié ?
            </ScrollToTop>
          </div>
        </form>
        {error && (
          <>
            <br></br>
            <span className="red">{error}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Connexion;
