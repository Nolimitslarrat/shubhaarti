import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Search, BookOpen, Menu, X, Library } from 'lucide-react';

const Navbar = () => {
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/journals?q=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Browse Disciplines', to: '/journals' },
        { label: 'For Librarians', to: '/librarians' },
        { label: 'Get Proforma/Quote', to: '/quote', highlight: true },
    ];

    return (
        <>
            {/* Top utility bar */}
            <div className="bg-[#0a0a14] border-b border-white/5 text-xs text-textMuted">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                    <span>🌐 Connecting 120+ Countries &nbsp;|&nbsp; 🔒 Secure Institutional Access</span>
                    <div className="flex items-center gap-4">
                        <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <User className="h-3.5 w-3.5" /> Admin Login
                        </Link>
                        <Link to="/cart" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <ShoppingCart className="h-3.5 w-3.5" /> My Selection
                            {cart.length > 0 && (
                                <span className="bg-primary text-white rounded-full h-4 w-4 text-[10px] flex items-center justify-center font-bold">{cart.length}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <nav className="sticky top-0 z-50 bg-[#08080f]/95 backdrop-blur-2xl border-b border-white/8 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div className="leading-tight">
                                <div className="text-base font-black tracking-tight text-white">SUBHARTI</div>
                                <div className="text-[9px] font-semibold tracking-widest text-textMuted uppercase">Subscription Agency</div>
                            </div>
                        </Link>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:flex relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Journal, Book or ISSN..."
                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/25"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 bg-primary hover:bg-primaryHover rounded-lg flex items-center justify-center transition-colors">
                                <Search className="h-3.5 w-3.5 text-white" />
                            </button>
                        </form>

                        {/* Nav Links */}
                        <div className="hidden lg:flex items-center gap-1 ml-auto">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                        link.highlight
                                            ? 'bg-primary text-white hover:bg-primaryHover shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                                            : location.pathname === link.to
                                            ? 'text-white bg-white/10'
                                            : 'text-textMuted hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Subscribe Journals CTA */}
                            <Link to="/journals"
                                className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white border border-white/15 hover:bg-white/5 transition-all whitespace-nowrap">
                                <Library className="h-4 w-4" /> Subscribe Journals
                            </Link>

                            <Link to="/cart" className="relative ml-2 flex items-center justify-center h-9 w-9 rounded-lg border border-white/10 hover:bg-white/5 text-textMuted hover:text-white transition-all">
                                <ShoppingCart className="h-4.5 w-4.5" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] rounded-full h-4.5 w-4.5 flex items-center justify-center font-bold border-2 border-background">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="ml-auto lg:hidden text-textMuted hover:text-white">
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="lg:hidden border-t border-white/5 bg-[#08080f] px-4 py-4 space-y-1">
                        {navLinks.map(link => (
                            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2.5 rounded-lg text-sm text-textMuted hover:text-white hover:bg-white/5">
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/journals" onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2.5 rounded-lg text-sm text-textMuted hover:text-white hover:bg-white/5">
                            Subscribe Journals
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
