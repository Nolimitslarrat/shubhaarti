import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, LibraryBig, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex flex-shrink-0 items-center justify-center">
                    <LibraryBig className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-white">My Selection</h1>
                    <p className="text-textMuted text-sm">{cart.length} journal{cart.length !== 1 ? 's' : ''} selected for institutional subscription.</p>
                </div>
            </div>

            <div className="mt-10">
                {cart.length === 0 ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-16 text-center rounded-[2rem] border-dashed border-2 border-white/10 flex flex-col items-center">
                        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <LibraryBig className="h-10 w-10 text-white/20" />
                        </div>
                        <p className="text-textMuted text-xl mb-8 font-light">Your selection list is empty.</p>
                        <Link to="/journals" className="inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl text-white bg-primary hover:bg-primaryHover transition-all">
                            Browse Journals
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <div className="glass-card rounded-[2rem] overflow-hidden">
                            <ul className="divide-y divide-white/5">
                                <AnimatePresence>
                                    {cart.map((item) => (
                                        <motion.li
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            key={item.cartItemId}
                                            className="p-6 sm:p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                                    <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-white/10 text-textMuted rounded">
                                                        {item.domain}
                                                    </span>
                                                    <span className="text-xs text-primary font-medium">{item.publisher}</span>
                                                </div>
                                                <h3 className="text-base font-bold text-white leading-snug truncate">{item.name}</h3>
                                                {item.issn && <p className="text-xs text-textMuted mt-0.5">ISSN: {item.issn}</p>}

                                                {/* Subscription details tags */}
                                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                                                        <Tag className="h-3 w-3" /> {item.subscriptionYear}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                        {item.subscriptionType}
                                                    </span>
                                                    {item.subscriptionIssue && item.subscriptionIssue !== 'Full Year' && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                                                            Issue: {item.subscriptionIssue}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.cartItemId)}
                                                className="text-white/30 hover:text-red-400 transition-colors p-3 rounded-xl hover:bg-red-500/10"
                                                title="Remove"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 glass-card p-6 sm:p-8 rounded-[2rem]">
                            <p className="text-textMuted text-sm max-w-sm text-center sm:text-left">
                                Pricing and license terms will be confirmed after your quote request is reviewed.
                            </p>
                            <Link to="/quote" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 font-semibold text-base rounded-xl text-white bg-primary hover:bg-primaryHover transition-all shadow-[0_0_30px_-10px_rgba(124,58,237,0.6)]">
                                Request Quote <ArrowRight className="ml-3 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
