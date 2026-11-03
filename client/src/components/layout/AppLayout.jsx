import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-zinc-100 selection:bg-yellow-500/30">
      <Navbar />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto flex flex-col p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
