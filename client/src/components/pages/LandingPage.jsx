import { Link } from 'react-router-dom';
import { ArrowRight, Network, Zap, Shield, GitBranch } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      name: 'Interactive Topology',
      description: 'Build complex network architectures visually with drag-and-drop React Flow canvas.',
      icon: Network,
    },
    {
      name: 'Routing Algorithms',
      description: 'Visualize how BFS, DFS, and Dijkstra algorithms find paths through your network.',
      icon: GitBranch,
    },
    {
      name: 'Real-time Simulation',
      description: 'Watch packets travel across nodes with simulated delays, congestion, and packet loss.',
      icon: Zap,
    },
    {
      name: 'Comprehensive Stats',
      description: 'Analyze network performance with detailed charts for delivery rates, hops, and latency.',
      icon: Shield,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      <div className="text-center max-w-3xl mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl mb-6">
          Advanced Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Packet Simulator</span>
        </h1>
        <p className="mt-4 text-xl text-zinc-400 leading-relaxed">
          Design, visualize, and analyze network routing protocols in real-time. 
          Perfect for learning DSA concepts applied to computer networks.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/simulator"
            className="rounded-lg bg-yellow-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            Launch Simulator
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-zinc-900 border-2 border-zinc-800 px-8 py-4 text-lg font-semibold text-zinc-300 hover:bg-zinc-800 hover:border-yellow-500/50 hover:text-yellow-400 transition-all"
          >
            View Documentation
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {features.map((feature) => (
          <div key={feature.name} className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-zinc-800 hover:border-yellow-500/30 hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
              <feature.icon className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">{feature.name}</h3>
            <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
