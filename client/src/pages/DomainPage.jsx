import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, BookOpen } from 'lucide-react';
import { ALL_JOURNALS, PUBLISHERS } from '../data/journals';
import SubscriptionModal from '../components/SubscriptionModal';
import JournalCard from '../components/JournalCard';

const DomainPage = () => {
    const { domainName } = useParams();
    const decoded = decodeURIComponent(domainName);

    const [search, setSearch] = useState('');
    const [publisher, setPublisher] = useState('All');
    const [frequency, setFrequency] = useState('All');
    const [selectedJournal, setSelectedJournal] = useState(null);

    const domainJournals = useMemo(() =>
        ALL_JOURNALS.filter(j => j.domain === decoded),
        [decoded]
    );

    const domainPublishers = ['All', ...new Set(domainJournals.map(j => j.publisher))];
    const domainFrequencies = ['All', ...new Set(domainJournals.map(j => j.frequency))];

    const filtered = useMemo(() => {
        return domainJournals.filter(j => {
            const matchSearch = !search || j.name.toLowerCase().includes(search.toLowerCase()) || j.publisher.toLowerCase().includes(search.toLowerCase());
            const matchPublisher = publisher === 'All' || j.publisher === publisher;
            const matchFreq = frequency === 'All' || j.frequency === frequency;
            return matchSearch && matchPublisher && matchFreq;
        });
    }, [domainJournals, search, publisher, frequency]);

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-8">
                <Link to="/journals" className="flex items-center gap-1.5 text-sm text-textMuted hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Journals
                </Link>
                <span className="text-white/20">/</span>
                <span className="text-sm text-white font-medium">{decoded}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* ── Sidebar ── */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-white">{decoded}</h1>
                        <p className="text-textMuted text-sm mt-1">{domainJournals.length} journals available</p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search journals..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/20"
                        />
                    </div>

                    {/* Publisher Filter */}
                    <div>
                        <div className="text-[11px] uppercase tracking-widest font-bold text-textMuted mb-3 flex items-center gap-2">
                            <Filter className="h-3.5 w-3.5" /> Publisher
                        </div>
                        <div className="space-y-1">
                            {domainPublishers.map(p => (
                                <button key={p} onClick={() => setPublisher(p)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                        publisher === p ? 'bg-primary/20 text-primary border border-primary/30 font-medium' : 'text-textMuted hover:text-white hover:bg-white/5'
                                    }`}>{p}</button>
                            ))}
                        </div>
                    </div>

                    {/* Frequency Filter */}
                    <div>
                        <div className="text-[11px] uppercase tracking-widest font-bold text-textMuted mb-3 flex items-center gap-2">
                            <Filter className="h-3.5 w-3.5" /> Frequency
                        </div>
                        <div className="space-y-1">
                            {domainFrequencies.map(f => (
                                <button key={f} onClick={() => setFrequency(f)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                        frequency === f ? 'bg-primary/20 text-primary border border-primary/30 font-medium' : 'text-textMuted hover:text-white hover:bg-white/5'
                                    }`}>{f}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Journal Grid ── */}
                <div className="flex-1">
                    {filtered.length === 0 ? (
                        <div className="glass-card rounded-3xl p-16 text-center border-dashed border-2 border-white/10">
                            <p className="text-textMuted">No journals match your filters.</p>
                            <button onClick={() => { setSearch(''); setPublisher('All'); setFrequency('All'); }} className="mt-3 text-primary text-sm hover:text-primaryHover">Clear Filters</button>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map((journal, i) => (
                                <JournalCard key={journal.id} journal={journal} index={i} onSelect={() => setSelectedJournal(journal)} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Subscription Modal */}
            {selectedJournal && (
                <SubscriptionModal journal={selectedJournal} onClose={() => setSelectedJournal(null)} />
            )}
        </div>
    );
};

export default DomainPage;
