import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { ALL_JOURNALS, DOMAINS, PUBLISHERS } from '../data/journals';
import JournalCard from '../components/JournalCard';
import SubscriptionModal from '../components/SubscriptionModal';
import { motion } from 'framer-motion';

const FREQUENCIES = ['All', 'Weekly', 'Biweekly', 'Monthly', 'Bimonthly', 'Quarterly', 'Biannual'];

const JournalsPage = () => {
    const [search, setSearch] = useState('');
    const [domain, setDomain] = useState('All');
    const [publisher, setPublisher] = useState('All');
    const [frequency, setFrequency] = useState('All');
    const [selectedJournal, setSelectedJournal] = useState(null);

    const filtered = useMemo(() => {
        return ALL_JOURNALS.filter(j => {
            const matchSearch = !search || j.name.toLowerCase().includes(search.toLowerCase()) || j.publisher.toLowerCase().includes(search.toLowerCase()) || (j.issn && j.issn.includes(search));
            const matchDomain = domain === 'All' || j.domain === domain;
            const matchPub = publisher === 'All' || j.publisher === publisher;
            const matchFreq = frequency === 'All' || j.frequency === frequency;
            return matchSearch && matchDomain && matchPub && matchFreq;
        });
    }, [search, domain, publisher, frequency]);

    const clearFilters = () => { setSearch(''); setDomain('All'); setPublisher('All'); setFrequency('All'); };

    const hasFilters = search || domain !== 'All' || publisher !== 'All' || frequency !== 'All';

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* ── Sidebar ── */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">Subscribe Journals</h1>
                        <p className="text-textMuted text-sm mt-1">{ALL_JOURNALS.length} journals available</p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name, ISSN..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/20"
                        />
                    </div>

                    {/* Domain */}
                    <div>
                        <div className="text-[11px] uppercase tracking-widest font-bold text-textMuted mb-3 flex items-center gap-2">
                            <Filter className="h-3.5 w-3.5" /> Domain
                        </div>
                        <div className="space-y-1">
                            {['All', ...DOMAINS.map(d => d.name)].map(d => (
                                <button key={d} onClick={() => setDomain(d)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                        domain === d ? 'bg-primary/20 text-primary border border-primary/30 font-medium' : 'text-textMuted hover:text-white hover:bg-white/5'
                                    }`}>{d}</button>
                            ))}
                        </div>
                    </div>

                    {/* Publisher */}
                    <div>
                        <div className="text-[11px] uppercase tracking-widest font-bold text-textMuted mb-3 flex items-center gap-2">
                            <Filter className="h-3.5 w-3.5" /> Publisher
                        </div>
                        <div className="relative">
                            <select value={publisher} onChange={e => setPublisher(e.target.value)}
                                className="w-full appearance-none bg-white/[0.03] border border-white/10 rounded-xl py-2.5 px-3 pr-8 text-sm text-white focus:outline-none focus:border-primary transition-all cursor-pointer">
                                <option value="All">All Publishers</option>
                                {PUBLISHERS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted pointer-events-none" />
                        </div>
                    </div>

                    {/* Frequency */}
                    <div>
                        <div className="text-[11px] uppercase tracking-widest font-bold text-textMuted mb-3 flex items-center gap-2">
                            <Filter className="h-3.5 w-3.5" /> Frequency
                        </div>
                        <div className="space-y-1">
                            {FREQUENCIES.map(f => (
                                <button key={f} onClick={() => setFrequency(f)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                        frequency === f ? 'bg-primary/20 text-primary border border-primary/30 font-medium' : 'text-textMuted hover:text-white hover:bg-white/5'
                                    }`}>{f}</button>
                            ))}
                        </div>
                    </div>

                    {hasFilters && (
                        <button onClick={clearFilters} className="w-full text-center text-sm text-primary hover:text-primaryHover transition-colors pt-2">
                            ✕ Clear All Filters
                        </button>
                    )}
                </div>

                {/* ── Journal Grid ── */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-textMuted">Showing <span className="text-white font-semibold">{filtered.length}</span> journals</p>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="glass-card rounded-3xl p-16 text-center border-dashed border-2 border-white/10">
                            <p className="text-textMuted">No journals match your filters.</p>
                            <button onClick={clearFilters} className="mt-3 text-primary hover:text-primaryHover text-sm transition-colors">Clear Filters</button>
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

            {selectedJournal && (
                <SubscriptionModal journal={selectedJournal} onClose={() => setSelectedJournal(null)} />
            )}
        </div>
    );
};

export default JournalsPage;
