import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fs } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";
function Inscription() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      ("Les mots de passe ne correspondent pas.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        // Update user profile with full name
        return addDoc(collection(fs, "users"), {
          id: userId,
          FullName: fullName,
          Telephone: telephone,
          Email: email,
        });
      })

      .then(() => {
        setSuccess(
          "Inscription réussie. Vous allez maintenant être redirigé automatiquement vers la page de connexion."
        );
        setFullName("");
        setEmail("");
        setPassword("");
        setTelephone();
        setError("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setSuccess("");
          nav("/connexion");
        }, 1000);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="auth-container ins">
      <div className="container">
        <h2>Inscription</h2>
        {success && (
          <>
            <span className="green">{success}</span>
            <br></br>
          </>
        )}
        <form onSubmit={handleSignup}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="telephone">Telephone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            required
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="auth-links">
            <button type="submit">S'inscrire</button>
            <ScrollToTop to="/connexion">
              Déjà un compte ? Se connecter
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

export default Inscription;
