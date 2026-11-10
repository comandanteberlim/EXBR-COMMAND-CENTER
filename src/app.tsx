import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import Dashboard from "./dashboard";
import { isSupabaseConfigured, supabase } from "./lib/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [entrando, setEntrando] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setCarregando(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregando(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setErro("");
    setEntrando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    if (error) setErro("Não foi possível entrar. Confira o e-mail e a senha.");
    setEntrando(false);
  }

  if (carregando) return <main className="loading-screen">Carregando EXBR COMMAND CENTER...</main>;
  if (session) return <Dashboard session={session} />;

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="brand">EX<span>BR</span></div>
        <p className="overline">CENTRAL DE COMANDO</p>
        <h1>Acesso restrito</h1>
        <p className="muted">Entre com sua conta autorizada.</p>
        {!isSupabaseConfigured ? (
          <div className="notice warning">
            O projeto ainda não está conectado ao Supabase. Configure as variáveis
            VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente de publicação.
          </div>
        ) : (
          <form onSubmit={entrar}>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" autoComplete="username" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" autoComplete="current-password" value={senha}
              onChange={(e) => setSenha(e.target.value)} required />
            <button className="primary full" disabled={entrando}>
              {entrando ? "ENTRANDO..." : "ENTRAR"}
            </button>
            {erro && <p className="error" role="alert">{erro}</p>}
          </form>
        )}
        <p className="footnote">Acesso somente para usuários cadastrados pelo administrador.</p>
      </section>
    </main>
  );
}
