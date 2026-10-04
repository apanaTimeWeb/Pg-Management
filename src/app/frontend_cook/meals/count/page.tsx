'use client';

import React, { useState } from 'react';
import { 
  Users,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Utensils,
  Calculator,
  ChevronRight,
  TrendingDown,
  PlaneTakeoff,
  Star
} from 'lucide-react';

interface StudentMealInfo {
  id: string;
  studentId: string;
  name: string;
  room: string;
  bed: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  specialMeal?: string;
}

const MOCK_STUDENTS: StudentMealInfo[] = [
  { id: '1', studentId: 'STU-1001', name: 'Aarav Patel', room: '101', bed: 'A', breakfast: true, lunch: true, dinner: true },
  { id: '2', studentId: 'STU-1002', name: 'Vikram Singh', room: '101', bed: 'B', breakfast: false, lunch: true, dinner: true, specialMeal: 'Jain Meal' },
  { id: '3', studentId: 'STU-1005', name: 'Rahul Verma', room: '102', bed: 'A', breakfast: true, lunch: false, dinner: false },
  { id: '4', studentId: 'STU-1008', name: 'Sneha Gupta', room: '201', bed: 'A', breakfast: true, lunch: true, dinner: true },
  { id: '5', studentId: 'STU-1011', name: 'Ananya Sharma', room: '202', bed: 'B', breakfast: false, lunch: false, dinner: true },
  { id: '6', studentId: 'STU-1015', name: 'Karan Malhotra', room: '305', bed: 'A', breakfast: true, lunch: true, dinner: true }
];

export default function StudentMealInfoPage() {
  const [students] = useState<StudentMealInfo[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter based on Name, ID, Room, or Bed
  const filteredStudents = students.filter(student => {
    const q = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(q) ||
      student.studentId.toLowerCase().includes(q) ||
      student.room.toLowerCase().includes(q) ||
      student.bed.toLowerCase().includes(q)
    );
  });

  const getStatusIcon = (status: boolean) => {
    return status 
      ? <CheckCircle2 className="w-4 h-4 text-green-500" />
      : <XCircle className="w-4 h-4 text-secondary/30" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Daily Meal Count & Attendance</h1>
            <p className="text-sm text-secondary">View calculated meal expectations and student statuses</p>
          </div>
        </div>

        {/* Privacy Enforcement Banner */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg shadow-sm max-w-md">
          <Lock className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-xs font-bold text-green-700 leading-tight">
            Privacy Enforced: You only have access to food-related data. Financial and personal details are hidden.
          </p>
        </div>
      </div>

      {/* Calculation Flow */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-max text-sm font-semibold text-secondary px-2">
          <div className="flex flex-col items-center">
            <Users className="w-5 h-5 mb-1 text-blue-500" />
            <span className="text-primary font-bold">Total Active</span>
            <span className="text-xs">72 Students</span>
          </div>
          <ChevronRight className="w-5 h-5 text-border" />
          <div className="flex flex-col items-center">
            <TrendingDown className="w-5 h-5 mb-1 text-orange-500" />
            <span className="text-primary font-bold">Meal Opt-Outs</span>
            <span className="text-xs">- 3 Students</span>
          </div>
          <ChevronRight className="w-5 h-5 text-border" />
          <div className="flex flex-col items-center">
            <PlaneTakeoff className="w-5 h-5 mb-1 text-red-500" />
            <span className="text-primary font-bold">Leave / Outing</span>
            <span className="text-xs">- 2 Students</span>
          </div>
          <ChevronRight className="w-5 h-5 text-border" />
          <div className="flex flex-col items-center">
            <Star className="w-5 h-5 mb-1 text-purple-500" />
            <span className="text-primary font-bold">Special Meals</span>
            <span className="text-xs">+ 1 Request</span>
          </div>
          <ChevronRight className="w-5 h-5 text-primary" />
          <div className="flex flex-col items-center bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
            <Utensils className="w-5 h-5 mb-1 text-primary" />
            <span className="text-primary font-black text-base">Final Expected Count</span>
            <span className="text-xs text-primary/80">Dynamically Calculated</span>
          </div>
        </div>
      </div>

      {/* Meal Count Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Breakfast Card */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Breakfast
            </h3>
            <span className="px-2.5 py-1 bg-page border border-border rounded-md text-xs font-bold text-secondary">
              7:30 AM
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Opted In</span>
              <span className="text-sm font-bold text-primary">68</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Extra (Guests/Staff)</span>
              <span className="text-sm font-bold text-primary">+ 2</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-bold text-primary">Expected to Prepare</span>
              <span className="text-2xl font-black text-blue-600">70</span>
            </div>
          </div>
        </div>

        {/* Lunch Card */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Lunch
            </h3>
            <span className="px-2.5 py-1 bg-page border border-border rounded-md text-xs font-bold text-secondary">
              1:00 PM
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Opted In</span>
              <span className="text-sm font-bold text-primary">65</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Extra (Guests/Staff)</span>
              <span className="text-sm font-bold text-primary">+ 0</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-bold text-primary">Expected to Prepare</span>
              <span className="text-2xl font-black text-orange-600">65</span>
            </div>
          </div>
        </div>

        {/* Dinner Card */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Dinner
            </h3>
            <span className="px-2.5 py-1 bg-page border border-border rounded-md text-xs font-bold text-secondary">
              8:30 PM
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Opted In</span>
              <span className="text-sm font-bold text-primary">70</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Extra (Guests/Staff)</span>
              <span className="text-sm font-bold text-primary">+ 0</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-bold text-primary">Expected to Prepare</span>
              <span className="text-2xl font-black text-indigo-600">70</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Specific List (from previous implementation) */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col mt-8">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border bg-page/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-secondary" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Name, Student ID, Room, or Bed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-primary transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold text-primary px-3 py-1.5 bg-page rounded-md border border-border">
              {filteredStudents.length} Students Listed
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-page/50 border-b border-border text-secondary font-semibold">
              <tr>
                <th className="px-5 py-4">Student Name & ID</th>
                <th className="px-5 py-4">Room & Bed</th>
                <th className="px-5 py-4 text-center">Breakfast Opt-in</th>
                <th className="px-5 py-4 text-center">Lunch Opt-in</th>
                <th className="px-5 py-4 text-center">Dinner Opt-in</th>
                <th className="px-5 py-4">Special Meal Request</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-primary">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-page/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-base">{student.name}</div>
                    <div className="text-xs font-medium text-secondary mt-0.5">{student.studentId}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-md text-xs font-bold inline-flex items-center gap-1">
                      Room {student.room} <span className="text-secondary">|</span> Bed {student.bed}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center">
                      {getStatusIcon(student.breakfast)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center">
                      {getStatusIcon(student.lunch)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center">
                      {getStatusIcon(student.dinner)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {student.specialMeal ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border bg-yellow-50 text-yellow-700 border-yellow-200 w-fit">
                        <Utensils className="w-3.5 h-3.5" />
                        {student.specialMeal}
                      </span>
                    ) : (
                      <span className="text-xs text-secondary italic">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertTriangle className="w-12 h-12 text-secondary/30 mb-4" />
              <h3 className="text-lg font-medium text-primary">No Students Found</h3>
              <p className="text-sm text-secondary mt-1">Check your search spelling or try a different Room/ID.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
