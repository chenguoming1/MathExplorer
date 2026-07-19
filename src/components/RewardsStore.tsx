import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, Award, Sparkles, Check, Lock, Heart, Star } from 'lucide-react';
import { rewardCatalog } from '../data/curriculum';
import { RewardItem, StudentProfile } from '../types';

interface RewardsStoreProps {
  profile: StudentProfile;
  onPurchaseItem: (item: RewardItem) => void;
  onEquipAvatar: (avatarEmoji: string) => void;
  onEquipPet: (petEmoji: string) => void;
}

export const RewardsStore: React.FC<RewardsStoreProps> = ({
  profile,
  onPurchaseItem,
  onEquipAvatar,
  onEquipPet
}) => {
  const [activeTab, setActiveTab] = useState<'avatar' | 'pet' | 'sticker'>('avatar');
  const [petHappyTime, setPetHappyTime] = useState(false);

  const filteredCatalog = rewardCatalog.filter(item => item.type === activeTab);

  const isPurchased = (item: RewardItem) => {
    if (item.type === 'avatar') return profile.purchasedAvatars.includes(item.value);
    if (item.type === 'pet') return profile.purchasedAvatars.includes(item.value); // We store both in purchased array or handle separately
    return profile.purchasedStickers.includes(item.value);
  };

  const isEquipped = (item: RewardItem) => {
    if (item.type === 'avatar') return profile.selectedAvatar === item.value;
    if (item.type === 'pet') return profile.selectedPet === item.value;
    return false;
  };

  const handleInteractWithPet = () => {
    setPetHappyTime(true);
    setTimeout(() => setPetHappyTime(false), 2000);
  };

  return (
    <div id="rewards-store-panel" className="space-y-6">
      
      {/* Pet Showcase Station */}
      {profile.selectedPet && (
        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 z-10 text-center md:text-left">
            <span className="text-xs bg-indigo-400 text-indigo-900 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Math Companion Pet
            </span>
            <h3 className="text-2xl font-black">
              {profile.selectedPet === '🐉' ? 'Sparky the Dragon' :
               profile.selectedPet === '🐧' ? 'Pip the Penguin' :
               profile.selectedPet === '🦎' ? 'Bubbles the Axolotl' :
               profile.selectedPet === '🦅' ? 'Aero the Phoenix' : 'My Companion'}
            </h3>
            <p className="text-sm text-indigo-100 max-w-sm">
              Your pet grows stronger every time you get math questions correct! Give them some attention to play.
            </p>
            <button
              onClick={handleInteractWithPet}
              className="mt-2 px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5 mx-auto md:mx-0 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" /> Pet Companion
            </button>
          </div>

          {/* Interactive Pet Visualizer with motion animations */}
          <div className="relative flex justify-center items-center w-36 h-36 bg-white/10 rounded-2xl border border-white/20">
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.selectedPet + (petHappyTime ? '-happy' : '-idle')}
                initial={{ scale: 0.8, y: 10 }}
                animate={petHappyTime 
                  ? { scale: [1, 1.25, 0.9, 1.2, 1], y: [0, -15, 5, -5, 0], rotate: [0, 10, -10, 5, 0] }
                  : { y: [0, -6, 0] }
                }
                transition={petHappyTime 
                  ? { duration: 1.5, ease: 'easeInOut' }
                  : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                }
                className="text-7xl select-none filter drop-shadow-md cursor-pointer"
                onClick={handleInteractWithPet}
              >
                {profile.selectedPet}
              </motion.span>
            </AnimatePresence>

            {petHappyTime && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute text-xs bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-md shadow-md"
              >
                Yippee! ✨
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Main Shop Catalog */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800">The Math Reward Store</h3>
            <p className="text-xs text-slate-400 font-bold">Use your hard-earned coins to unlock funny characters and stickers!</p>
          </div>

          {/* Coins balance indicator */}
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl px-4 py-2 flex items-center space-x-2 w-fit">
            <Coins className="w-5 h-5 text-amber-500 fill-amber-300 animate-bounce" />
            <span className="text-lg font-black">{profile.coins}</span>
            <span className="text-xs font-bold text-amber-600">coins</span>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
          {(['avatar', 'pet', 'sticker'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-black capitalize rounded-xl transition ${activeTab === tab ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {tab === 'avatar' ? '🎭 Avatars' : tab === 'pet' ? '🦄 Pets' : '🏆 Stickers'}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCatalog.map((item) => {
            const owned = isPurchased(item);
            const equipped = isEquipped(item);
            const canAfford = profile.coins >= item.cost;

            return (
              <div 
                key={item.id} 
                className={`border rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between ${
                  equipped 
                    ? 'border-indigo-500 bg-indigo-50/25 ring-1 ring-indigo-200' 
                    : owned 
                      ? 'border-slate-200 bg-white hover:border-indigo-200' 
                      : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                {/* Visual Circle card */}
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-xs flex items-center justify-center text-4xl mx-auto select-none">
                    {item.value}
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-extrabold text-slate-800">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 font-bold leading-tight mt-1">{item.description}</p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-4 pt-3 border-t border-dashed border-slate-100 flex items-center justify-between">
                  {owned ? (
                    item.type === 'sticker' ? (
                      <span className="text-[11px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 flex items-center gap-1 mx-auto">
                        <Check className="w-3.5 h-3.5" /> Added to Album
                      </span>
                    ) : (
                      <button
                        onClick={() => item.type === 'avatar' ? onEquipAvatar(item.value) : onEquipPet(item.value)}
                        className={`w-full py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                          equipped 
                            ? 'bg-indigo-500 text-white font-extrabold cursor-default' 
                            : 'bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        {equipped ? '✓ Equipped' : 'Equip'}
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => onPurchaseItem(item)}
                      disabled={!canAfford}
                      className={`w-full py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        canAfford 
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {!canAfford && <Lock className="w-3 h-3 text-slate-300" />}
                      <Coins className="w-3.5 h-3.5 shrink-0" />
                      <span>Buy for {item.cost}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Album Showcase for Stickers */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Award className="text-amber-500 w-5 h-5 animate-pulse" /> My Sticker Achievement Album
        </h3>
        <p className="text-xs text-slate-400 font-bold">Collect digital stickers from the store. Can you fill your album board?</p>
        
        <div className="flex flex-wrap gap-3 justify-center bg-slate-50 p-4 rounded-2xl border border-slate-100 min-h-[72px]">
          {profile.purchasedStickers.length === 0 ? (
            <div className="text-xs text-slate-400 font-bold italic py-2">No stickers purchased yet. Take some quizzes to earn coins!</div>
          ) : (
            profile.purchasedStickers.map((stickerVal, sIdx) => {
              const stickerDetails = rewardCatalog.find(item => item.value === stickerVal);
              return (
                <motion.div
                  key={sIdx}
                  whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
                  className="w-12 h-12 bg-white rounded-xl border border-amber-200 flex items-center justify-center text-2xl shadow-xs cursor-pointer relative"
                  title={stickerDetails?.name || 'Sticker'}
                >
                  {stickerVal}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
