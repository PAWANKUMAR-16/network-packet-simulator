import { Handle, Position } from '@xyflow/react';
import { Monitor, Router as RouterIcon } from 'lucide-react';

export const PCNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg border-2 ${selected ? 'border-yellow-500 bg-zinc-800' : 'border-zinc-700 bg-zinc-900'} min-w-[120px] transition-colors`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-zinc-400" />
      <div className="flex flex-col items-center justify-center">
        <Monitor className={`h-8 w-8 mb-1 ${selected ? 'text-yellow-500' : 'text-zinc-300'}`} />
        <div className="text-sm font-bold text-zinc-100">{data.label}</div>
        {data.ip && <div className="text-xs text-yellow-500/80 font-mono mt-1 bg-black/30 px-1.5 py-0.5 rounded">{data.ip}</div>}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-zinc-400" />
      <Handle type="source" position={Position.Right} id="r" className="w-3 h-3 bg-zinc-400" />
      <Handle type="target" position={Position.Left} id="l" className="w-3 h-3 bg-zinc-400" />
    </div>
  );
};

export const RouterNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-3 shadow-md rounded-full border-2 ${selected ? 'border-yellow-500 bg-zinc-800' : 'border-zinc-700 bg-zinc-900'} w-24 h-24 flex items-center justify-center transition-colors relative`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-zinc-400" />
      <div className="flex flex-col items-center justify-center absolute">
        <RouterIcon className={`h-8 w-8 mb-1 ${selected ? 'text-yellow-500' : 'text-zinc-300'}`} />
        <div className="text-xs font-bold text-zinc-100 text-center leading-tight">{data.label}</div>
        {data.ip && <div className="text-[10px] text-yellow-500/80 font-mono mt-0.5 bg-black/30 px-1 rounded absolute -bottom-5 whitespace-nowrap">{data.ip}</div>}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-zinc-400" />
      <Handle type="source" position={Position.Right} id="r" className="w-3 h-3 bg-zinc-400" />
      <Handle type="target" position={Position.Left} id="l" className="w-3 h-3 bg-zinc-400" />
    </div>
  );
};
