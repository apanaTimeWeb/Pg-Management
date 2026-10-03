const fs = require('fs');
const path = require('path');

const studentPages = [
  { path: 'src/app/frontend_student/frontend_student_profile/page.tsx', title: 'My Profile', icon: 'User', desc: 'View and update your personal details.' },
  { path: 'src/app/frontend_student/frontend_student_room/page.tsx', title: 'My Room', icon: 'Bed', desc: 'Details about your accommodation and roommates.' },
  { path: 'src/app/frontend_student/frontend_student_rent/page.tsx', title: 'Rent & Dues', icon: 'IndianRupee', desc: 'Track your pending rent and transaction history.' },
  { path: 'src/app/frontend_student/frontend_student_documents/page.tsx', title: 'My Documents', icon: 'FileText', desc: 'Manage your ID proofs and rental agreements.' },
];

const generateStudentTemplate = (title, icon, desc) => {
  let mainContent = '';
  
  if (title === 'My Profile') {
    mainContent = `
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Full Name</p>
                  <p className="text-primary font-medium">Aman Singh</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Phone Number</p>
                  <p className="text-primary font-medium flex items-center gap-2"><Phone className="w-4 h-4 text-secondary"/> +91 9876543210</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Email Address</p>
                  <p className="text-primary font-medium flex items-center gap-2"><Mail className="w-4 h-4 text-secondary"/> aman.singh@example.com</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Date of Birth</p>
                  <p className="text-primary font-medium flex items-center gap-2"><Calendar className="w-4 h-4 text-secondary"/> 15 Aug 2002</p>
                </div>
              </div>
    `;
  } else if (title === 'My Room') {
    mainContent = `
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                  <Bed className="w-10 h-10 text-blue-600 mx-auto mb-3"/>
                  <h2 className="text-3xl font-black text-blue-900">304</h2>
                  <p className="text-sm font-bold text-blue-700 mt-1">Bed A (Double AC)</p>
                </div>
                <div className="w-full sm:w-2/3 space-y-4">
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Property</p>
                    <p className="text-primary font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-[#F5A623]"/> PG Varanasi Main</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Roommate</p>
                    <p className="text-primary font-medium">Rahul Sharma (Bed B)</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Move-in Date</p>
                    <p className="text-primary font-medium">01 Oct 2026</p>
                  </div>
                </div>
              </div>
    `;
  } else if (title === 'Rent & Dues') {
    mainContent = `
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card rounded-lg border border-border"><IndianRupee className="w-5 h-5 text-secondary"/></div>
                      <div>
                        <p className="font-bold text-primary text-sm">October Rent</p>
                        <p className="text-xs text-secondary mt-0.5">05 Oct 2026</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary">₹8,000</p>
                      <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1 inline-block uppercase">Paid</span>
                    </div>
                  </div>
                ))}
              </div>
    `;
  } else {
    mainContent = `
              <div className="space-y-4">
                {[
                  { name: 'Aadhar Card', size: '1.2 MB', date: '01 Oct 2026' },
                  { name: 'Rental Agreement', size: '2.5 MB', date: '02 Oct 2026' }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-page hover:bg-input transition-colors rounded-xl border border-border group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg"><FileText className="w-6 h-6 text-blue-600"/></div>
                      <div>
                        <p className="font-bold text-primary text-sm">{doc.name}</p>
                        <p className="text-xs text-secondary mt-0.5">{doc.size} • Uploaded {doc.date}</p>
                      </div>
                    </div>
                    <button className="p-2 text-secondary hover:text-blue-600 bg-card rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
              </div>
    `;
  }

  let buttonHtml = '';
  if (title === 'Rent & Dues') {
    buttonHtml = `
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <CreditCard className="w-4 h-4" /> Pay Now
            </button>
    `;
  } else if (title === 'My Documents') {
    buttonHtml = `
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <UploadCloud className="w-4 h-4" /> Upload Document
            </button>
    `;
  } else {
    buttonHtml = `
            <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <Edit3 className="w-4 h-4" /> Edit Details
            </button>
    `;
  }

  return `'use client';

import React from 'react';
import { 
  ${icon}, Download, Edit3, Plus, Search, Info, IndianRupee, MapPin, Phone, Mail, Calendar, UploadCloud, CreditCard, Bed, FileText
} from 'lucide-react';

export default function Student${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
              <${icon} className="w-6 h-6"/>
            </div>
            ${title}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-2 font-medium">${desc}</p>
        </div>
        
        <div className="flex items-center gap-3">
          ${buttonHtml}
        </div>
      </div>

      {/* Dynamic Content Based on Page */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Info Card */}
        <div className="md:col-span-8 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-page/30 flex items-center justify-between">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500"/>
              ${title === 'My Room' ? 'Accommodation Details' : title === 'Rent & Dues' ? 'Transaction Ledger' : title === 'My Documents' ? 'Uploaded Files' : 'Personal Information'}
            </h3>
          </div>
          <div className="p-6">
            ${mainContent}
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-[#1A3A5C] to-[#122a42] rounded-2xl shadow-lg border border-blue-800 p-6 text-white h-max">
          <h3 className="font-bold mb-4 flex items-center gap-2 opacity-90"><Info className="w-5 h-5"/> Quick Status</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Current Balance</p>
              <h2 className="text-2xl font-black flex items-center"><IndianRupee className="w-5 h-5 mr-1"/> 0.00</h2>
              <p className="text-xs text-blue-200 mt-1">All dues cleared</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Next Billing</p>
              <h3 className="text-lg font-bold">01 Nov 2026</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
`;
}

studentPages.forEach(page => {
  const absolutePath = path.join(__dirname, page.path);
  const dirPath = path.dirname(absolutePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(absolutePath, generateStudentTemplate(page.title, page.icon, page.desc), 'utf8');
});
