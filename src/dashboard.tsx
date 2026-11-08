
export default function Dashboard() {
  const modulos = [
    { nome: "Membros", descricao: "Gerenciar integrantes", icone: "👥" },
    { nome: "Patentes", descricao: "Hierarquia da EXBR", icone: "🎖️" },
    { nome: "Esquadrões", descricao: "Organizar unidades", icone: "🛡️" },
    { nome: "Comunicados", descricao: "Avisos oficiais", icone: "📢" },
    { nome: "Calendário", descricao: "Eventos e atividades", icone: "📅" },
    { nome: "Personalização", descricao: "Temas e aparência", icone: "🎨" }
  ];

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🇧🇷 EXBR</h1>
          <p>COMMAND CENTER</p>
        </div>
        <span className="status">SISTEMA EXBR</span>
      </header>

      <section className="welcome">
        <h2>Central de Comando</h2>
        <p>Bem-vindo à plataforma de gerenciamento da EXBR.</p>
      </section>

      <section className="modules">
        {modulos.map((modulo) => (
          <article className="module-card" key={modulo.nome}>
            <span className="module-icon">{modulo.icone}</span>
            <h3>{modulo.nome}</h3>
            <p>{modulo.descricao}</p>
            <button type="button">Acessar</button>
          </article>
        ))}
      </section>
    </main>
  );
}
