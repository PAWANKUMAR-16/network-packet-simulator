import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Route, Clock, Share2, Target, AlertTriangle, CheckCircle2, ServerCrash, Send } from 'lucide-react';

export default function StatisticsPanel({ stats, path, packets }) {
  if (!stats) return null;

  // Use gold shades for chart data
  const data = [
    { name: 'Sent', value: parseInt(stats.sent), color: '#fbbf24' },      // yellow-400
    { name: 'Delivered', value: parseInt(stats.delivered), color: '#eab308' }, // yellow-500
    { name: 'Dropped', value: parseInt(stats.dropped), color: '#ca8a04' },    // yellow-600
  ];

  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-yellow-500" />
          Simulation Results
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
          <Route className="h-4 w-4 text-zinc-500" />
          <span className="text-zinc-400">Path:</span>
          <span className="text-yellow-500">
            {path.join(' → ')}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-1">
          <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 hover:border-yellow-500/30 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Avg Delay</h3>
            </div>
            <div className="text-3xl font-black text-zinc-100">{stats.averageDelay}<span className="text-lg font-semibold text-zinc-500 ml-1">ms</span></div>
          </div>
          
          <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 hover:border-yellow-500/30 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <Share2 className="h-4 w-4 text-yellow-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Total Hops</h3>
            </div>
            <div className="text-3xl font-black text-zinc-100">{stats.hops}</div>
          </div>
          
          <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 hover:border-yellow-500/30 transition-colors col-span-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <CheckCircle2 className="h-4 w-4 text-yellow-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Delivery Rate</h3>
              </div>
              <div className="text-4xl font-black text-yellow-500">{stats.deliveryRate}%</div>
            </div>
            {stats.dropped > 0 && (
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-red-400 mb-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-xs font-bold uppercase">Packet Loss</span>
                </div>
                <div className="text-lg font-bold text-red-500">{stats.dropped} dropped</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-48 lg:col-span-2 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#a1a1aa', fontWeight: 500}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#a1a1aa'}} />
              <Tooltip 
                cursor={{fill: '#27272a'}}
                contentStyle={{backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #3f3f46', color: '#f4f4f5'}}
                itemStyle={{color: '#eab308'}}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Packet Trace Log */}
      {packets && packets.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Send className="h-4 w-4 text-yellow-500" />
            Packet Trace Log
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {packets.map((packet) => (
              <div 
                key={packet.id} 
                className={`p-3 rounded-lg border text-sm flex flex-col gap-1 transition-colors ${
                  packet.status === 'delivered' 
                    ? 'bg-zinc-950/50 border-zinc-800 hover:border-yellow-500/30' 
                    : 'bg-red-950/20 border-red-900/50 hover:border-red-500/50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-zinc-100">Packet #{packet.id + 1}</span>
                  {packet.status === 'delivered' ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Delivered</span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">Dropped</span>
                  )}
                </div>
                
                {packet.status === 'delivered' ? (
                  <div className="text-zinc-400 text-xs flex items-center justify-between">
                    <span>Latency:</span>
                    <span className="font-mono text-yellow-500">{packet.delay}ms</span>
                  </div>
                ) : (
                  <div className="text-zinc-400 text-xs flex items-center justify-between">
                    <span>Lost at:</span>
                    <span className="font-mono text-red-400 flex items-center gap-1">
                      <ServerCrash className="h-3 w-3" />
                      {packet.dropLocation}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
