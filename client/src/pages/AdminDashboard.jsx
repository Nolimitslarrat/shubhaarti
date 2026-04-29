import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LayoutDashboard, BookOpen, FileText, LogOut,
    Plus, Pencil, Trash2, X, Check, AlertCircle,
    ChevronDown, Search, RefreshCw, Users, Save
} from 'lucide-react';
import { DOMAINS } from '../data/journals';

const API = '/api';

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});

// ── Reusable Modal ──────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="glass-panel rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <button onClick={onClose} className="text-textMuted hover:text-white transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>
            {children}
        </div>
    </div>
);

// ── Status Badge ────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const colors = {
        Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        Responded: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        Closed: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return (
        <span className={`px-2.5 py-1 text-xs rounded-full font-medium border ${colors[status] || 'bg-gray-500/20 text-gray-400'}`}>
            {status}
        </span>
    );
};

// ── Stat Card ───────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="glass-panel rounded-xl p-5 flex items-center gap-4">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-textMuted text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

// ════════════════════════════════════════════════════════════════
// JOURNALS SECTION
// ════════════════════════════════════════════════════════════════
const JournalsSection = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [domainFilter, setDomainFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [editingJournal, setEditingJournal] = useState(null);
    const [form, setForm] = useState({ name: '', publisher: '', frequency: '', impactFactor: '', domain: '', issn: '', description: '' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const fetchJournals = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API}/journals`);
            setJournals(data);
        } catch { setError('Failed to load journals.'); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchJournals(); }, [fetchJournals]);

    const openCreate = () => {
        setEditingJournal(null);
        setForm({ name: '', publisher: '', frequency: '', impactFactor: '', domain: '', issn: '', description: '' });
        setShowModal(true);
    };

    const openEdit = (j) => {
        setEditingJournal(j);
        setForm({ name: j.name, publisher: j.publisher, frequency: j.frequency, impactFactor: j.impactFactor || '', domain: j.domain, issn: j.issn || '', description: j.description });
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form, impactFactor: form.impactFactor ? parseFloat(form.impactFactor) : null };
            if (editingJournal) {
                await axios.put(`${API}/journals/${editingJournal.id}`, payload, getAuthHeader());
            } else {
                await axios.post(`${API}/journals`, payload, getAuthHeader());
            }
            setShowModal(false);
            fetchJournals();
        } catch { setError('Save failed. Check your session.'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this journal?')) return;
        try {
            await axios.delete(`${API}/journals/${id}`, getAuthHeader());
            fetchJournals();
        } catch { setError('Delete failed.'); }
    };

    const filtered = journals.filter(j => {
        const matchesSearch = j.name.toLowerCase().includes(search.toLowerCase()) || j.publisher.toLowerCase().includes(search.toLowerCase());
        const matchesDomain = domainFilter === 'All' || j.domain === domainFilter;
        return matchesSearch && matchesDomain;
    });

    const inputCls = "w-full bg-background border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder-textMuted/40";

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Journal Management</h2>
                    <p className="text-textMuted text-sm mt-1">{journals.length} journals in catalog</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} className="bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary w-40">
                        <option value="All">All Domains</option>
                        {DOMAINS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search journals..." className="bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-52 placeholder-textMuted/50" />
                    </div>
                    <button onClick={fetchJournals} className="p-2 rounded-lg border border-white/10 text-textMuted hover:text-white hover:border-white/30 transition-colors">
                        <RefreshCw className="h-4 w-4" />
                    </button>
                    <button onClick={openCreate} className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Plus className="h-4 w-4" /> Add Journal
                    </button>
                </div>
            </div>

            {error && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4 text-red-400 text-sm"><AlertCircle className="h-4 w-4" />{error}</div>}

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="border-b border-white/10 text-textMuted uppercase text-xs">
                            <tr>
                                <th className="px-5 py-4">Journal Name</th>
                                <th className="px-5 py-4">Domain</th>
                                <th className="px-5 py-4">Publisher</th>
                                <th className="px-5 py-4">Frequency</th>
                                <th className="px-5 py-4">ISSN</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center text-textMuted py-16">Loading journals...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="text-center text-textMuted py-16">No journals found.</td></tr>
                            ) : filtered.map(j => (
                                <tr key={j.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-white">{j.name}</p>
                                        <p className="text-xs text-textMuted mt-0.5 line-clamp-1">{j.description}</p>
                                    </td>
                                    <td className="px-5 py-4"><span className="px-2.5 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium whitespace-nowrap">{j.domain}</span></td>
                                    <td className="px-5 py-4 text-textMuted whitespace-nowrap">{j.publisher}</td>
                                    <td className="px-5 py-4 text-textMuted whitespace-nowrap">{j.frequency}</td>
                                    <td className="px-5 py-4 text-textMuted whitespace-nowrap">{j.issn ?? '—'}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(j)} className="p-2 rounded-lg text-textMuted hover:text-primary hover:bg-primary/10 transition-colors"><Pencil className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(j.id)} className="p-2 rounded-lg text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <Modal title={editingJournal ? 'Edit Journal' : 'Add New Journal'} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs text-textMuted mb-1.5">Journal Name *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Nature Medicine" />
                            </div>
                            <div>
                                <label className="block text-xs text-textMuted mb-1.5">Domain *</label>
                                <select required value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} className={`${inputCls} appearance-none`}>
                                    <option value="" disabled>Select Domain</option>
                                    {DOMAINS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-textMuted mb-1.5">Publisher *</label>
                                <input required value={form.publisher} onChange={e => setForm({ ...form, publisher: e.target.value })} className={inputCls} placeholder="e.g. Springer" />
                            </div>
                            <div>
                                <label className="block text-xs text-textMuted mb-1.5">Frequency *</label>
                                <input required value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })} className={inputCls} placeholder="e.g. Monthly" />
                            </div>
                            <div>
                                <label className="block text-xs text-textMuted mb-1.5">ISSN</label>
                                <input value={form.issn} onChange={e => setForm({ ...form, issn: e.target.value })} className={inputCls} placeholder="e.g. 0028-4793" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs text-textMuted mb-1.5">Impact Factor</label>
                                <input type="number" step="0.01" value={form.impactFactor} onChange={e => setForm({ ...form, impactFactor: e.target.value })} className={inputCls} placeholder="e.g. 12.5" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs text-textMuted mb-1.5">Description *</label>
                                <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls + ' resize-none'} placeholder="Short description of the journal..." />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-white/10 mt-6">
                            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-white/10 rounded-lg text-textMuted hover:text-white hover:border-white/30 transition-colors text-sm">Cancel</button>
                            <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-60">
                                {saving ? 'Saving...' : editingJournal ? 'Save Changes' : 'Create Journal'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

// ════════════════════════════════════════════════════════════════
// QUOTATIONS SECTION
// ════════════════════════════════════════════════════════════════
const QuotationsSection = () => {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState('');
    const [draftNotes, setDraftNotes] = useState({});

    const fetchQuotations = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API}/quotations`, getAuthHeader());
            setQuotations(data);
        } catch { setError('Failed to load quotations.'); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchQuotations(); }, [fetchQuotations]);

    const updateStatus = async (id, status, notes = null) => {
        setUpdatingId(id);
        try {
            const payload = { status };
            if (notes !== null) payload.adminNotes = notes;
            
            await axios.put(`${API}/quotations/${id}`, payload, getAuthHeader());
            
            setQuotations(q => q.map(x => x.id === id ? { 
                ...x, 
                status, 
                adminNotes: notes !== null ? notes : x.adminNotes 
            } : x));
            
            // Clean up draft if saved
            if (notes !== null) {
                const newDrafts = { ...draftNotes };
                delete newDrafts[id];
                setDraftNotes(newDrafts);
            }
        } catch { setError('Update failed.'); }
        finally { setUpdatingId(null); }
    };

    const filtered = quotations.filter(q => {
        const matchSearch = q.institutionName.toLowerCase().includes(search.toLowerCase()) || q.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || q.status === filter;
        return matchSearch && matchFilter;
    });

    const counts = { All: quotations.length, Pending: quotations.filter(q => q.status === 'Pending').length, Responded: quotations.filter(q => q.status === 'Responded').length, Closed: quotations.filter(q => q.status === 'Closed').length };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Quotation Requests & CRM</h2>
                    <p className="text-textMuted text-sm mt-1">{quotations.length} total communication threads</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search institutions..." className="bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-52 placeholder-textMuted/50" />
                    </div>
                    <button onClick={fetchQuotations} className="p-2 rounded-lg border border-white/10 text-textMuted hover:text-white transition-colors"><RefreshCw className="h-4 w-4" /></button>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
                {['All', 'Pending', 'Responded', 'Closed'].map(s => (
                    <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${filter === s ? 'bg-primary border-primary text-white' : 'border-white/10 text-textMuted hover:border-white/30 hover:text-white'}`}>
                        {s} <span className="ml-1 opacity-70">({counts[s]})</span>
                    </button>
                ))}
            </div>

            {error && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4 text-red-400 text-sm"><AlertCircle className="h-4 w-4" />{error}</div>}

            <div className="space-y-3">
                {loading ? (
                    <div className="glass-panel rounded-xl p-16 text-center text-textMuted">Loading quotations...</div>
                ) : filtered.length === 0 ? (
                    <div className="glass-panel rounded-xl p-16 text-center text-textMuted">No quotations found.</div>
                ) : filtered.map(q => (
                    <div key={q.id} className="glass-panel rounded-xl overflow-hidden">
                        <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold text-sm">{q.institutionName[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white">{q.institutionName}</p>
                                <p className="text-textMuted text-sm">{q.contactPerson} · {q.email}</p>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                {q.adminNotes && <span className="text-xs bg-white/10 px-2 py-1 rounded text-textMuted hidden sm:block">Has notes</span>}
                                <StatusBadge status={q.status} />
                                <ChevronDown className={`h-4 w-4 text-textMuted transition-transform ${expandedId === q.id ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        {expandedId === q.id && (
                            <div className="border-t border-white/10 p-5 space-y-5 bg-black/20">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                    <div><p className="text-textMuted text-xs mb-1">Phone</p><p className="text-white">{q.phone}</p></div>
                                    <div><p className="text-textMuted text-xs mb-1">Submitted</p><p className="text-white">{new Date(q.createdAt).toLocaleString()}</p></div>
                                    <div className="col-span-2"><p className="text-textMuted text-xs mb-1">Client Requirements</p><p className="text-white">{q.notes || 'No specific requirements.'}</p></div>
                                </div>

                                {q.selectedJournals?.length > 0 && (
                                    <div>
                                        <p className="text-xs text-textMuted mb-2">Requested Journals ({q.selectedJournals.length})</p>
                                        <div className="flex flex-wrap gap-2">
                                            {q.selectedJournals.map(j => (
                                                <span key={j.id} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white flex flex-col">
                                                    <span className="font-medium">{j.name}</span>
                                                    <span className="text-textMuted">{j.publisher}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Admin Communication Notes Section */}
                                <div className="border border-primary/20 bg-primary/5 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-primary" /> 
                                        Internal Communication Notes
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <textarea
                                            rows={3}
                                            placeholder="Track your emails, calls, or quotes sent to this client..."
                                            value={draftNotes[q.id] !== undefined ? draftNotes[q.id] : (q.adminNotes || '')}
                                            onChange={e => setDraftNotes({...draftNotes, [q.id]: e.target.value})}
                                            className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-primary resize-none placeholder-textMuted/40"
                                        />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-textMuted">Mark Thread Status:</span>
                                                {['Pending', 'Responded', 'Closed'].map(s => (
                                                    <button key={s} disabled={updatingId === q.id || q.status === s} onClick={() => updateStatus(q.id, s)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${q.status === s ? 'border-primary/50 bg-primary/20 text-primary' : 'border-white/10 text-textMuted hover:border-white/30 hover:text-white'} disabled:opacity-50`}>
                                                        {updatingId === q.id && q.status !== s ? '...' : s}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                disabled={draftNotes[q.id] === undefined || draftNotes[q.id] === q.adminNotes || updatingId === q.id}
                                                onClick={() => updateStatus(q.id, q.status, draftNotes[q.id])}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                            >
                                                <Save className="h-4 w-4" /> Save Notes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════
// OVERVIEW SECTION
// ════════════════════════════════════════════════════════════════
const OverviewSection = ({ onNavigate }) => {
    const [stats, setStats] = useState({ journals: 0, quotations: 0, pending: 0, responded: 0 });
    const [recentQuotations, setRecentQuotations] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const [jRes, qRes] = await Promise.all([
                    axios.get(`${API}/journals`),
                    axios.get(`${API}/quotations`, getAuthHeader())
                ]);
                const q = qRes.data;
                setStats({ journals: jRes.data.length, quotations: q.length, pending: q.filter(x => x.status === 'Pending').length, responded: q.filter(x => x.status === 'Responded').length });
                setRecentQuotations(q.slice(0, 5));
            } catch {}
        };
        load();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Overview</h2>
                <p className="text-textMuted text-sm">Welcome back. Here's what's happening on the platform.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={BookOpen} label="Total Journals" value={stats.journals} color="bg-primary/30" />
                <StatCard icon={FileText} label="Total Quotes" value={stats.quotations} color="bg-secondary/30" />
                <StatCard icon={AlertCircle} label="Pending" value={stats.pending} color="bg-yellow-500/30" />
                <StatCard icon={Check} label="Responded" value={stats.responded} color="bg-green-500/30" />
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <h3 className="font-semibold text-white">Recent Quotation Requests</h3>
                    <button onClick={() => onNavigate('quotations')} className="text-primary text-sm hover:text-primaryHover transition-colors">View CRM →</button>
                </div>
                <div className="divide-y divide-white/5">
                    {recentQuotations.length === 0 ? (
                        <p className="text-textMuted text-sm text-center py-10">No quotations yet.</p>
                    ) : recentQuotations.map(q => (
                        <div key={q.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold text-xs">{q.institutionName[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{q.institutionName}</p>
                                <p className="text-textMuted text-xs">{q.email}</p>
                            </div>
                            <StatusBadge status={q.status} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════
// MAIN ADMIN DASHBOARD
// ════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');
    const adminEmail = localStorage.getItem('adminEmail') || 'admin';

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) navigate('/admin/login');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'journals', label: 'Journals', icon: BookOpen },
        { id: 'quotations', label: 'CRM / Quotations', icon: FileText },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-surface/40 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/30 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">Subharti Admin</p>
                            <p className="text-textMuted text-xs truncate max-w-[140px]">{adminEmail}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => setActiveSection(id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === id ? 'bg-primary/20 text-primary border border-primary/30' : 'text-textMuted hover:text-white hover:bg-white/5'}`}>
                            <Icon className="h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    {activeSection === 'overview' && <OverviewSection onNavigate={setActiveSection} />}
                    {activeSection === 'journals' && <JournalsSection />}
                    {activeSection === 'quotations' && <QuotationsSection />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
