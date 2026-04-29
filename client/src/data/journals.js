// Comprehensive dummy journal database
export const ALL_JOURNALS = [
    // ─── MEDICAL ───────────────────────────────────────────────────────────────
    { id: 'm1', name: 'The New England Journal of Medicine', publisher: 'Massachusetts Medical Society', frequency: 'Weekly', impactFactor: 158.5, domain: 'Medical', issn: '0028-4793', description: 'The most widely read, cited, and influential general medical periodical in the world.', hasIssues: true },
    { id: 'm2', name: 'The Lancet', publisher: 'Elsevier', frequency: 'Weekly', impactFactor: 168.9, domain: 'Medical', issn: '0140-6736', description: 'Leading independent general medical journal publishing significant clinical research globally.', hasIssues: true },
    { id: 'm3', name: 'JAMA: Journal of the American Medical Association', publisher: 'AMA', frequency: 'Weekly', impactFactor: 120.7, domain: 'Medical', issn: '0098-7484', description: 'Promotes science and art of medicine and betterment of public health.', hasIssues: true },
    { id: 'm4', name: 'BMJ: British Medical Journal', publisher: 'BMJ Publishing Group', frequency: 'Weekly', impactFactor: 93.3, domain: 'Medical', issn: '0959-8138', description: 'One of the world\'s oldest and most respected general medical journals.', hasIssues: false },
    { id: 'm5', name: 'Annals of Internal Medicine', publisher: 'ACP', frequency: 'Bimonthly', impactFactor: 39.2, domain: 'Medical', issn: '0003-4819', description: 'Publishes original research, evidence-based reviews, and clinical guidelines.', hasIssues: true },
    { id: 'm6', name: 'Journal of Clinical Investigation', publisher: 'ASCI', frequency: 'Monthly', impactFactor: 19.5, domain: 'Medical', issn: '0021-9738', description: 'Publishes basic research that impacts clinical science and practice.', hasIssues: false },

    // ─── COMPUTER/IT ───────────────────────────────────────────────────────────
    { id: 'c1', name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence', publisher: 'IEEE', frequency: 'Monthly', impactFactor: 23.6, domain: 'Computer/IT', issn: '0162-8828', description: 'Theoretical and applied computer vision and image processing research.', hasIssues: false },
    { id: 'c2', name: 'ACM Computing Surveys', publisher: 'ACM', frequency: 'Quarterly', impactFactor: 16.6, domain: 'Computer/IT', issn: '0360-0300', description: 'Comprehensive survey articles covering important topics in computing.', hasIssues: true },
    { id: 'c3', name: 'Journal of Machine Learning Research', publisher: 'JMLR', frequency: 'Monthly', impactFactor: 6.2, domain: 'Computer/IT', issn: '1532-4435', description: 'Open-access venue for high-quality scholarly articles across all areas of ML.', hasIssues: false },
    { id: 'c4', name: 'IEEE Transactions on Neural Networks and Learning Systems', publisher: 'IEEE', frequency: 'Monthly', impactFactor: 14.2, domain: 'Computer/IT', issn: '2162-237X', description: 'Research on neural networks and learning systems applications.', hasIssues: false },
    { id: 'c5', name: 'Artificial Intelligence', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 14.4, domain: 'Computer/IT', issn: '0004-3702', description: 'Covers all areas of artificial intelligence research and applications.', hasIssues: true },

    // ─── ENGINEERING ───────────────────────────────────────────────────────────
    { id: 'e1', name: 'International Journal of Heat and Mass Transfer', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 5.4, domain: 'Engineering', issn: '0017-9310', description: 'Covers heat and mass transfer phenomena in engineering contexts.', hasIssues: false },
    { id: 'e2', name: 'Journal of Mechanical Engineering Science', publisher: 'SAGE', frequency: 'Monthly', impactFactor: 2.1, domain: 'Engineering', issn: '0954-4062', description: 'Original research in all branches of mechanical engineering.', hasIssues: true },
    { id: 'e3', name: 'IEEE Transactions on Power Electronics', publisher: 'IEEE', frequency: 'Monthly', impactFactor: 6.8, domain: 'Engineering', issn: '0885-8993', description: 'Research in power electronics, drives and energy conversion systems.', hasIssues: false },
    { id: 'e4', name: 'Structural and Multidisciplinary Optimization', publisher: 'Springer', frequency: 'Monthly', impactFactor: 3.9, domain: 'Engineering', issn: '1615-147X', description: 'Research on structure optimization methods in engineering design.', hasIssues: false },
    { id: 'e5', name: 'Journal of Fluids and Structures', publisher: 'Elsevier', frequency: 'Bimonthly', impactFactor: 3.4, domain: 'Engineering', issn: '0889-9746', description: 'Covers fluid-structure interaction problems across all engineering fields.', hasIssues: true },

    // ─── PHARMACY ──────────────────────────────────────────────────────────────
    { id: 'p1', name: 'Journal of Medicinal Chemistry', publisher: 'ACS', frequency: 'Biweekly', impactFactor: 7.3, domain: 'Pharmacy', issn: '0022-2623', description: 'Research on chemical aspects of drug design and development.', hasIssues: false },
    { id: 'p2', name: 'Pharmaceutical Research', publisher: 'Springer', frequency: 'Monthly', impactFactor: 4.5, domain: 'Pharmacy', issn: '0724-8741', description: 'Focuses on pharmaceutical sciences including drug delivery and formulation.', hasIssues: true },
    { id: 'p3', name: 'European Journal of Pharmaceutics and Biopharmaceutics', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 5.1, domain: 'Pharmacy', issn: '0939-6411', description: 'Research on pharmaceutical technology and biopharmaceutics.', hasIssues: false },
    { id: 'p4', name: 'Drug Discovery Today', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 8.1, domain: 'Pharmacy', issn: '1359-6446', description: 'Covers the latest developments in rational drug discovery and development.', hasIssues: true },

    // ─── LAW & SOCIAL SCIENCE ──────────────────────────────────────────────────
    { id: 'l1', name: 'The Yale Law Journal', publisher: 'Yale Law School', frequency: '8x/year', impactFactor: 4.8, domain: 'Law & Social Science', issn: '0044-0094', description: 'Student-run law review and one of the most widely cited legal publications.', hasIssues: true },
    { id: 'l2', name: 'Harvard Law Review', publisher: 'Harvard', frequency: '8x/year', impactFactor: 5.2, domain: 'Law & Social Science', issn: '0017-811X', description: 'Student-run organisation publishing articles on legal scholarship since 1887.', hasIssues: true },
    { id: 'l3', name: 'Journal of Legal Studies', publisher: 'University of Chicago', frequency: 'Biannual', impactFactor: 3.1, domain: 'Law & Social Science', issn: '0047-2530', description: 'Applies social-science methods and insights to legal questions.', hasIssues: false },

    // ─── BIOTECHNOLOGY ─────────────────────────────────────────────────────────
    { id: 'b1', name: 'Nature Biotechnology', publisher: 'Nature Portfolio', frequency: 'Monthly', impactFactor: 46.9, domain: 'Biotechnology', issn: '1087-0156', description: 'Research in biotechnology and biological sciences applied to medicine and industry.', hasIssues: false },
    { id: 'b2', name: 'Biotechnology Advances', publisher: 'Elsevier', frequency: 'Bimonthly', impactFactor: 14.2, domain: 'Biotechnology', issn: '0734-9750', description: 'Reviews on topics relevant to industrial and applied microbiology and biotechnology.', hasIssues: true },
    { id: 'b3', name: 'Journal of Biotechnology', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 4.1, domain: 'Biotechnology', issn: '0168-1656', description: 'Covers all aspects of biotechnology and biological sciences research.', hasIssues: false },

    // ─── MANAGEMENT & BUSINESS ─────────────────────────────────────────────────
    { id: 'mg1', name: 'Academy of Management Journal', publisher: 'AOM', frequency: 'Bimonthly', impactFactor: 10.5, domain: 'Management & Business', issn: '0001-4273', description: 'Publishes empirical research that tests, extends, or builds management theory.', hasIssues: true },
    { id: 'mg2', name: 'Journal of International Business Studies', publisher: 'Palgrave Macmillan', frequency: 'Bimonthly', impactFactor: 9.4, domain: 'Management & Business', issn: '0047-2506', description: 'Research on international business, covering multinationals and cross-border trade.', hasIssues: false },
    { id: 'mg3', name: 'Strategic Management Journal', publisher: 'Wiley', frequency: 'Monthly', impactFactor: 8.9, domain: 'Management & Business', issn: '0143-2095', description: 'Research on strategic planning, industry analysis and competitive advantage.', hasIssues: true },

    // ─── AGRICULTURE ───────────────────────────────────────────────────────────
    { id: 'ag1', name: 'Field Crops Research', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 6.1, domain: 'Agriculture', issn: '0378-4290', description: 'Research on production, management and quality of field crops worldwide.', hasIssues: false },
    { id: 'ag2', name: 'Agriculture, Ecosystems & Environment', publisher: 'Elsevier', frequency: 'Monthly', impactFactor: 6.6, domain: 'Agriculture', issn: '0167-8809', description: 'Research on the interactions between agriculture and terrestrial ecosystems.', hasIssues: true },
    { id: 'ag3', name: 'Journal of Agricultural and Food Chemistry', publisher: 'ACS', frequency: 'Weekly', impactFactor: 5.9, domain: 'Agriculture', issn: '0021-8561', description: 'Chemical and biochemical aspects of agricultural and food research.', hasIssues: false },
];

export const DOMAINS = [
    { name: 'Medical', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', count: 6, color: 'from-red-900/70' },
    { name: 'Computer/IT', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', count: 5, color: 'from-blue-900/70' },
    { name: 'Engineering', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', count: 5, color: 'from-orange-900/70' },
    { name: 'Pharmacy', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80', count: 4, color: 'from-green-900/70' },
    { name: 'Law & Social Science', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', count: 3, color: 'from-stone-900/70' },
    { name: 'Biotechnology', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80', count: 3, color: 'from-purple-900/70' },
    { name: 'Management & Business', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', count: 3, color: 'from-yellow-900/70' },
    { name: 'Agriculture', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80', count: 3, color: 'from-lime-900/70' },
];

export const PUBLISHERS = [...new Set(ALL_JOURNALS.map(j => j.publisher))].sort();
export const SUBSCRIPTION_YEARS = ['2024', '2025', '2026'];
export const SUBSCRIPTION_TYPES = ['Online Journal', 'Print Journal', 'Print + Online'];
export const SUBSCRIPTION_ISSUES = ['All (Jan-Dec)', '1 (Jan-June)', '2 (July-Dec)'];
