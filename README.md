# Network Packet Simulator

A full-stack interactive network packet simulator built for learning DSA concepts applied to computer networks. Inspired by Cisco Packet Tracer.

## Features

- **Interactive Topology Builder** — Drag-and-drop PCs and Routers onto a canvas, connect them with cables
- **IP Address Configuration** — Click any device to assign an IP address
- **Routing Algorithms** — Visualize BFS, DFS, and Dijkstra pathfinding in real-time
- **Packet Simulation** — Send packets with realistic delay and packet loss
- **Packet Trace Log** — See which packets were delivered and which were dropped (and where)
- **Statistics Dashboard** — Charts for delivery rate, average latency, and hops

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Vite, Tailwind CSS v4      |
| Canvas    | React Flow                        |
| Charts    | Recharts                          |
| Icons     | Lucide React                      |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB + Mongoose (scaffolded)   |

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/network-packet-simulator.git
cd network-packet-simulator

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running the App

```bash
# Terminal 1 — Start backend
cd server
node server.js

# Terminal 2 — Start frontend
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

## How to Use

1. **Add Devices** — Use the sidebar to add PCs and Routers
2. **Connect Devices** — Drag from the handles (dots) on one node to another
3. **Configure IPs** — Click a node to open its properties and assign an IP
4. **Run Simulation** — Select source, destination, algorithm, and packet count, then hit **RUN SIMULATION**
5. **Analyze Results** — View the animated path, statistics, and packet trace log

## Project Structure

```
network-packet-simulator/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, AppLayout
│   │   │   ├── pages/       # LandingPage
│   │   │   ├── CustomNodes.jsx
│   │   │   ├── NetworkBuilder.jsx
│   │   │   ├── NodeProperties.jsx
│   │   │   ├── SimulationPanel.jsx
│   │   │   ├── StatisticsPanel.jsx
│   │   │   └── TutorialModal.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── vite.config.js
├── server/                  # Express backend
│   ├── algorithms/          # BFS, DFS, Dijkstra
│   ├── config/              # DB connection
│   ├── controllers/         # Simulation logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   └── server.js
└── README.md
```

## License

MIT
