import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Send, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const QuotePage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        institutionName: '',
        contactPerson: '',
        email: '',
        phone: '',
        notes: ''
    });
    
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Please select at least one journal before requesting a quote.');
            return;
        }

        setStatus('loading');

        try {
            // Get unique journal IDs from cart (cart items have journalId or id)
            const journalIds = [...new Set(cart.map(item => item.journalId || item.id))];
            
            await axios.post('/api/quotations', {
                ...formData,
                selectedJournals: journalIds
            });

            setStatus('success');
            clearCart();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-32 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="glass-card p-16 rounded-[3rem] flex flex-col items-center relative z-10">
                    <div className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
                        <CheckCircle className="h-12 w-12 text-green-400" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-white mb-4">Request Received</h2>
                    <p className="text-textMuted text-lg mb-10 max-w-md">
                        Thank you for your interest. Our academic licensing team is reviewing your selection and will contact you via email shortly with a tailored institutional quotation.
                    </p>
                    <button onClick={() => navigate('/')} className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-xl transition-all font-medium">
                        Return to Homepage
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-16">
            <div className="flex items-center gap-4 mb-2 justify-center">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                </div>
            </div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white mb-3">Institutional Details</h1>
                <p className="text-textMuted">Provide your contact details to receive a customized quote for {cart.length} selected journals.</p>
            </div>
            
            <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="glass-card p-8 sm:p-12 rounded-[3rem]">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-textMuted">Institution Name</label>
                            <input 
                                required
                                type="text" 
                                placeholder="eg. Stanford University"
                                value={formData.institutionName}
                                onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-textMuted">Contact Person</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Name and Title"
                                value={formData.contactPerson}
                                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-textMuted">Email Address</label>
                            <input 
                                required
                                type="email" 
                                placeholder="official.edu email preferred"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-textMuted">Phone Number</label>
                            <input 
                                required
                                type="tel" 
                                placeholder="+1 234 567 8900"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-textMuted">Additional Requirements (Optional)</label>
                        <textarea 
                            rows="4"
                            placeholder="Specific IP ranges, multisite licensing needs, etc."
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-white/20"
                        ></textarea>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            ) : (
                                <><Send className="h-5 w-5" /> Submit Institutional Request</>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default QuotePage;
