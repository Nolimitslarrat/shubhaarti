import React, { useState, useEffect } from 'react';
import { Search, Plus, Check, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// Authentic dummy data for journals
const DUMMY_JOURNALS = [
    { id: '1', name: 'The New England Journal of Medicine', publisher: 'Massachusetts Medical Society', frequency: 'Weekly', impactFactor: 158.5, domain: 'Medical', description: 'The most widely read, cited, and influential general medical periodical in the world.' },
    { id: '2', name: 'The Lancet', publisher: 'Elsevier', frequency: 'Weekly', impactFactor: 168.9, domain: 'Medical', description: 'World\'s leading independent general medical journal publishing clinical research.' },
    { id: '3', name: 'Nature', publisher: 'Nature Portfolio', frequency: 'Weekly', impactFactor: 64.8, domain: 'Science', description: 'A weekly international journal publishing the finest peer-reviewed research in all fields of science and technology.' },
    { id: '4', name: 'Science', publisher: 'AAAS', frequency: 'Weekly', impactFactor: 56.9, domain: 'Science', description: 'The peer-reviewed academic journal of the American Association for the Advancement of Science.' },
    { id: '5', name: 'Cell', publisher: 'Cell Press', frequency: 'Biweekly', impactFactor: 64.5, domain: 'Biology', description: 'Publishes highly significant findings in areas of experimental biology.' },
    { id: '6', name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence', publisher: 'IEEE', frequency: 'Monthly', impactFactor: 23.6, domain: 'Engineering', description: 'Theoretical and applied computer vision and image processing.' },
    { id: '7', name: 'The Yale Law Journal', publisher: 'Yale Law School', frequency: '8 times a year', impactFactor: 4.8, domain: 'Law', description: 'A student-run law review and one of the most widely cited legal publications.' },
    { id: '8', name: 'Journal of Finance', publisher: 'Wiley', frequency: 'Bimonthly', impactFactor: 8.3, domain: 'Economics', description: 'The official publication of the American Finance Association.' },
    { id: '9', name: 'Academy of Management Journal', publisher: 'AOM', frequency: 'Bimonthly', impactFactor: 10.5, domain: 'Business', description: 'Publishes empirical research that tests, extends, or builds management theory.' },
    { id: '10', name: 'American Economic Review', publisher: 'AEA', frequency: 'Monthly', impactFactor: 10.8, domain: 'Economics', description: 'One of the most prestigious and highly cited journals in economics.' },
    { id: '11', name: 'Physical Review Letters', publisher: 'APS', frequency: 'Weekly', impactFactor: 8.6, domain: 'Science', description: 'Provides rapid publication of short reports of significant fundamental research in physics.' },
    { id: '12', name: 'JAMA: The Journal of the American Medical Association', publisher: 'AMA', frequency: 'Weekly', impactFactor: 120.7, domain: 'Medical', description: 'Promotes the science and art of medicine and the betterment of the public health.' },
];

const DOMAINS = ['All', 'Medical', 'Science', 'Biology', 'Engineering', 'Law', 'Economics', 'Business'];

const ExplorePage = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('All');
    
    const { cart, addToCart } = useCart();

    useEffect(() => {
        // Simulate network latency for authentic feel
        setLoading(true);
        const timer = setTimeout(() => {
            let filtered = DUMMY_JOURNALS;

            if (search) {
                filtered = filtered.filter(j => 
                    j.name.toLowerCase().includes(search.toLowerCase()) || 
                    j.publisher.toLowerCase().includes(search.toLowerCase())
                );
            }

            if (selectedDomain !== 'All') {
                filtered = filtered.filter(j => j.domain === selectedDomain);
            }

            setJournals(filtered);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [search, selectedDomain]);

    const isInCart = (id) => cart.some(item => item.id === id);

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Sidebar Filters */}
                <div className="w-full lg:w-72 flex-shrink-0 space-y-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">Explore<span className="text-primary">.</span></h2>
                        <p className="text-textMuted text-sm leading-relaxed">Search through our exclusive database of highly cited academic journals.</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted" />
                        <input 
                            type="text" 
                            placeholder="Find by name or publisher..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4 text-white/80 font-semibold uppercase tracking-wider text-xs">
                            <Filter className="h-4 w-4" /> Domains
                        </div>
                        <div className="flex flex-col gap-2">
                            {DOMAINS.map(domain => (
                                <button
                                    key={domain}
                                    onClick={() => setSelectedDomain(domain)}
                                    className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${
                                        selectedDomain === domain 
                                        ? 'bg-primary/20 text-primary border border-primary/30 font-medium' 
                                        : 'text-textMuted hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                                >
                                    {domain}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : journals.length === 0 ? (
                        <div className="glass-panel p-12 text-center rounded-3xl border-dashed border-2 border-white/10">
                            <p className="text-textMuted text-lg">No journals found matching your criteria.</p>
                            <button onClick={() => {setSearch(''); setSelectedDomain('All');}} className="mt-4 text-primary hover:text-primaryHover">Clear Filters</button>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {journals.map((journal, index) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={journal.id} 
                                        className="glass-card p-6 flex flex-col h-full rounded-2xl group"
                                    >
                                        <div className="flex justify-between items-start mb-5">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 text-white/70 rounded-full border border-white/5 group-hover:border-primary/30 transition-colors">
                                                {journal.domain}
                                            </span>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-textMuted mb-0.5">Impact Factor</span>
                                                <span className="text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded">{journal.impactFactor}</span>
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{journal.name}</h3>
                                        <p className="text-xs font-medium text-primary mb-4">{journal.publisher}</p>
                                        
                                        <p className="text-sm text-textMuted mb-6 flex-grow leading-relaxed line-clamp-3">{journal.description}</p>
                                        
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-xs text-textMuted flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> {journal.frequency}
                                            </span>
                                            <button 
                                                onClick={() => !isInCart(journal.id) && addToCart(journal)}
                                                disabled={isInCart(journal.id)}
                                                className={`flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 ${
                                                    isInCart(journal.id) 
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default' 
                                                    : 'bg-white/5 text-white border border-white/10 hover:bg-primary hover:border-primary shadow-lg hover:shadow-primary/30'
                                                }`}
                                            >
                                                {isInCart(journal.id) ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ExplorePage;
