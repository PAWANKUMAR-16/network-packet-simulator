import { Play, Activity } from 'lucide-react';

export default function SimulationPanel({
  nodes,
  source, setSource,
  destination, setDestination,
  algorithm, setAlgorithm,
  packetCount, setPacketCount,
  onSimulate,
  isSimulating,
  error
}) {
  return (
    <div className="bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-800">
      <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-yellow-500" />
        Simulation Config
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Source Node</label>
          <select 
            value={source} 
            onChange={(e) => setSource(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 text-sm transition-shadow outline-none"
          >
            {nodes.map(n => <option key={`src-${n.id}`} value={n.id}>{n.data.label}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Destination Node</label>
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 text-sm transition-shadow outline-none"
          >
            {nodes.map(n => <option key={`dst-${n.id}`} value={n.id}>{n.data.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Routing Algorithm</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 text-sm transition-shadow outline-none"
          >
            <option value="dijkstra">Dijkstra (Shortest Path)</option>
            <option value="bfs">BFS (Fewer Hops)</option>
            <option value="dfs">DFS (Depth First)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Packet Count: <span className="text-yellow-500">{packetCount}</span></label>
          <input 
            type="range" 
            min="1" 
            max="100"
            value={packetCount} 
            onChange={(e) => setPacketCount(parseInt(e.target.value) || 1)}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-1">
            <span>1</span>
            <span>100</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 text-red-400 text-sm rounded-lg border border-red-500/20 flex items-start gap-2">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <p>{error}</p>
        </div>
      )}
      
      <button 
        onClick={onSimulate}
        disabled={isSimulating || nodes.length < 2}
        className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          isSimulating || nodes.length < 2
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none' 
            : 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]'
        }`}
      >
        <Play className={`h-5 w-5 ${isSimulating ? 'animate-pulse' : 'fill-black'}`} />
        {isSimulating ? 'SIMULATING...' : 'RUN SIMULATION'}
      </button>
    </div>
  );
}
