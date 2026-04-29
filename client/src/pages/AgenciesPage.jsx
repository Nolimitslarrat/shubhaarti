import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, HandshakeIcon, Percent, BarChart3 } from 'lucide-react';

const PERKS = [
    'Competitive agency discounts on all titles',
    'Dedicated partnership account manager',
    'Co-branded marketing collateral provided',
    'Real-time order tracking and invoicing portal',
    'Priority allocation for high-demand journals',
    'Monthly performance reports and analytics',
];

const AgenciesPage = () => (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-2xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-7 w-7 text-secondary" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">For Agencies</p>
                    <h1 className="text-4xl font-extrabold text-white">Partner with Subharti Agency</h1>
                </div>
            </div>

            <p className="text-xl text-textMuted max-w-2xl mb-14 leading-relaxed font-light">
                Join our global network of subscription agencies to offer world-class academic journals to your institutional clients — with competitive margins and full backend support.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mb-12">
                {[
                    { icon: Percent, title: 'Competitive Discounts', text: 'Access exclusive agency-tier pricing not available to end users.', color: 'text-yellow-400 bg-yellow-400/10' },
                    { icon: BarChart3, title: 'Marketing Support', text: 'Get co-branded brochures, email templates and campaign assets.', color: 'text-secondary bg-secondary/10' },
                    { icon: TrendingUp, title: 'Dedicated Support', text: 'Your dedicated desk for all technical, billing and access queries.', color: 'text-primary bg-primary/10' },
                ].map(({ icon: Icon, title, text, color }) => (
                    <div key={title} className="glass-card rounded-2xl p-8">
                        <div className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center mb-5`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                        <p className="text-textMuted text-sm leading-relaxed">{text}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card rounded-3xl p-10 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Agency Partner Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    {PERKS.map((p) => (
                        <div key={p} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-textMuted text-sm">{p}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
                style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.07), rgba(124,58,237,0.07))' }}>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Interested in a Partnership?</h3>
                    <p className="text-textMuted text-sm">Contact our agency desk to discuss terms and get your partner credentials.</p>
                </div>
                <Link to="/quote" className="flex-shrink-0 px-8 py-3.5 bg-secondary hover:bg-sky-500 text-white rounded-xl font-semibold text-sm transition-all shadow-[0_0_20px_-5px_rgba(14,165,233,0.4)]">
                    Apply to Partner
                </Link>
            </div>
        </motion.div>
    </div>
);

export default AgenciesPage;
