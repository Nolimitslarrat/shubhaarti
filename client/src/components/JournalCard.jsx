import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

const JournalCard = ({ journal, index = 0, onSelect }) => {
    const { cart } = useCart();
    const isInCart = cart.some(item => item.id === journal.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="glass-card rounded-2xl flex flex-col h-full group hover:border-primary/40 transition-all duration-300"
        >
            <div className="p-6 flex flex-col h-full">
                {/* Top row */}
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 text-white/60 rounded-full border border-white/[0.06]">
                        {journal.domain}
                    </span>
                    <div className="text-right">
                        <div className="text-[10px] text-textMuted">Impact Factor</div>
                        <div className="text-sm font-bold text-white mt-0.5">{journal.impactFactor}</div>
                    </div>
                </div>

                {/* Name & Publisher */}
                <h3 className="text-base font-bold text-white leading-snug mb-1.5 line-clamp-2">{journal.name}</h3>
                <p className="text-xs font-semibold text-primary mb-1">by {journal.publisher}</p>
                {journal.issn && <p className="text-[11px] text-textMuted mb-4">ISSN: {journal.issn}</p>}

                {/* Description */}
                <p className="text-xs text-textMuted leading-relaxed line-clamp-3 flex-grow">{journal.description}</p>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/70"></span>
                        <span className="text-[11px] text-textMuted">{journal.frequency}</span>
                    </div>

                    <button
                        onClick={onSelect}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                            isInCart
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                                : 'bg-primary text-white hover:bg-primaryHover shadow-[0_0_15px_-5px_rgba(124,58,237,0.5)]'
                        }`}
                        disabled={isInCart}
                    >
                        {isInCart
                            ? <><Check className="h-3.5 w-3.5" /> Selected</>
                            : <><ShoppingCart className="h-3.5 w-3.5" /> Subscribe</>
                        }
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default JournalCard;
