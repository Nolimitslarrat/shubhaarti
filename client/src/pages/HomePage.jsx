import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Lock, BookOpen, Users, ChevronRight, Quote, Star, Rocket, Library } from 'lucide-react';
import { DOMAINS } from '../data/journals';

const STATS = [
    { icon: Globe, label: 'Global Delivery', sub: 'Shipping to 120+ countries' },
    { icon: Lock, label: 'Secure Access', sub: 'Encrypted institutional login' },
    { icon: BookOpen, label: '1000+ Journals', sub: 'Curated academic collection' },
    { icon: Users, label: 'Institutional Rates', sub: 'Special pricing for libraries' },
];

const TESTIMONIALS = [
    { quote: "Subharti SA has completely transformed how we manage our journal subscriptions. The process is seamless and professional.", name: "Dr. Priya Sharma", role: "Chief Librarian, IIT Delhi" },
    { quote: "We saved significant time on our annual subscription budget by consolidating everything through Subharti's institutional quote system.", name: "Prof. Anil Verma", role: "Acquisitions Head, University of Mumbai" },
    { quote: "The selection interface is incredibly intuitive. Our library staff needed zero training to get started.", name: "Mrs. Reema Kapoor", role: "Director of Resources, AIIMS Lucknow" },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const HomePage = () => {
    return (
        <div className="flex flex-col items-center w-full overflow-x-hidden">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            {/* ── HERO ── */}
            <section className="relative z-10 w-full min-h-[88vh] flex flex-col items-center justify-center text-center px-4 py-24"
                style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #05050A 70%)' }}>

                <motion.div {...fadeUp} className="max-w-5xl mx-auto flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8 text-sm font-medium text-purple-300">
                        <Rocket className="h-4 w-4" />
                        Trusted by 50+ Institutions Across India
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
                        Discover World‑Class<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-primary to-sky-400">
                            Research &amp; Innovation
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-textMuted max-w-2xl mb-10 font-light leading-relaxed">
                        Access <strong className="text-white font-semibold">1000+ peer-reviewed journals</strong>. Stay ahead with the latest developments in Science, Technology, Medicine & more.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/journals" className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl text-white bg-primary hover:bg-primaryHover transition-all shadow-[0_0_40px_-8px_rgba(124,58,237,0.6)] group">
                            <Library className="mr-2 h-5 w-5" />
                            Subscribe Journals
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/quote" className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl text-white border border-white/15 hover:bg-white/5 transition-colors">
                            Get Proforma / Quote
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="relative z-10 w-full bg-white/[0.02] border-y border-white/5">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                        {STATS.map(({ icon: Icon, label, sub }) => (
                            <div key={label} className="flex items-center gap-4 px-6 py-7">
                                <div className="h-11 w-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{label}</div>
                                    <div className="text-xs text-textMuted mt-0.5">{sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DISCIPLINE CATEGORIES ── */}
            <section className="relative z-10 w-full py-24 px-4">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Browse by Discipline</h2>
                        <p className="text-textMuted text-lg max-w-xl mx-auto">Curated collections across 100+ academic domains, handpicked for institutional excellence.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {DOMAINS.map((cat, i) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                whileHover={{ y: -4 }}
                            >
                                <Link to={`/domain/${encodeURIComponent(cat.name)}`}
                                    className="relative block rounded-2xl overflow-hidden h-52 group cursor-pointer border border-white/5 hover:border-primary/30 transition-colors shadow-xl">
                                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-black/20`}></div>
                                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                        <div className="text-xl font-bold text-white leading-tight">{cat.name}</div>
                                        <div className="text-sm text-white/70 mt-1">{cat.count} Journals</div>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="h-8 w-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                                            <ChevronRight className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/journals" className="inline-flex items-center gap-2 text-primary hover:text-primaryHover font-semibold transition-colors">
                            View all journals <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FOR LIBRARIANS ── */}
            <section className="relative z-10 w-full py-16 px-4">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div {...fadeUp}
                        className="relative overflow-hidden rounded-3xl p-10 sm:p-14 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-8"
                        style={{ background: 'linear-gradient(135deg, #0f0c3d 0%, #0d1b3e 100%)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                        <div className="relative z-10 max-w-lg">
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">For Librarians</div>
                            <h3 className="text-3xl font-extrabold text-white mb-3">Empower Your Institution's Library</h3>
                            <p className="text-textMuted leading-relaxed">Get bulk access, consolidated invoicing and dedicated support — we simplify your subscription lifecycle end-to-end.</p>
                        </div>
                        <Link to="/librarians" className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all relative z-10">
                            Learn More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="relative z-10 w-full py-24 px-4">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Trusted by Academia</h2>
                        <p className="text-textMuted max-w-xl mx-auto">What leading library heads and acquisition managers say about us.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="glass-card rounded-2xl p-8 flex flex-col gap-4"
                            >
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, si) => <Star key={si} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <Quote className="h-6 w-6 text-primary/40 -mt-1" />
                                <p className="text-textMuted text-sm leading-relaxed italic">"{t.quote}"</p>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="text-white font-semibold text-sm">{t.name}</div>
                                    <div className="text-textMuted text-xs mt-0.5">{t.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="relative z-10 w-full py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div {...fadeUp}
                        className="relative overflow-hidden rounded-[2.5rem] p-14 sm:p-20 border border-primary/20"
                        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(14,165,233,0.08) 100%)' }}>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 relative z-10">
                            Ready to Upgrade Your Library?
                        </h2>
                        <p className="text-textMuted text-lg max-w-xl mx-auto mb-10 font-light relative z-10">
                            Get a customised institutional quotation for any journals today. Our team responds within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Link to="/journals" className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl text-white bg-primary hover:bg-primaryHover transition-all shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]">
                                <Library className="mr-2 h-5 w-5" /> Subscribe Journals
                            </Link>
                            <Link to="/quote" className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl text-white border border-white/15 hover:bg-white/5 transition-colors">
                                Get Proforma/Quote
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
