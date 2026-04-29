import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SUBSCRIPTION_YEARS, SUBSCRIPTION_TYPES, SUBSCRIPTION_ISSUES } from '../data/journals';

const SubscriptionModal = ({ journal, onClose }) => {
    const { cart, addToCart } = useCart();
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const [issue, setIssue] = useState('');
    const [error, setError] = useState('');
    const [added, setAdded] = useState(false);

    const alreadyInCart = (y, t, i) => {
        const id = `${journal.id}-${y}-${t}-${i}`;
        return cart.some(item => item.cartItemId === id);
    };

    const handleAdd = () => {
        if (!year) { setError('Please select a Subscription Year.'); return; }
        if (!type) { setError('Please select a Type of Journal.'); return; }
        if (journal.hasIssues && !issue) { setError('Please select an Issue.'); return; }
        setError('');

        const finalIssue = journal.hasIssues ? issue : 'Full Year';

        if (alreadyInCart(year, type, finalIssue)) {
            setError('This exact selection is already in your cart.');
            return;
        }

        addToCart(journal, {
            subscriptionYear: year,
            subscriptionType: type,
            subscriptionIssue: finalIssue,
        });
        setAdded(true);
    };

    const Select = ({ label, value, onChange, options, placeholder }) => (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-textMuted">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => { onChange(e.target.value); setError(''); }}
                    className="w-full appearance-none bg-black/30 border border-white/10 rounded-xl py-3 px-4 pr-10 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted pointer-events-none" />
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative z-10 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                        {/* Purple glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/20 blur-[60px] pointer-events-none" />

                        <button onClick={onClose} className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-textMuted hover:text-white transition-colors">
                            <X className="h-4 w-4" />
                        </button>

                        {!added ? (
                            <>
                                {/* Journal info */}
                                <div className="mb-7">
                                    <div className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/20 mb-3">
                                        {journal.domain}
                                    </div>
                                    <h2 className="text-lg font-extrabold text-white leading-tight">{journal.name}</h2>
                                    <p className="text-xs text-textMuted mt-1">{journal.publisher} &nbsp;|&nbsp; ISSN: {journal.issn}</p>
                                </div>

                                <div className="space-y-5">
                                    <Select
                                        label="Subscription Year"
                                        value={year}
                                        onChange={setYear}
                                        options={SUBSCRIPTION_YEARS}
                                        placeholder="Choose an option"
                                    />
                                    <Select
                                        label="Type of Journal"
                                        value={type}
                                        onChange={setType}
                                        options={SUBSCRIPTION_TYPES}
                                        placeholder="Choose an option"
                                    />
                                    {journal.hasIssues && (
                                        <Select
                                            label="Issue"
                                            value={issue}
                                            onChange={setIssue}
                                            options={SUBSCRIPTION_ISSUES}
                                            placeholder="Choose an option"
                                        />
                                    )}

                                    {error && (
                                        <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>
                                    )}

                                    <button
                                        onClick={handleAdd}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Selection
                                    </button>
                                </div>
                            </>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-4">
                                <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-5">
                                    <ShoppingCart className="h-8 w-8 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Added to Selection!</h3>
                                <p className="text-textMuted text-sm mb-1">{year} &nbsp;·&nbsp; {type}</p>
                                {journal.hasIssues && <p className="text-textMuted text-sm mb-6">Issue: {issue}</p>}
                                <button onClick={onClose} className="px-6 py-2.5 border border-white/15 hover:bg-white/5 text-white rounded-xl text-sm font-medium transition-colors">
                                    Continue Browsing
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SubscriptionModal;
