import { Settings2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NodeProperties({ selectedNode, onUpdateNode }) {
  const [label, setLabel] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setIp(selectedNode.data.ip || '');
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const handleSave = () => {
    onUpdateNode(selectedNode.id, { label, ip });
  };

  return (
    <div className="bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-800 mb-4 animate-in fade-in slide-in-from-top-4">
      <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-yellow-500" />
        Node Properties
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Node ID</label>
          <div className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-500 rounded-lg p-2.5 text-sm cursor-not-allowed">
            {selectedNode.id} ({selectedNode.type === 'input' || selectedNode.type === 'output' ? 'PC' : 'Router'})
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Device Name</label>
          <input 
            type="text" 
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 text-sm outline-none transition-shadow"
            placeholder="e.g. Finance PC"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">IP Address</label>
          <input 
            type="text" 
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 text-sm outline-none transition-shadow font-mono"
            placeholder="192.168.1.10"
          />
        </div>
        
        <button 
          onClick={handleSave}
          className="w-full py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-yellow-500 font-bold flex items-center justify-center gap-2 transition-colors border border-zinc-700 hover:border-yellow-500/50"
        >
          <Save className="h-4 w-4" />
          Update Device
        </button>
      </div>
    </div>
  );
}
