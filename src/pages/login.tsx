import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseconfig";
import logo from "../assets/logoglv.png";
import "../components/login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      console.log("Usuário autenticado:", user);

      const userId = user.uid;
      console.log("ID do usuário:", userId);

      localStorage.setItem("userId", userId);

      navigate("/home");
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginOuterContainer">
      <div className="loginContainer">
        <div className="formWrapper">
          <img src={logo} alt="Logo da Empresa" className="loginLogo" />

          <form onSubmit={handleSubmit} className="loginForm">
            <div className="inputGroup">
              <label htmlFor="username" className="inputLabel">
                Email:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="loginInput"
                placeholder="Informe seu email"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password" className="inputLabel">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="loginInput"
                placeholder="Informe sua senha"
              />
            </div>
            {error && <p className="loginError">{error}</p>}
            <button type="submit" className="submitButton" disabled={loading}>
              {loading ? <span className="loadingSpinner" /> : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
