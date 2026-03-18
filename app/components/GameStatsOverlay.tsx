// app/components/GameStatsOverlay.tsx v2.3.1
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RefreshCw, SkipForward } from 'lucide-react';
import { Song } from '../lib/songs';

interface GameStatsOverlayProps {
  song: Song;
  score: {
    perfect: number;
    good: number;
    miss: number;
    wrong: number;
    currentScore: number;
  };
  t: Record<string, string>;
  recentHits?: { timeDiff: number; timestamp: number; type: string }[];
  controls?: {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    onReset: () => void;
    onRetry: () => void;
    onTogglePlay: () => void;
    onNextSong: () => void;
  };
}

export function GameStatsOverlay({ song, score, t, controls }: GameStatsOverlayProps) {
  return (
    <div id="game-stats-overlay" className="pointer-events-none absolute inset-0 flex flex-col p-4 md:p-8">
      <div className="flex w-full relative">
        {/* Left side: Song info & Controls */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-md pointer-events-auto flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={song.id}
            className="space-y-1"
          >
            <h2 className="text-2xl md:text-5xl font-black theme-text-primary text-glow tracking-tighter leading-none truncate">
              {t[`song_${song.id}`] || song.title}
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-sm md:text-lg text-indigo-400 font-bold uppercase tracking-widest opacity-90 truncate">
                {t[`artist_${song.artist.toLowerCase()}`] || song.artist}
              </p>
            </div>
          </motion.div>

          {/* Simplified Controls */}
          {controls && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border theme-border shadow-lg self-start">
                <button onClick={controls.onTogglePlay} className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-400 transition-all">
                  {controls.isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                </button>
                <div className="w-px h-4 bg-white/10 mx-0.5"></div>
                <button onClick={controls.onRetry} className="p-1.5 theme-text-secondary hover:theme-text-primary rounded-full hover:bg-white/10 transition-colors" title={t.retry}>
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button onClick={controls.onNextSong} className="p-1.5 theme-text-secondary hover:theme-text-primary rounded-full hover:bg-white/10 transition-colors" title={t.nextSong}>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Progress Mini Bar */}
              <div className="flex items-center gap-3 w-48">
                <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden border theme-border">
                  <motion.div 
                    className="h-full bg-indigo-500" 
                    animate={{ width: `${(controls.currentTime / (controls.duration || 1)) * 100}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  />
                </div>
                <span className="text-[10px] font-mono theme-text-secondary">
                  {Math.floor(controls.currentTime / 60)}:{(controls.currentTime % 60).toFixed(0).padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Score, Stats */}
        <div className="absolute bottom-36 md:bottom-40 right-4 flex flex-col items-end pointer-events-auto gap-4 max-w-[60%]">
          <div className="flex flex-col items-end w-full">
            <div className="text-[10px] uppercase tracking-[0.3em] theme-text-secondary font-black mb-1">{t.currentScore}</div>
            <div className="text-4xl md:text-7xl font-black theme-text-primary tabular-nums tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] break-all text-right leading-none">
              {score.currentScore.toLocaleString()}
            </div>
          </div>

          {/* Stats - Horizontal Layout */}
          <div className="flex flex-wrap justify-end gap-2 mt-2">
            {[
              { key: 'perfect', label: t.perfect, value: score.perfect, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { key: 'good', label: t.good, value: score.good, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { key: 'miss', label: t.miss, value: score.miss, color: 'text-amber-400', bg: 'bg-amber-400/10' },
              { key: 'wrong', label: t.wrong, value: score.wrong, color: 'text-rose-400', bg: 'bg-rose-400/10' },
            ].map((stat) => (
              <div key={stat.key} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border theme-border ${stat.bg} backdrop-blur-md min-w-[80px]`}>
                <span className={`text-[8px] md:text-[9px] uppercase font-black ${stat.color}`}>{stat.label}</span>
                <span className="text-xs md:text-sm font-black theme-text-primary tabular-nums">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
