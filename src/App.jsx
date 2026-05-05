import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, X, Maximize2, Ghost, Trophy, Zap, Info } from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const categories = ['All', 'Puzzle', 'Arcade', 'Classic', 'Action'];

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-primary text-black font-bold text-xl rotate-3">
              G
            </div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase font-display border-b-2 border-primary">
              Glitch Arcade
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              1,248 Players Online
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
              System: Operational
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Hero Section */}
        {!selectedGame && (
          <section className="mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden border border-border bg-card p-8 md:p-12"
            >
              <div className="relative z-10 max-w-2xl">
                <div className="mb-4 inline-block bg-secondary px-2 py-1 text-xs font-bold uppercase tracking-widest text-black">
                  New Update v2.4
                </div>
                <h2 className="mb-4 text-4xl font-extrabold uppercase md:text-6xl font-display leading-[0.9]">
                  Escape Reality, <br />
                  <span className="text-primary italic">Play Unblocked.</span>
                </h2>
                <p className="mb-8 text-lg text-zinc-400">
                  A high-speed collection of the world's best web-based games. 
                  Bypass restrictions and enjoy pure entertainment instantly.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const randomGame = gamesData[Math.floor(Math.random() * gamesData.length)];
                      setSelectedGame(randomGame);
                    }}
                    className="flex items-center gap-2 bg-primary px-6 py-3 font-bold uppercase transition-transform hover:scale-105 active:scale-95 text-black"
                  >
                    <Zap className="h-5 w-5 fill-current" />
                    Surprise Me
                  </button>
                  <button className="flex items-center gap-2 border border-white/20 px-6 py-3 font-bold uppercase transition-colors hover:bg-white/5">
                    <Info className="h-5 w-5" />
                    How to Play
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-primary/20" />
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full border border-secondary/10" />
              <Ghost className="absolute bottom-10 right-10 h-32 w-32 text-primary/5 rotate-12" />
            </motion.div>
          </section>
        )}

        {/* Filters and Search */}
        {!selectedGame && (
          <div className="sticky top-[73px] z-30 mb-8 bg-[#050505] pb-4 pt-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-black font-bold'
                        : 'border border-border text-zinc-500 hover:border-zinc-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search game..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-border bg-card py-2 pl-10 pr-4 font-mono text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Game Grid */}
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedGame(game)}
                  className="group brutalist-card cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                      <div className="rounded-full bg-primary p-4 text-black scale-0 transition-transform group-hover:scale-100">
                        <Gamepad2 className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      <span className="bg-black/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {game.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-xl font-bold uppercase group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-zinc-500 font-mono">
                      {game.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              {filteredGames.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <Ghost className="mx-auto mb-4 h-12 w-12 text-zinc-700" />
                  <p className="font-mono text-zinc-500 uppercase tracking-widest">
                    No games detected in this sector.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="flex h-10 w-10 items-center justify-center border border-border bg-card hover:bg-zinc-900 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold uppercase text-primary font-display tracking-tight">
                      {selectedGame.title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
                      <span className="text-secondary">{selectedGame.category}</span>
                      <span>•</span>
                      <span>Now Playing</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center border border-border bg-card hover:bg-zinc-900 transition-colors">
                    <Maximize2 className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center border border-border bg-card hover:bg-zinc-900 transition-colors text-primary">
                    <Trophy className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-video w-full border border-border bg-black shadow-2xl">
                {isIframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
                    <div className="mb-4 h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary animate-pulse">
                      Initializing Game Core...
                    </p>
                  </div>
                )}
                <iframe
                  src={selectedGame.iframeUrl}
                  className="h-full w-full border-none shadow-[0_0_50px_rgba(0,255,0,0.1)]"
                  title={selectedGame.title}
                  onLoad={() => setIsIframeLoading(false)}
                  allow="fullscreen; autoplay; gamepad"
                />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="mb-4 text-xl font-bold uppercase tracking-widest border-l-4 border-secondary pl-4">
                    About the game
                  </h3>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {selectedGame.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="border border-border bg-card p-4 flex-1 min-w-[200px]">
                      <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Developer</div>
                      <div className="font-bold">Original Creator</div>
                    </div>
                    <div className="border border-border bg-card p-4 flex-1 min-w-[200px]">
                      <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Last Updated</div>
                      <div className="font-bold">May 2026</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="border border-border bg-card p-6">
                    <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
                      Controls
                    </h3>
                    <ul className="space-y-3 font-mono text-sm uppercase">
                      <li className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-zinc-500">Move</span>
                        <span>Arrows / WASD</span>
                      </li>
                      <li className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-zinc-500">Action</span>
                        <span>Spacebar</span>
                      </li>
                      <li className="flex justify-between border-b border-border/50 pb-1">
                        <span className="text-zinc-500">Pause</span>
                        <span>ESC</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border border-border bg-card p-6">
                    <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">
                      Related Systems
                    </h3>
                    <div className="space-y-4">
                      {gamesData
                        .filter(g => g.id !== selectedGame.id && g.category === selectedGame.category)
                        .slice(0, 3)
                        .map(game => (
                          <button
                            key={game.id}
                            onClick={() => {
                              setSelectedGame(game);
                              setIsIframeLoading(true);
                              window.scrollTo(0, 0);
                            }}
                            className="flex w-full items-center gap-3 text-left group"
                          >
                            <img src={game.thumbnail} alt={game.title} className="h-12 w-12 object-cover border border-border group-hover:border-primary" referrerPolicy="no-referrer" />
                            <div>
                              <div className="text-sm font-bold uppercase group-hover:text-primary transition-colors">{game.title}</div>
                              <div className="text-[10px] font-mono text-zinc-500">{game.category}</div>
                            </div>
                          </button>
                        ))
                      }
                      {gamesData.filter(g => g.id !== selectedGame.id && g.category === selectedGame.category).length === 0 && (
                        <p className="text-xs font-mono text-zinc-500 italic">No other systems in this sector.</p>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-secondary py-4 font-bold uppercase text-black transition-all hover:bg-secondary/80 flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 fill-current" />
                    Global Leaderboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center bg-primary text-black font-bold rotate-3">
                  G
                </div>
                <h1 className="text-lg font-bold tracking-tighter uppercase font-display">
                  Glitch Arcade
                </h1>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The ultimate unblocked destination. Built for speed, privacy, and pure fun. 
                New games added almost daily. Join the glitch.
              </p>
            </div>
            <div>
              <h4 className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">
                Categories
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {categories.map(c => (
                  <button key={c} onClick={() => { setSelectedCategory(c); setSelectedGame(null); window.scrollTo(0,0); }} className="text-sm text-zinc-400 hover:text-white text-left transition-colors">
                    {c} Games
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">
                System Status
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Server Latency</span>
                  <span className="text-primary">12ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Uptime</span>
                  <span className="text-primary">99.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Security Phase</span>
                  <span className="text-secondary">Level 4</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-6 border-t border-border/50 pt-8 md:flex-row md:items-center md:justify-between font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            <div>© 2026 GLITCH_ARCADE_SYSTEMS. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Protocol</a>
              <a href="#" className="hover:text-white">Terms of Engagement</a>
              <a href="#" className="hover:text-white">Contact Terminal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
