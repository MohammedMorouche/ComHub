import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fs } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";
import { set } from "firebase/database";
function Inscription() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const fullName = lastName + " " + firstName;
        // Update user profile with full name
        return addDoc(collection(fs, "users"), {
          Email: email,
          Telephone: telephone,
          Adresse: adresse,
          FullName: fullName,
          id: userId,
        });
      })

      .then(() => {
        setSuccess(
          "Inscription réussie. Vous allez maintenant être redirigé automatiquement vers la page de connexion."
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTelephone("");
        setAdresse("");
        setError("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setSuccess("");
          nav("/");
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
        {error && (
          <>
            
            <span className="red">{error}</span>
            <br></br>
          </>
        )}
        {success && (
          <>
            <span className="green">{success}</span>
            <br></br>
          </>
        )}

        <form onSubmit={handleSignup}>
          <div className="cont">
            <div>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="cont">
            <div>
              <label htmlFor="prenom">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                required
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="auth-links">
            <button type="submit">S'inscrire</button>
            <ScrollToTop to="/connexion">
              Déjà un compte ? Se connecter
            </ScrollToTop>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
