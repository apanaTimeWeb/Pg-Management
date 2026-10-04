// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Filter, Phone, MapPin, IndianRupee, 
  CalendarDays, CheckCircle2, AlertTriangle, UserCheck, 
  Bed, FileText, Lock, MessageSquare, LogOut, Wrench
} from 'lucide-react';

type StudentStatus = 'Active' | 'Pending' | 'Notice Period' | 'On Leave' | 'Checked Out' | 'Suspended';

interface Student {
  id: string;
  name: string;
  mobile: string;
  room: string;
  bed: string;
  joiningDate: string;
  rent: number;
  due: number;
  attendance: 'Present' | 'Absent' | 'Late' | 'Unmarked';
  status: StudentStatus;
  building: string;
  floor: string;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: 'ST-1001', name: 'Rahul Sharma', mobile: '+91 9876543210', 
    room: '102', bed: 'B', joiningDate: '01 Sep 2026', rent: 8000, due: 0, 
    attendance: 'Present', status: 'Active', building: 'Block A', floor: '1st Floor'
  },
  {
    id: 'ST-1002', name: 'Amit Kumar', mobile: '+91 8765432109', 
    room: '205', bed: 'A', joiningDate: '15 Sep 2026', rent: 9000, due: 4500, 
    attendance: 'Unmarked', status: 'Notice Period', building: 'Block A', floor: '2nd Floor'
  },
  {
    id: 'ST-1003', name: 'Suresh Patel', mobile: '+91 7654321098', 
    room: '304', bed: 'C', joiningDate: '10 Aug 2026', rent: 8500, due: 0, 
    attendance: 'Absent', status: 'On Leave', building: 'Block B', floor: '3rd Floor'
  },
  {
    id: 'ST-1004', name: 'Vikas Singh', mobile: '+91 6543210987', 
    room: '105', bed: 'A', joiningDate: '05 Sep 2026', rent: 7500, due: 0, 
    attendance: 'Present', status: 'Active', building: 'Block A', floor: '1st Floor'
  },
  {
    id: 'ST-1005', name: 'Rohan Gupta', mobile: '+91 5432109876', 
    room: '110', bed: 'B', joiningDate: '20 Sep 2026', rent: 8000, due: 8000, 
    attendance: 'Late', status: 'Pending', building: 'Block B', floor: '1st Floor'
  }
];

