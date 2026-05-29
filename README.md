
# Hackaton-Mart-City

# Integrantes da equipe:
<ul>
  <li>
    <h2>
      Tiago
    </h2>
  </li>
  <li>
    <h2>
      Elionai
    </h2>
  </li>
  <li>
    <h2>
      Alexandre
    </h2>
  </li>
  <li>
    <h2>
      Yuri
    </h2>
  </li>
  <li>
    <h2>
      Philip
    </h2>
  </li>
</ul>

<h2>Semáforo Inteligente</h2>

<strong>Protótipo de Semáforo Inteligente</strong>
<span>
Desenvolvido para auxiliar no controle do tráfego urbano, o sistema identifica situações de risco e acidentes em tempo real, alertando os motoristas por meio de painéis visuais inteligentes e realizando o bloqueio automático da pista quando necessário, aumentando a segurança e a fluidez no trânsito.
</span>

Dificuldades do dia-a-dia:
Acidentes no trânsito são inevitáveis e a falta de resposta rápida e eficiente em situações de acidentes ou riscos no trânsito podem agravar a situação tornando-a mais difícil e lenta de se resolver.

Consequencias:
A falta de resposta rápida aumenta as chances de novos acidentes acontecerem, e grandes congestionamentos podem atrasar serviços de emergemcia como ambulancia, bombeiros e policia

Solução:
O uso de um semaforo inteligente pode


 1. A Estrutura do Dashboard (O que mostrar na tela)
A interface deve ser limpa e focar em dados acionáveis em tempo real. Você pode desenhar ou programar um protótipo com os seguintes componentes:

Painel de Controle Central (Visão Governamental/Tráfego)
Mapa Interativo (ex: Leaflet ou Google Maps API): Um mapa da cidade com pontos piscando em Verde (Fluxo Normal), Amarelo (Lentidão) ou Vermelho (Acidente/Bloqueio).

Métricas em Tempo Real (Cards):

Total de semáforos ativos.

Tempo médio de resposta a incidentes.

Fluxo de carros por minuto (simulado).

Log de Eventos (Feed de Notificações): Uma lista lateral que atualiza sozinha:

[14:32:10] Semáforo Av. Paulista - Fluxo Normal.

[14:35:02] ALERTA: Possível colisão detectada no Semáforo Av. Rebouças.

[14:35:03] AÇÃO AUTOMÁTICA: Pista bloqueada e sinalizador visual ativado.

Painel do Motorista (Simulação do Painel de LED da rua)
Uma aba simples no navegador que simula o painel que fica na rua. Quando o operador (ou o sistema) detecta o acidente, essa tela muda instantaneamente de verde para um aviso vermelho gigante: "ACIDENTE À FRENTE. DESVIE."

2. A Arquitetura Técnica para ADS (O que os alunos querem ver)
Para os alunos de ADS, o "brilho nos olhos" acontece quando você explica a tecnologia por trás dos panos. Mostre a eles o fluxo dos dados usando termos que eles veem em aula:

[Simulador de Semáforo/Sensor] -> (JSON via POST) -> [API Back-end (Node/Python)] -> [WebSockets] -> [Dashboard Front-end (React/Vue)]
O Fluxo da Informação:
O "Sensor" (Simulador): Como você não usará hardware, crie um script simples em Python ou um botão oculto no próprio dashboard que "dispare" um acidente. Ele envia uma requisição HTTP contendo um JSON:

JSON
{
  "semaforo_id": "SEM-402",
  "status": "ACIDENTE",
  "coordenadas": {"lat": -23.55, "lng": -46.63},
  "timestamp": "2026-05-28T14:35:00Z"
}
O Back-end (A inteligência): Uma API (feita em Node.js, Python FastAPI ou Java Spring) recebe esse JSON, salva no banco de dados (PostgreSQL/MongoDB) e dispara um evento.

A Atualização em Tempo Real (Crucial para ADS): Explique que para um semáforo inteligente, atualizar a página de 5 em 5 segundos (polling) não serve. Use o conceito de WebSockets (Socket.io) para "empurrar" o alerta do servidor para o Front-end instantaneamente.

3. Roteiro da Demonstração ao Vivo
Para prender a atenção da turma, faça uma simulação ativa:

Deixe o Dashboard aberto no projetor: Mostre o mapa com todas as vias verdes e os gráficos estáveis.

Abra o console do desenvolvedor (F12) ou o Postman lateralmente: Mostre o código ou a ferramenta de testes.

Simule o Acidente: Clique no botão de simular colisão.

Veja a mágica acontecer: Sem atualizar a página, o mapa deve mudar para vermelho, o gráfico de congestionamento deve subir, e o log deve registrar o bloqueio da pista na hora.

Mostre o código do WebSocket: Mostre a função simples no Front-end que "escuta" o evento do acidente e muda o estado da tela.

Dica de Tecnologias Práticas para Implementar:
Front-end: HTML/CSS/JS puro com Bootstrap ou Tailwind (para os cards e tabelas) e Leaflet.js (biblioteca gratuita e leve para mapas).

Back-end: Node.js com Express e Socket.io (pela facilidade e velocidade de configurar o tempo real).

Apresentar o projeto dessa forma vai fazer os alunos enxergarem exatamente como o desenvolvimento de sistemas resolve problemas complexos do mundo real, além de dar ótimas ideias para os TCCs deles!


