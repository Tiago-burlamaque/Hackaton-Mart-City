import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

// IMPORTANTE: Coloque o arquivo de vídeo do tráfego (.mp4) nessa pasta com este nome
import videoTransito from "../assets/camera_semaforo.mp4";

function Home() {
  const navigate = useNavigate();

  // Recupera o usuário do localStorage (Sua lógica original preservada)
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Função para deslogar (Sua lógica original preservada)
  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  // ESTADOS PARA O CONTROLE DO SEMÁFORO E DA IA
  const [corSemaforo, setCorSemaforo] = useState("vermelho");
  const [tempoRestante, setTempoRestante] = useState(10);
  const [dadosIA, setDadosIA] = useState({ 
    veiculos: 0, 
    status: "Aguardando análise da via...",
    timestamp: "--:--:--" 
  });
  const [historicoLogs, setHistoricoLogs] = useState([]); // Histórico para o console visual

  // CONTROLE DO CICLO DO SEMÁFORO INTELIGENTE
  useEffect(() => {
    let timer;

    const gerenciarTrafegoInteligente = async () => {
      if (tempoRestante > 0) {
        // Contagem regressiva normal segundo a segundo
        timer = setTimeout(() => setTempoRestante(tempoRestante - 1), 1000);
      } else {
        // MUDANÇA DE ESTADO: Se estava VERMELHO e zerou, a IA analisa a câmera antes de abrir!
        if (corSemaforo === "vermelho") {
          try {
            // Simula a IA contando os carros do vídeo (Gera um número aleatório entre 1 e 25)
            const contagemCarrosSimulada = Math.floor(Math.random() * 25) + 1;

            // Envia os dados para a rota do seu backend em server.js
            const res = await axios.post("http://localhost:5000/api/semaforo/analisar", {
              veiculosDetectados: contagemCarrosSimulada
            });

            const { veiculosDetectados, tempoVerde, statusTrafego, timestamp } = res.data;

            // Atualiza os componentes visuais com a resposta da IA
            setDadosIA({
              veiculos: veiculosDetectados,
              status: statusTrafego,
              timestamp
            });

            // Alimenta o terminal de logs na interface
            const novoLog = `[${timestamp}] Varredura de Câmera: ${veiculosDetectados} carros detectados -> Sinal VERDE configurado para ${tempoVerde}s (${statusTrafego})`;
            setHistoricoLogs((prev) => [novoLog, ...prev.slice(0, 3)]); // Mantém os últimos 4 logs

            // Aplica o tempo calculado pela IA e abre o sinal
            setCorSemaforo("verde");
            setTempoRestante(tempoVerde);

          } catch (error) {
            console.error("Erro ao conectar com a IA do servidor:", error);
            // Fallback padrão se o servidor estiver offline durante os testes
            setCorSemaforo("verde");
            setTempoRestante(10);
          }
        } 
        // MUDANÇA DE ESTADO: Verde -> Amarelo (Fixo de 3 segundos)
        else if (corSemaforo === "verde") {
          setCorSemaforo("amarelo");
          setTempoRestante(3);
        } 
        // MUDANÇA DE ESTADO: Amarelo -> Vermelho (Tempo padrão de retenção de 10 segundos)
        else if (corSemaforo === "amarelo") {
          setCorSemaforo("vermelho");
          setTempoRestante(10);
        }
      }
    };

    gerenciarTrafegoInteligente();

    // Limpa o temporizador para evitar estouro de memória
    return () => clearTimeout(timer);
  }, [tempoRestante, corSemaforo]);

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#121212", minHeight: "100vh", fontFamily: "sans-serif" }}>
     
      {/* TOPO: Boas-vindas e botão Sair */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333", paddingBottom: "15px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>🚦 Smart Traffic AI</h1>
          <p style={{ margin: "5px 0 0 0", color: "#aaa" }}>
            Bem-vindo, <strong>{usuario?.nome || "Usuário"}</strong>
          </p>
        </div>
        <button onClick={sair} style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Sair
        </button>
      </header>

      {/* DISPOSIÇÃO DO PAINEL (Câmera ao lado do Semáforo) */}
      <div style={{ display: "flex", gap: "20px", marginTop: "25px", flexWrap: "wrap" }}>
        
        {/* BLOCO DA CÂMERA DE MONITORAMENTO REAL */}
        <div style={{ flex: 1, minWidth: "300px", background: "#1e1e1e", padding: "20px", borderRadius: "10px", border: "1px solid #2d2d2d" }}>

          <h3 style={{ marginTop: 0, marginBottom: "15px" }}>📷 Câmera 01 - Análise Dinâmica de Fluxo</h3>
            <iframe repeat width="500" height="315" src={videoTransito} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          
          {/* Box Container do Feed de Vídeo */}
          <div style={{ width: "100%", height: "220px", background: "#252525", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden", border: "1px solid #333" }}>
            <span style={{ position: "absolute", top: "10px", left: "10px", background: "red", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", zIndex: 2 }}>LIVE</span>
            
            {/* RENDERIZAÇÃO DO VÍDEO REAL EM LOOP */}
            {/* <video 
              src={videoTransito} 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
            />
             */}
            {/* Dados analíticos sobrepostos no canto do vídeo */}
            <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.85)", padding: "6px 12px", borderRadius: "4px", fontSize: "13px", zIndex: 2, border: "1px solid #444" }}>
              IA detectou: <strong style={{ color: "#ffeb3b", fontSize: "15px" }}>{dadosIA.veiculos} carros</strong>
            </div>
          </div>

          <div style={{ marginTop: "15px", background: "#2a2a2a", padding: "12px", borderRadius: "6px", fontSize: "14px" }}>
            <p style={{ margin: "4px 0" }}>Densidade calculada: <strong>{dadosIA.status}</strong></p>
            <p style={{ margin: "4px 0", color: "#aaa", fontSize: "12px" }}>Último escaneamento: {dadosIA.timestamp}</p>
          </div>
        </div>

        {/* BLOCO DO SEMÁFORO VISUAL */}
        <div style={{ flex: 1, minWidth: "300px", background: "#1e1e1e", padding: "20px", borderRadius: "10px", border: "1px solid #2d2d2d", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ marginTop: 0 }}>🚦 Estado Atual da Via</h3>
          
          {/* Estrutura Física do Semáforo */}
          <div style={{ background: "#000", width: "90px", padding: "18px 10px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "15px", alignItems: "center", margin: "15px 0", border: "2px solid #333" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: corSemaforo === "vermelho" ? "#ff4d4d" : "#330000", boxShadow: corSemaforo === "vermelho" ? "0 0 20px #ff4d4d" : "none", transition: "all 0.3s" }} />
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: corSemaforo === "amarelo" ? "#ffeb3b" : "#333300", boxShadow: corSemaforo === "amarelo" ? "0 0 20px #ffeb3b" : "none", transition: "all 0.3s" }} />
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: corSemaforo === "verde" ? "#4caf50" : "#003300", boxShadow: corSemaforo === "verde" ? "0 0 20px #4caf50" : "none", transition: "all 0.3s" }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#aaa", margin: 0, fontSize: "12px", textTransform: "uppercase" }}>Próxima mudança em</p>
            <span style={{ fontSize: "3.2rem", fontWeight: "bold", color: "#ffeb3b", fontFamily: "monospace" }}>{tempoRestante}s</span>
          </div>
        </div>

      </div>

      {/* CONSOLE DE LOGS (Essencial para a explicação técnica ao professor) */}
      <div style={{ marginTop: "20px", background: "#1e1e1e", padding: "15px", borderRadius: "10px", border: "1px solid #2d2d2d" }}>
        <h4 style={{ marginTop: 0, marginBottom: "10px", color: "#aaa" }}>🖥️ Console de Tomada de Decisão (Visão Computacional)</h4>
        <div style={{ background: "#121212", padding: "12px", borderRadius: "6px", fontFamily: "monospace", fontSize: "13px", color: "#39ff14", minHeight: "95px", lineHeight: "1.6" }}>
          {historicoLogs.length === 0 ? (
            <p style={{ color: "#555" }}>Aguardando o encerramento da primeira fase vermelha para varredura de tráfego...</p>
          ) : (
            historicoLogs.map((log, index) => <p key={index} style={{ margin: "4px 0" }}>{log}</p>)
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;