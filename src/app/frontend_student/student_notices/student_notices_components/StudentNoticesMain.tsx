'use client';

import React, { useState } from 'react';
import { 
  Bell, AlertTriangle, IndianRupee, Utensils, Wrench, Calendar, 
  Search, ShieldAlert, CheckSquare, Megaphone, Check, Paperclip, Clock,
  FileText, Download, XCircle, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

type NoticeCategory = 'General' | 'Fees' | 'Mess' | 'Maintenance' | 'Holiday' | 'Room Inspection' | 'Emergency' | 'Rules';

interface NoticeItem {
  id: string;
  category: NoticeCategory;
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
  isRead: boolean;
  attachments?: { name: string; size: string; type: string }[];
}

const DUMMY_NOTICES: NoticeItem[] = [
  {
    id: 'not-001',
    category: 'Emergency',
    title: 'Water Supply Interruption',
    description: 'There will be no water supply on 5th Oct from 10 AM to 2 PM due to municipal pipeline maintenance. Please store sufficient water.',
    date: 'Today, 08:30 AM',
    isImportant: true,
    isRead: false
  },
  {
    id: 'not-002',
    category: 'Fees',
    title: 'October Rent Due Reminder',
    description: 'This is a gentle reminder to clear your October rent dues by 7th Oct to avoid a late fee of ₹100 per day.',
    date: 'Yesterday, 04:15 PM',
    isImportant: true,
    isRead: false,
    attachments: [
      { name: 'fee_structure_update.pdf', size: '1.2 MB', type: 'pdf' }
    ]
  },
  {
    id: 'not-003',
    category: 'Holiday',
    title: 'Diwali Celebration & Dinner',
    description: 'We are organizing a special Diwali celebration and grand dinner on 24th Oct for all residents. Please mark your presence!',
    date: '01 Oct 2026, 11:00 AM',
    isImportant: false,
    isRead: true
  },
  {
    id: 'not-004',
    category: 'Mess',
    title: 'Menu Change for Weekend',
    description: 'Sunday dinner will now feature special Paneer Butter Masala and Naan instead of the regular menu based on student feedback.',
    date: '30 Sep 2026, 09:20 AM',
    isImportant: false,
    isRead: true
  },
  {
    id: 'not-005',
    category: 'Room Inspection',
    title: 'Monthly Room Inspection',
    description: 'The monthly room inspection for hygiene and damages will be conducted this Saturday between 11 AM and 4 PM.',
    date: '28 Sep 2026, 02:00 PM',
    isImportant: true,
    isRead: true
  },
  {
    id: 'not-006',
    category: 'Rules',
    title: 'Updated Visitor Policy',
    description: 'No visitors are allowed after 8 PM starting from next month. Overnight stays for guests must be pre-approved 24 hours in advance.',
    date: '20 Sep 2026, 10:00 AM',
    isImportant: false,
    isRead: true,
    attachments: [
      { name: 'visitor_rules_2026.pdf', size: '2.4 MB', type: 'pdf' }
    ]
  }
];

const getCategoryConfig = (category: NoticeCategory) => {
  switch (category) {
    case 'General': return { icon: Megaphone, color: 'text-primary', bg: 'bg-primary/10' };
    case 'Fees': return { icon: IndianRupee, color: 'text-warning', bg: 'bg-warning/10' };
    case 'Mess': return { icon: Utensils, color: 'text-info', bg: 'bg-info/10' };
    case 'Maintenance': return { icon: Wrench, color: 'text-success', bg: 'bg-success/10' };
    case 'Holiday': return { icon: Calendar, color: 'text-secondary', bg: 'bg-input' };
    case 'Room Inspection': return { icon: CheckSquare, color: 'text-info', bg: 'bg-info/10' };
    case 'Emergency': return { icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger/10' };
    case 'Rules': return { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' };
    default: return { icon: Bell, color: 'text-primary', bg: 'bg-primary/10' };
  }
};

export function StudentNoticesMain() {
  const [notices, setNotices] = useState<NoticeItem[]>(DUMMY_NOTICES);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread' | 'Important'>('All');
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const categories: (NoticeCategory | 'All')[] = ['All', 'General', 'Fees', 'Mess', 'Maintenance', 'Holiday', 'Room Inspection', 'Emergency', 'Rules'];

  const filteredNotices = notices.filter(notice => {
    if (activeFilter === 'Unread' && notice.isRead) return false;
    if (activeFilter === 'Important' && !notice.isImportant) return false;
    if (selectedCategory !== 'All' && notice.category !== selectedCategory) return false;
    if (searchQuery && !notice.title.toLowerCase().includes(searchQuery.toLowerCase()) && !notice.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleOpenNotice = (notice: NoticeItem) => {
    setSelectedNotice(notice);
    if (!notice.isRead) {
      // Mark as read when opened
      setNotices(prev => prev.map(n => n.id === notice.id ? { ...n, isRead: true } : n));
      // In a real app, this would trigger an API call to log read status for Manager
    }
  };

  const handleDownload = (filename: string) => {
    toast.success(`Downloading ${filename}...`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center relative">
              <Megaphone className="w-6 h-6 text-primary" />
              {notices.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full border-2 border-card animate-pulse"></span>
              )}
            </div>
            Official Notices
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">
            Important announcements, rules, and updates from the PG management.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        
        {/* Left Sidebar (Filters) */}
        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-primary text-sm mb-3">View By Status</h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto hide-scrollbar gap-2 mb-4">
              {[
                { id: 'All', label: 'Latest Notices' },
                { id: 'Important', label: 'Important Only' },
                { id: 'Unread', label: 'Unread' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`flex-1 lg:w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeFilter === filter.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-secondary bg-input/50 hover:bg-input hover:text-primary'
                  }`}
                >
                  {filter.label}
                  {filter.id === 'Unread' && notices.filter(n => !n.isRead).length > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${activeFilter === filter.id ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                      {notices.filter(n => !n.isRead).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-bold text-primary text-sm mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat ? 'bg-primary/10 text-primary font-bold' : 'text-secondary hover:bg-input'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="p-4 border-b border-border bg-input/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                type="text" 
                placeholder="Search notices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => {
                const config = getCategoryConfig(notice.category);
                const Icon = config.icon;

                return (
                  <div 
                    key={notice.id} 
                    onClick={() => handleOpenNotice(notice)}
                    className={`border rounded-2xl p-4 md:p-5 cursor-pointer transition-all hover:shadow-md group ${
                      !notice.isRead ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      
                      <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border ${config.bg} ${config.color} ${!notice.isRead ? 'border-current' : 'border-transparent'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-base font-black truncate ${!notice.isRead ? 'text-primary' : 'text-secondary'}`}>
                              {notice.title}
                            </h3>
                            {notice.isImportant && (
                              <span className="bg-danger text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                                Important
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-secondary flex items-center gap-1 shrink-0">
                            <Clock className="w-3.5 h-3.5" /> {notice.date}
                          </span>
                        </div>
                        
                        <p className={`text-sm line-clamp-2 ${!notice.isRead ? 'text-primary/80 font-medium' : 'text-secondary'}`}>
                          {notice.description}
                        </p>

                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-input px-2 py-1 rounded">
                            {notice.category}
                          </span>
                          
                          {notice.attachments && notice.attachments.length > 0 && (
                            <span className="text-xs font-bold text-primary flex items-center gap-1">
                              <Paperclip className="w-3.5 h-3.5" /> {notice.attachments.length} File(s)
                            </span>
                          )}

                          {!notice.isRead && (
                            <span className="text-[10px] font-bold text-primary flex items-center gap-1 ml-auto">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mb-4">
                  <Megaphone className="w-10 h-10 text-secondary opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">No notices found</h3>
                <p className="text-sm text-secondary max-w-sm">
                  {searchQuery || activeFilter !== 'All' || selectedCategory !== 'All' 
                    ? 'No notices match your current filters.' 
                    : 'There are no official announcements right now.'}
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); setSelectedCategory('All'); }}
                  className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2 rounded-xl hover:bg-primary/20 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 md:p-6 border-b border-border flex items-start justify-between bg-input/30">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryConfig(selectedNotice.category).bg} ${getCategoryConfig(selectedNotice.category).color}`}>
                  {React.createElement(getCategoryConfig(selectedNotice.category).icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black text-primary mb-1 pr-8">{selectedNotice.title}</h2>
                  <div className="flex items-center gap-3 text-xs font-bold text-secondary">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedNotice.date}</span>
                    <span className="uppercase tracking-widest bg-card border border-border px-2 py-0.5 rounded">{selectedNotice.category}</span>
                    {selectedNotice.isImportant && <span className="text-danger">IMPORTANT</span>}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors shrink-0"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="prose prose-sm max-w-none text-primary mb-8">
                <p className="leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedNotice.description}
                </p>
              </div>

              {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                <div className="border-t border-border pt-6">
                  <h4 className="font-bold text-sm text-secondary mb-3 flex items-center gap-2">
                    <Paperclip className="w-4 h-4" /> Attachments
                  </h4>
                  <div className="space-y-2">
                    {selectedNotice.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border bg-input/30 hover:bg-input transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-primary text-sm">{file.name}</p>
                            <p className="text-xs font-medium text-secondary">{file.size} • PDF</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(file.name)}
                          className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-colors"
                          title="Download File"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 bg-success/10 border border-success/20 rounded-xl p-3 flex items-center justify-center gap-2 text-success">
                <Check className="w-4 h-4" />
                <span className="text-xs font-bold">You have read this notice. Manager can view your read status.</span>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-input/30 flex justify-end">
              <button 
                onClick={() => setSelectedNotice(null)}
                className="bg-primary text-white font-bold text-sm px-8 py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
