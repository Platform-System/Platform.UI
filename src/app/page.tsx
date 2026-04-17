'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { STORIES, FEED_POSTS } from '@/data/mockData';

export default function HomeFeed() {
  return (
    <div className="max-w-3xl mx-auto w-full pb-20 md:pb-8 flex flex-col gap-10 px-4 md:px-0">
      
      {/* Stories Section - Horizontal Scroll */}
      <section className="pt-2">
        <h2 className="text-lg font-bold tracking-tight text-white mb-4 px-2">Trending Now</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-2 snap-x snap-mandatory">
          
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group snap-start">
            <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-400 transition-all duration-300 relative overflow-hidden">
              <Icon icon="solar:add-circle-linear" width="32" height="32" className="text-slate-400 group-hover:text-cyan-400 transition-colors z-10" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide">Create</span>
          </div>

          {/* Story Circles */}
          {STORIES.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group snap-start">
              <div className={clsx(
                "w-[72px] h-[72px] rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105",
                story.hasUnseen 
                  ? "bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                  : "bg-slate-800"
              )}>
                <img 
                  src={story.avatar} 
                  alt={story.user} 
                  className="w-full h-full rounded-full object-cover border-[3px] border-[#0a0a0f]"
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-300 tracking-wide">{story.user}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Feed - TikTok / Immersive Style */}
      <section className="flex flex-col gap-10">
        {FEED_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

    </div>
  );
}

function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <article className="glass-card rounded-[2rem] overflow-hidden flex flex-col group relative">
      {/* Media Content - Full Immersive */}
      <div className="w-full aspect-[4/5] sm:aspect-[4/5] bg-slate-900 relative group cursor-pointer" onDoubleClick={handleDoubleTap}>
        <img src={post.content} alt="Post content" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/40 opacity-80"></div>
        
        {/* Double Tap Heart Animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <Icon 
              icon="solar:heart-bold" 
              width="120" 
              height="120" 
              className="text-pink-500 animate-bounce drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]"
            />
          </div>
        )}

        {/* Floating Side Actions (TikTok Style) */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); setLikesCount(liked ? likesCount - 1 : likesCount + 1); }}
            className="flex flex-col items-center gap-1 group/btn"
          >
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all group-hover/btn:scale-110">
              <Icon icon={liked ? "solar:heart-bold" : "solar:heart-linear"} width="28" className={clsx("transition-colors", liked ? "text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "text-white")} />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-md">{likesCount >= 1000 ? (likesCount/1000).toFixed(1)+'k' : likesCount}</span>
          </button>

          <button className="flex flex-col items-center gap-1 group/btn">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all group-hover/btn:scale-110">
              <Icon icon="solar:chat-round-dots-linear" width="28" className="text-white" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-md">{post.comments}</span>
          </button>

          <button className="flex flex-col items-center gap-1 group/btn">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all group-hover/btn:scale-110">
              <Icon icon="solar:rounded-magnifer-linear" width="28" className="text-white" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-md">Inspire</span>
          </button>

          <button className="flex flex-col items-center gap-1 group/btn mt-2">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all group-hover/btn:scale-110 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20"></div>
              <Icon icon="solar:forward-linear" width="28" className="text-white relative z-10" />
            </div>
          </button>
        </div>

        {/* Content Info overlay */}
        <div className="absolute left-0 bottom-0 right-20 p-6 z-20 flex flex-col justify-end">
          <div className="flex items-center gap-1.5 mb-3 cursor-pointer group/user">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/20 group-hover/user:border-cyan-400 transition-colors" />
            <div>
              <h3 className="text-sm font-bold text-white drop-shadow-md flex items-center gap-1">{post.author.name} <Icon icon="solar:verify-check-bold" className="text-cyan-400" /></h3>
              <p className="text-xs text-slate-300 drop-shadow-md">{post.author.handle}</p>
            </div>
            <button className="ml-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white text-black hover:bg-cyan-400 hover:text-[#0a0a0f] transition-colors">Follow</button>
          </div>
          
          <div className="text-sm text-slate-100 drop-shadow-md max-w-md line-clamp-3 leading-relaxed">
            {post.caption}
          </div>
          
          {/* Music track ticker */}
          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-300 bg-black/40 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 cursor-pointer hover:bg-black/60 transition-colors">
            <Icon icon="solar:music-note-bold" className="text-cyan-400 animate-pulse" />
            <span className="marquee whitespace-nowrap overflow-hidden max-w-[150px]">Original Audio - {post.author.name}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
