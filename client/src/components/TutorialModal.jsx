import { X, MousePointer2, GitCommit, Play, Info } from 'lucide-react';

export default function TutorialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.15)] w-full max-w-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-zinc-950 p-6 border-b border-zinc-800 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
          <div className="relative flex items-center gap-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500">
              <Info className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">How to Use the Simulator</h2>
          </div>
          <button 
            onClick={onClose}
            className="relative text-zinc-400 hover:text-yellow-500 bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          
          <div className="flex gap-4 items-start">
            <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 shrink-0">
              <MousePointer2 className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">1. Add Devices (Nodes)</h3>
              <p className="text-zinc-400 leading-relaxed mb-3">
                Use the <strong className="text-zinc-200">Network Tools</strong> in the sidebar to add computers (PCs) and Routers to the canvas. 
                You can drag them around freely to organize your network topology.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md border border-zinc-700">Add PC</span>
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md border border-zinc-700">Add Router</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 shrink-0">
              <GitCommit className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">2. Connect Devices (Edges)</h3>
              <p className="text-zinc-400 leading-relaxed">
                Hover over any device to reveal its connection handles (small dots). 
                <strong className="text-yellow-500 font-medium"> Click and drag </strong> 
                from one handle to another device's handle to create a network cable (edge) between them.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 shrink-0">
              <Play className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">3. Run a Simulation</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                In the <strong className="text-zinc-200">Simulation Config</strong> panel:
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  Select a <strong className="text-zinc-300">Source Node</strong> (where packets start)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  Select a <strong className="text-zinc-300">Destination Node</strong> (where packets go)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  Choose a <strong className="text-zinc-300">Routing Algorithm</strong> (Dijkstra, BFS, DFS)
                </li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Click <strong className="text-yellow-500">RUN SIMULATION</strong> to watch the path illuminate and see the statistics!
              </p>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]"
          >
            Got it, let's build!
          </button>
        </div>
      </div>
    </div>
  );
}