export default function ManagerStudentsMain() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(INITIAL_STUDENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | StudentStatus>('All');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.mobile.includes(searchTerm) || 
                          s.room.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: StudentStatus) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Notice Period': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'On Leave': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Checked Out': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Suspended': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getAttendanceColor = (att: string) => {
    switch (att) {
      case 'Present': return 'text-green-600 bg-green-50';
      case 'Absent': return 'text-red-600 bg-red-50';
      case 'Late': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Users className="w-6 h-6"/>
            </div>
            Student Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Master list of all students, operational status, and quick actions.</p>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
            {['All', 'Active', 'Notice Period', 'On Leave', 'Pending', 'Checked Out'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filterStatus === status 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-secondary border-border/60 hover:border-indigo-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-border rounded-lg text-secondary hover:text-indigo-600 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input 
                type="text" 
                placeholder="Search name, phone, room..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          
          {/* Left Side: List */}
          <div className="lg:w-1/3 border-r border-border/50 flex flex-col min-h-0 bg-white">
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredStudents.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedStudent.id === s.id 
                      ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                      : 'bg-transparent border border-transparent hover:bg-page/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-primary truncate">{s.name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusColor(s.status)}`}>
                      {s.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-secondary font-medium">Rm {s.room}-{s.bed}</p>
                    <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getAttendanceColor(s.attendance)}`}>{s.attendance}</p>
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-center p-8 text-secondary text-sm">No students found.</div>
              )}
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-y-auto">
            
            {/* Header Info */}
            <div className="p-6 border-b border-border/50 bg-white shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedStudent.status)}`}>
                  Status: {selectedStudent.status}
                </span>
                <span className="text-sm font-bold text-secondary">ID: {selectedStudent.id}</span>
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black text-primary leading-tight">{selectedStudent.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-bold text-secondary flex items-center gap-1"><Phone className="w-4 h-4 text-indigo-400"/> {selectedStudent.mobile}</span>
                    <span className="text-sm font-bold text-secondary flex items-center gap-1"><CalendarDays className="w-4 h-4 text-indigo-400"/> Joined: {selectedStudent.joiningDate}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setEditModalOpen(true)}
                  className="px-4 py-2 bg-page border border-border text-primary hover:bg-gray-100 rounded-lg text-xs font-bold shadow-sm transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 space-y-6">
              
              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1 mb-2"><MapPin className="w-3.5 h-3.5"/> Accommodation</p>
                  <p className="font-black text-primary text-lg">Rm {selectedStudent.room} <span className="text-secondary font-medium">| Bed {selectedStudent.bed}</span></p>
                  <p className="text-xs text-secondary mt-1">{selectedStudent.building}, {selectedStudent.floor}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1 mb-2"><IndianRupee className="w-3.5 h-3.5"/> Financials</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Rent:</span>
                    <span className="font-bold text-primary">₹ {selectedStudent.rent}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-secondary">Dues:</span>
                    <span className={`font-bold ${selectedStudent.due > 0 ? 'text-red-600' : 'text-green-600'}`}>₹ {selectedStudent.due}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1 mb-2"><UserCheck className="w-3.5 h-3.5"/> Today's Attendance</p>
                  <p className={`inline-block px-3 py-1 rounded-lg text-sm font-black border ${
                    selectedStudent.attendance === 'Present' ? 'bg-green-50 text-green-700 border-green-200' : 
                    selectedStudent.attendance === 'Absent' ? 'bg-red-50 text-red-700 border-red-200' : 
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {selectedStudent.attendance}
                  </p>
                </div>

              </div>

              {selectedStudent.status === 'Notice Period' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-900">Student is on Notice Period</h4>
                    <p className="text-sm text-yellow-800 mt-1">This student has requested to leave. Please prepare for Check-Out and ensure all dues are cleared before their exit date.</p>
                  </div>
                </div>
              )}

              {/* Quick Actions Grid */}
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-indigo-600" /> Manager Quick Actions
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  
                  <button className="flex flex-col items-center justify-center p-4 bg-page border border-border hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-all group">
                    <Bed className="w-5 h-5 text-secondary group-hover:text-indigo-600 mb-2" />
                    <span className="text-xs font-bold text-primary text-center">Transfer<br/>Bed/Room</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-page border border-border hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-all group">
                    <UserCheck className="w-5 h-5 text-secondary group-hover:text-indigo-600 mb-2" />
                    <span className="text-xs font-bold text-primary text-center">Record<br/>Attendance</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-page border border-border hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-all group">
                    <IndianRupee className="w-5 h-5 text-secondary group-hover:text-indigo-600 mb-2" />
                    <span className="text-xs font-bold text-primary text-center">Record<br/>Payment</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-page border border-border hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-all group">
                    <FileText className="w-5 h-5 text-secondary group-hover:text-indigo-600 mb-2" />
                    <span className="text-xs font-bold text-primary text-center">View<br/>Documents</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-page border border-border hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-all group">
                    <MessageSquare className="w-5 h-5 text-secondary group-hover:text-indigo-600 mb-2" />
                    <span className="text-xs font-bold text-primary text-center">View<br/>Complaints</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-page border border-red-200 hover:bg-red-50 rounded-xl transition-all group">
                    <LogOut className="w-5 h-5 text-red-500 mb-2" />
                    <span className="text-xs font-bold text-red-700 text-center">Initiate<br/>Check-Out</span>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal (with restrictions) */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-page/80 flex items-center justify-between">
              <h3 className="font-black text-primary flex items-center gap-2">
                Edit Student Profile
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-secondary hover:text-red-500">
                <LogOut className="w-5 h-5 rotate-180" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setEditModalOpen(false); alert('Profile updated successfully.'); }} className="p-6 space-y-4">
              
              <div className="p-3 bg-gray-100 border border-border rounded-lg flex items-start gap-2 mb-4">
                <Lock className="w-4 h-4 text-secondary mt-0.5" />
                <p className="text-xs text-secondary font-medium">Certain fields like <b>Rent Amount, Discounts, and Agreements</b> are locked and can only be modified by the Owner.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Full Name</label>
                  <input required type="text" defaultValue={selectedStudent.name} className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Mobile No.</label>
                  <input required type="text" defaultValue={selectedStudent.mobile} className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Emergency Contact</label>
                <input type="text" defaultValue="+91 9998887776 (Father)" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 opacity-70">
                <div>
                  <label className="text-sm font-bold text-secondary flex items-center gap-1"><Lock className="w-3 h-3"/> Base Rent</label>
                  <input type="text" readOnly defaultValue={`₹ ${selectedStudent.rent}`} className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary flex items-center gap-1"><Lock className="w-3 h-3"/> Discount</label>
                  <input type="text" readOnly defaultValue="₹ 0" className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg cursor-not-allowed" />
                </div>
              </div>

              <div className="p-4 border-t border-border/50 bg-gray-50 flex items-center justify-end gap-3 mt-4 -mx-6 -mb-6">
                <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}