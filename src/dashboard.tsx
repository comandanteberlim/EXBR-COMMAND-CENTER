import { useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";

type Props = { session: Session };
const modules = [
  ["dashboard", "Painel", "Resumo geral do comando", "▦"],
  ["members", "Efetivo", "Cadastro e gestão de integrantes", "♙"],
  ["ranks", "Hierarquia", "Patentes e ordem hierárquica", "≡"],
  ["squads", "Esquadrões", "Unidades e comandantes", "⬡"],
  ["sheets", "Planilhas", "Planilhas e controles internos", "▤"],
  ["availability", "Disponibilidade", "Disponibilidade individual", "◷"],
  ["announcements", "Comunicados", "Avisos oficiais", "▣"],
  ["calendar", "Calendário", "Eventos e atividades", "▦"],
  ["themes", "Temas", "Aparência e temas de eventos", "◐"],
  ["history", "Histórico", "Registro de ações administrativas", "◴"],
  ["security", "Segurança", "Contas, permissões e sessões", "⌑"],
  ["settings", "Configurações", "Configurações gerais", "⚙"],
] as const;

export default function Dashboard({ session }: Props) {
  const [page, setPage] = useState("dashboard");
  const current = modules.find((item) => item[0] === page) ?? modules[0];

  async function sair() {
    await supabase?.auth.signOut();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand"><div className="brand compact">EX<span>BR</span></div>
          <div><b>COMMAND</b><small>CENTER</small></div></div>
        <nav>
          {modules.map(([id, name, , icon]) => (
            <button key={id} className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => setPage(id)}><span className="nav-icon">{icon}</span>{name}</button>
          ))}
        </nav>
        <button className="logout" onClick={sair}>↪ Sair</button>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <div><p className="overline">EXBR / SISTEMA INTERNO</p><h1>{current[1]}</h1></div>
          <span className="user-chip">{session.user.email}</span>
        </header>
        <section className="content">
          {page === "dashboard" ? (
            <>
              <div className="section-heading"><div><h2>Central de comando</h2>
                <p>Bem-vindo ao ambiente administrativo da EXBR.</p></div></div>
              <div className="stats">
                <article className="stat"><span>Integrantes cadastrados</span><strong>—</strong></article>
                <article className="stat"><span>Esquadrões criados</span><strong>—</strong></article>
                <article className="stat"><span>Comunicados publicados</span><strong>—</strong></article>
              </div>
              <div className="empty-state"><span className="empty-symbol">⬡</span>
                <h2>Ambiente pronto para configuração</h2>
                <p>Não existem integrantes, esquadrões ou registros fictícios. Cadastros e indicadores serão ligados ao banco de dados nas próximas etapas.</p>
              </div>
            </>
          ) : (
            <div className="empty-state module-empty">
              <span className="empty-symbol">{current[3]}</span>
              <h2>{current[1]}</h2><p>{current[2]}.</p>
              <p>Esta área está prevista no projeto. A implementação das operações e permissões será feita com o banco de dados conectado.</p>
            </div>
          )}
        </section>
        <footer>EXBR COMMAND CENTER <span>•</span> AMBIENTE ADMINISTRATIVO</footer>
      </main>
    </div>
  );
}
