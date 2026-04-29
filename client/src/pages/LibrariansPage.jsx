import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, FileText, BookOpen, Users2 } from 'lucide-react';

const BENEFITS = [
    'Consolidated annual invoicing for all journals',
    'Dedicated relationship manager',
    'Institutional IP-based access setup',
    'Flexible payment terms (quarterly / annual)',
    'COUNTER-compliant usage statistics',
    'Seamless renewal process with advance reminders',
];

const LibrariansPage = () => (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">For Librarians</p>
                    <h1 className="text-4xl font-extrabold text-white">Empower Your Institution's Library</h1>
                </div>
            </div>

            <p className="text-xl text-textMuted max-w-2xl mb-14 leading-relaxed font-light">
                We partner with academic libraries across India and globally to deliver seamless, cost-efficient journal subscriptions — so your team can focus on research, not paperwork.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="glass-card rounded-3xl p-10">
                    <h2 className="text-2xl font-bold text-white mb-6">What You Get</h2>
                    <ul className="space-y-4">
                        {BENEFITS.map((b) => (
                            <li key={b} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-textMuted text-sm leading-relaxed">{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-5">
                    <div className="glass-card rounded-3xl p-8">
                        <Users2 className="h-8 w-8 text-secondary mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Dedicated Support Team</h3>
                        <p className="text-textMuted text-sm leading-relaxed">Your institution gets a named account manager available via email and phone for all queries — from first quote to final access.</p>
                    </div>
                    <div className="glass-card rounded-3xl p-8">
                        <FileText className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Proforma & Trial Access</h3>
                        <p className="text-textMuted text-sm leading-relaxed">Request a detailed proforma invoice with journal-wise pricing, or arrange a trial period for specific titles before committing.</p>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to get started?</h3>
                    <p className="text-textMuted text-sm">Explore our catalog and submit a quote request. Our team will respond within 24 hours.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <Link to="/explore" className="px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-xl font-semibold text-sm transition-all">
                        Browse Journals
                    </Link>
                    <Link to="/quote" className="px-6 py-3 border border-white/15 hover:bg-white/5 text-white rounded-xl font-semibold text-sm transition-colors">
                        Get Quote
                    </Link>
                </div>
            </div>
        </motion.div>
    </div>
);

export default LibrariansPage;
