import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('/api/admin/login', { email, password });
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminEmail', data.email);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="glass-panel p-10 rounded-2xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center ring-2 ring-primary/30">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-white mb-2">Admin Portal</h2>
                <p className="text-center text-textMuted text-sm mb-8">Sign in to manage the Subharti platform</p>

                {error && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@subharti.com"
                            className="w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-white placeholder-textMuted/50 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-white placeholder-textMuted/50 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-lg font-semibold transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                    </button>
                    <p className="text-xs text-center text-textMuted mt-4">
                        Access is restricted to authorized personnel only.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
