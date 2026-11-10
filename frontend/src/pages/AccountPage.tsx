import { useState, type FormEvent } from "react";
import type { AuthMode } from "../types";

export function AccountPage({ user, email, onSubmit, onSignOut, onExplore }: {
  user: string | null;
  email: string;
  onSubmit: (name: string, email: string) => void;
  onSignOut: () => void;
  onExplore: () => void;
}) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formEmail, setFormEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (authMode === "forgot") {
      alert("Recuperação demonstrativa. Backend ainda não conectado.");
      return;
    }
    onSubmit(name, formEmail);
  }

  return (
    <main className="account-page">
      <section className="auth-card">
        <div className="auth-logo">⌖</div><small>SPORT-MAPS ACCOUNT</small>
        <h1>{user ? `Olá, ${user}!` : authMode === "login" ? "Bem-vindo de volta" : authMode === "register" ? "Criar conta" : "Recuperar senha"}</h1>
        <p>{user ? "Sua conta está conectada neste navegador." : authMode === "login" ? "Entre para salvar seus locais favoritos." : authMode === "register" ? "Crie sua conta para aproveitar o SPORT-MAPS." : "Informe seu e-mail para receber instruções."}</p>
        {user ? (
          <><div className="profile-box"><div className="avatar large">{user[0].toUpperCase()}</div><strong>{user}</strong><span>{email || "Conta local demonstrativa"}</span></div><button className="primary-btn" onClick={onSignOut}>Sair da conta</button></>
        ) : (
          <form onSubmit={submitAuth}>
            {authMode === "register" && <label>Nome<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" /></label>}
            <label>E-mail<input required type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)} placeholder="voce@email.com" /></label>
            {authMode !== "forgot" && <label>Senha<input required type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 6 caracteres" /></label>}
            {authMode === "login" && <button type="button" className="forgot-link" onClick={() => setAuthMode("forgot")}>Esqueci minha senha</button>}
            <button className="primary-btn" type="submit">{authMode === "login" ? "Entrar" : authMode === "register" ? "Criar conta" : "Enviar instruções"}</button>
          </form>
        )}
        <div className="auth-switch">{!user && (authMode === "login" ? <>Não tem conta? <button onClick={() => setAuthMode("register")}>Criar conta grátis</button></> : <button onClick={() => setAuthMode("login")}>Voltar para login</button>)}</div>
        <button className="back-btn auth-back" onClick={onExplore}>← Voltar para explorar</button>
      </section>
    </main>
  );
}