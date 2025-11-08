export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>CineSenai API</h1>
      <p>API REST para o sistema CineSenai</p>
      <h2>Endpoints disponíveis:</h2>
      <ul>
        <li>
          <code>GET /api/filme/em-cartaz</code> - Lista filmes em cartaz
        </li>
        <li>
          <code>GET /api/filme/em-breve</code> - Lista filmes em breve
        </li>
        <li>
          <code>GET /api/filme/[id]</code> - Busca filme por ID
        </li>
        <li>
          <code>GET /api/genero</code> - Lista todos os gêneros
        </li>
        <li>
          <code>GET /api/sessao/[id]</code> - Busca sessão por ID
        </li>
        <li>
          <code>GET /api/ingresso/[id]</code> - Busca ingresso por ID
        </li>
        <li>
          <code>POST /api/ingresso</code> - Cria um novo ingresso
        </li>
      </ul>
    </div>
  );
}
