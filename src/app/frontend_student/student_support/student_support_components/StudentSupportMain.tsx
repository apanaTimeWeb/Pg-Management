'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  HelpCircle, MessageSquare, BookOpen, AlertCircle, FileText,
  CreditCard, Home, Utensils, CalendarOff, Ticket, Plus,
  ChevronDown, Search, Paperclip, Send, RefreshCcw, ShieldAlert, CheckSquare
} from 'lucide-react';

export function StudentSupportMain() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || 'faqs';
  const [activeTab, setActiveTab] = useState(initialView === 'tickets' ? 'tickets' : 'faqs');

  // FAQs data
  const faqCategories = [
    { id: 'rules', title: 'PG Rules', icon: BookOpen, count: 12 },
    { id: 'payment', title: 'Payment Help', icon: CreditCard, count: 8 },
    { id: 'room', title: 'Room Help', icon: Home, count: 5 },
    { id: 'mess', title: 'Mess Help', icon: Utensils, count: 6 },
    { id: 'leave', title: 'Leave Help', icon: CalendarOff, count: 4 },
    { id: 'complaint', title: 'Complaint Help', icon: AlertCircle, count: 7 },
  ];

  // Dummy Tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-1024',
      category: 'Payment Issue',
      status: 'Resolved',
      date: '2026-09-28',
      description: 'Rent receipt for September is not generating in the app.',
      messages: [
        { sender: 'student', text: 'Rent receipt for September is not generating in the app.', time: '10:00 AM' },
        { sender: 'manager', text: 'We had a sync issue. It is resolved now. You can download the receipt.', time: '11:30 AM' }
      ]
    },
    {
      id: 'TKT-1029',
      category: 'Room Issue',
      status: 'Open',
      date: '2026-10-02',
      description: 'I want to change my room from 102 to 105.',
      messages: [
        { sender: 'student', text: 'I want to change my room from 102 to 105 as discussed.', time: '02:00 PM' }
      ]
    }
  ]);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  return (
    <div className="w-full space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-primary flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" /> Help & Support
        </h1>
        <p className="text-sm text-secondary mt-1">Find answers to your questions or raise a support ticket.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        <button 
          onClick={() => setActiveTab('faqs')}
          className={`pb-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'faqs' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}
        >
          Help Center (FAQs)
        </button>
        <button 
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'tickets' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}
        >
          My Support Tickets
        </button>
      </div>

      {/* Help Center (FAQs) View */}
      {activeTab === 'faqs' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search help articles, rules, or FAQs..." 
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-primary font-medium focus:outline-none focus:border-primary shadow-sm transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {faqCategories.map((cat) => (
              <div key={cat.id} className="bg-card border border-border rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-primary hover:shadow-md cursor-pointer transition-all group">
                <div className="w-12 h-12 rounded-full bg-input flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <cat.icon className="w-6 h-6 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <span className="font-bold text-primary text-sm mt-2">{cat.title}</span>
                <span className="text-xs text-secondary font-medium">{cat.count} Articles</span>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mt-8">
            <div className="p-4 border-b border-border bg-input/30 font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Frequently Asked Questions
            </div>
            <div className="divide-y divide-border">
              {[
                { q: "What are the visiting hours for guests?", a: "Visitors are allowed in the common areas between 10:00 AM and 08:00 PM. No overnight stays are permitted without prior manager approval." },
                { q: "How do I pay my rent online?", a: "You can pay your rent from the 'Fees & Payments' section using UPI, Credit/Debit Cards, or Net Banking. Once paid, receipts are automatically generated." },
                { q: "What should I do if I lose my room key?", a: "Report it immediately by raising a Support Ticket under 'Room Issue'. A replacement fee of ₹500 will be charged." }
              ].map((faq, i) => (
                <div key={i} className="p-1">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 font-bold text-primary text-sm text-left hover:bg-input/50 transition-colors rounded-lg">
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-secondary shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4 pt-1 text-sm text-secondary leading-relaxed pl-6 border-l-2 border-primary/30 ml-4 mb-2 animate-in slide-in-from-top-1 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support Tickets View */}
      {activeTab === 'tickets' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-center bg-card border border-border rounded-xl p-4 shadow-sm">
            <div>
              <h3 className="font-bold text-primary">Need Help?</h3>
              <p className="text-xs text-secondary mt-1 font-medium">Create a ticket and our manager will assist you.</p>
            </div>
            <button className="bg-primary text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-md hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Ticket
            </button>
          </div>

          <div className="space-y-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:border-primary/50">
                <div 
                  className="p-4 cursor-pointer hover:bg-input/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${ticket.status === 'Resolved' ? 'bg-success/10 border-success/20 text-success' : 'bg-warning/10 border-warning/20 text-warning'}`}>
                      {ticket.status === 'Resolved' ? <CheckSquare className="w-6 h-6" /> : <Ticket className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-primary text-sm md:text-base">{ticket.id} — {ticket.category}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${ticket.status === 'Resolved' ? 'bg-success/10 text-success border border-success/20' : 'bg-warning/10 text-warning border border-warning/20'}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-xs text-secondary font-medium flex items-center gap-1.5">
                        <CalendarOff className="w-3.5 h-3.5" /> {ticket.date} • {ticket.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-secondary shrink-0 transition-transform ${expandedTicket === ticket.id ? 'rotate-180' : ''}`} />
                </div>

                {expandedTicket === ticket.id && (
                  <div className="border-t border-border bg-page p-4 md:p-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-5 mb-6">
                      {ticket.messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3.5 text-sm shadow-sm ${
                            msg.sender === 'student' 
                              ? 'bg-primary text-white rounded-br-sm' 
                              : 'bg-card border border-border text-primary rounded-bl-sm'
                          }`}>
                            <p className="leading-relaxed font-medium">{msg.text}</p>
                            <span className={`text-[10px] block mt-1.5 font-bold tracking-wide ${msg.sender === 'student' ? 'text-white/70' : 'text-secondary'}`}>
                              {msg.time} {msg.sender === 'manager' ? '• Manager' : '• You'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {ticket.status === 'Open' ? (
                      <div className="flex items-end gap-2 mt-4 relative bg-card p-2 rounded-xl border border-border shadow-sm">
                        <button className="p-2.5 text-secondary hover:text-primary hover:bg-input rounded-lg transition-colors shrink-0">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <textarea 
                          placeholder="Type your reply here..." 
                          className="flex-1 bg-transparent px-2 py-2.5 text-sm text-primary font-medium focus:outline-none min-h-[44px] max-h-32 resize-none"
                          rows={1}
                        />
                        <button className="bg-primary text-white p-2.5 rounded-lg shadow-sm hover:bg-primary/90 transition-colors shrink-0">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-success/5 border border-success/20 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-sm font-bold text-success">
                          <ShieldAlert className="w-5 h-5" /> This ticket has been resolved.
                        </div>
                        <button className="text-sm font-bold text-primary bg-card border border-border px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-input transition-colors shadow-sm">
                          <RefreshCcw className="w-4 h-4" /> Reopen Ticket
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
