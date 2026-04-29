import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-white/5 bg-[#070710]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="text-base font-black tracking-tight text-white">SUBHARTI</div>
                                <div className="text-[9px] font-semibold tracking-widest text-textMuted uppercase">Subscription Agency</div>
                            </div>
                        </div>
                        <p className="text-textMuted text-sm leading-relaxed">Scientific · Technical · Medical journals for academic institutions worldwide.</p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Company</h4>
                        <ul className="space-y-2.5 text-sm text-textMuted">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/journals" className="hover:text-white transition-colors">Browse Disciplines</Link></li>
                            <li><Link to="/librarians" className="hover:text-white transition-colors">For Librarians</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Services</h4>
                        <ul className="space-y-2.5 text-sm text-textMuted">
                            <li><Link to="/quote" className="hover:text-white transition-colors">Get Proforma/Quote</Link></li>
                            <li><Link to="/cart" className="hover:text-white transition-colors">My Selection</Link></li>
                            <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Contact</h4>
                        <ul className="space-y-3 text-sm text-textMuted">
                            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary flex-shrink-0" /> info@subhartisa.com</li>
                            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary flex-shrink-0" /> +91 90000 00000</li>
                            <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary flex-shrink-0" /> www.subhartisa.com</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-textMuted">&copy; {new Date().getFullYear()} Subharti Subscription Agency. All rights reserved.</p>
                    <p className="text-xs text-textMuted/50">Scientific · Technical · Medical</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
