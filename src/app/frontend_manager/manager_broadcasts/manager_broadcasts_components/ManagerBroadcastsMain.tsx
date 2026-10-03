// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Megaphone, AlertTriangle, Droplets, Zap, Sparkles, Utensils, 
  Search, Users, DoorClosed, ChefHat, CheckCircle2, ChevronRight, 
  Eye, Send, FileText, CalendarClock, ShieldAlert
} from 'lucide-react';

type Step = 'create' | 'audience' | 'preview';
type NoticeType = 'General' | 'Water Shutdown' | 'Electricity Maintenance' | 'Cleaning Schedule' | 'Mess Timing' | 'Room Inspection' | 'Emergency' | 'Critical Policy';
type Audience = 'All Students' | 'Selected Rooms' | 'Selected Students' | 'Staff' | 'Cooks';

export default function ManagerBroadcastsMain() {
  const [currentStep, setCurrentStep] = useState<Step>('create');
  
  // Notice Form State
  const [noticeType, setNoticeType] = useState<NoticeType>('General');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Audience State
  const [selectedAudience, setSelectedAudience] = useState<Audience>('All Students');
  
  const handleNext = () => {
    if (currentStep === 'create') setCurrentStep('audience');
    else if (currentStep === 'audience') setCurrentStep('preview');
  };

  const handleBack = () => {
    if (currentStep === 'preview') setCurrentStep('audience');
    else if (currentStep === 'audience') setCurrentStep('create');
  };

  const isPolicy = noticeType === 'Critical Policy';

  const getIconForType = (type: NoticeType) => {
    switch (type) {
      case 'Water Shutdown': return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'Electricity Maintenance': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Cleaning Schedule': return <Sparkles className="w-5 h-5 text-teal-500" />;
      case 'Mess Timing': return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'Room Inspection': return <Search className="w-5 h-5 text-indigo-500" />;
      case 'Emergency': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Critical Policy': return <ShieldAlert className="w-5 h-5 text-purple-600" />;
      default: return <Megaphone className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNoticeBgColor = () => {
    if (noticeType === 'Emergency') return 'bg-red-50 border-red-200';
    if (isPolicy) return 'bg-purple-50 border-purple-200';
    if (noticeType === 'Water Shutdown' || noticeType === 'Electricity Maintenance') return 'bg-orange-50 border-orange-200';
    return 'bg-white border-border';
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Megaphone className="w-6 h-6"/>
            </div>
            Notices & Broadcasts
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Create and publish operational notices to students and staff.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        
        {/* Left Side: Wizard Form */}
        <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between p-6 border-b border-border/50 bg-page/30 shrink-0">
            <div className={`flex flex-col items-center gap-2 ${currentStep === 'create' || currentStep === 'audience' || currentStep === 'preview' ? 'text-indigo-600' : 'text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 'create' ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-indigo-100'}`}>1</div>
              <span className="text-xs font-bold">Create</span>
            </div>
            <div className="h-px bg-border/80 flex-1 mx-4"></div>
            <div className={`flex flex-col items-center gap-2 ${currentStep === 'audience' || currentStep === 'preview' ? 'text-indigo-600' : 'text-secondary opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 'audience' ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : currentStep === 'preview' ? 'bg-indigo-100' : 'bg-page border-2 border-border'}`}>2</div>
              <span className="text-xs font-bold">Audience</span>
            </div>
            <div className="h-px bg-border/80 flex-1 mx-4"></div>
            <div className={`flex flex-col items-center gap-2 ${currentStep === 'preview' ? 'text-indigo-600' : 'text-secondary opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 'preview' ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-page border-2 border-border'}`}>3</div>
              <span className="text-xs font-bold">Publish</span>
            </div>
          </div>

          {/* Step 1: Create Notice */}
          {currentStep === 'create' && (
            <div className="p-6 flex-1 overflow-y-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Notice Type</label>
                <select 
                  value={noticeType}
                  onChange={(e) => setNoticeType(e.target.value as NoticeType)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm font-bold text-primary focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="General">General Notice</option>
                  <option value="Water Shutdown">Water Shutdown</option>
                  <option value="Electricity Maintenance">Electricity Maintenance</option>
                  <option value="Cleaning Schedule">Cleaning Schedule</option>
                  <option value="Mess Timing">Mess Timing Update</option>
                  <option value="Room Inspection">Room Inspection</option>
                  <option value="Emergency">🚨 Emergency Alert</option>
                  <option value="Critical Policy">⚠️ Critical Policy Change</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Notice Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scheduled Water Shutdown on Sunday"
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm font-bold text-primary focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide full details of the notice here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm font-medium text-primary focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Audience */}
          {currentStep === 'audience' && (
            <div className="p-6 flex-1 overflow-y-auto space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-primary mb-2">Who should receive this?</h3>
              
              <div 
                onClick={() => setSelectedAudience('All Students')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedAudience === 'All Students' ? 'border-indigo-600 bg-indigo-50/50' : 'border-border/60 bg-white hover:border-indigo-300'}`}
              >
                <div className={`p-2 rounded-lg ${selectedAudience === 'All Students' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">All Students</h4>
                  <p className="text-xs text-secondary mt-0.5">Send to every active student in the PG.</p>
                </div>
                {selectedAudience === 'All Students' && <CheckCircle2 className="w-5 h-5 text-indigo-600 ml-auto" />}
              </div>

              <div 
                onClick={() => setSelectedAudience('Selected Rooms')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedAudience === 'Selected Rooms' ? 'border-indigo-600 bg-indigo-50/50' : 'border-border/60 bg-white hover:border-indigo-300'}`}
              >
                <div className={`p-2 rounded-lg ${selectedAudience === 'Selected Rooms' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <DoorClosed className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary">Selected Rooms / Floors</h4>
                  <p className="text-xs text-secondary mt-0.5">Target specific areas (e.g. for maintenance).</p>
                </div>
                {selectedAudience === 'Selected Rooms' && <CheckCircle2 className="w-5 h-5 text-indigo-600 ml-auto" />}
              </div>

              <div 
                onClick={() => setSelectedAudience('Staff')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedAudience === 'Staff' ? 'border-indigo-600 bg-indigo-50/50' : 'border-border/60 bg-white hover:border-indigo-300'}`}
              >
                <div className={`p-2 rounded-lg ${selectedAudience === 'Staff' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">All Staff (Wardens, Guards, Cleaners)</h4>
                  <p className="text-xs text-secondary mt-0.5">Internal operational notices.</p>
                </div>
                {selectedAudience === 'Staff' && <CheckCircle2 className="w-5 h-5 text-indigo-600 ml-auto" />}
              </div>

              <div 
                onClick={() => setSelectedAudience('Cooks')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedAudience === 'Cooks' ? 'border-indigo-600 bg-indigo-50/50' : 'border-border/60 bg-white hover:border-indigo-300'}`}
              >
                <div className={`p-2 rounded-lg ${selectedAudience === 'Cooks' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Kitchen Staff / Cooks</h4>
                  <p className="text-xs text-secondary mt-0.5">Menu changes, timings, or kitchen operations.</p>
                </div>
                {selectedAudience === 'Cooks' && <CheckCircle2 className="w-5 h-5 text-indigo-600 ml-auto" />}
              </div>

            </div>
          )}

          {/* Step 3: Publish / Preview Info */}
          {currentStep === 'preview' && (
            <div className="p-6 flex-1 overflow-y-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
              
              <div className="text-center p-6 bg-page/50 rounded-2xl border border-border/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border">
                  <Eye className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-black text-primary">Review & Publish</h3>
                <p className="text-sm text-secondary mt-1 max-w-sm mx-auto">Please check the live preview on the right before sending out this notification.</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-bold text-secondary">Target Audience:</span>
                  <span className="text-sm font-black text-primary bg-page px-3 py-1 rounded-lg border border-border">{selectedAudience}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-bold text-secondary">Notification Channels:</span>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">In-App</span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded">Push</span>
                  </div>
                </div>
              </div>

              {isPolicy && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-purple-900 text-sm">Owner Approval Required</h4>
                    <p className="text-xs text-purple-700 mt-1">Because this is marked as a Critical Policy change, it will not be sent immediately. It will be forwarded to the Owner for approval.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="p-4 border-t border-border/50 bg-page/30 flex items-center justify-between shrink-0">
            {currentStep !== 'create' ? (
              <button 
                onClick={handleBack}
                className="px-6 py-2.5 bg-white border border-border/60 text-secondary hover:text-primary rounded-xl text-sm font-bold shadow-sm transition-all"
              >
                Back
              </button>
            ) : <div></div>}
            
            {currentStep !== 'preview' ? (
              <button 
                onClick={handleNext}
                disabled={!title || !description}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                className={`px-6 py-2.5 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 ${isPolicy ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isPolicy ? (
                  <><ShieldAlert className="w-4 h-4" /> Request Owner Approval</>
                ) : (
                  <><Send className="w-4 h-4" /> Publish Now</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="bg-page border border-border/60 rounded-2xl shadow-sm flex flex-col p-6 h-full relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Megaphone className="w-48 h-48" />
          </div>

          <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Live Preview (Student App)
          </h3>

          <div className="flex-1 flex items-center justify-center relative z-10">
            {/* Mobile Phone Mockup Container */}
            <div className="w-[320px] h-[550px] bg-white rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl relative overflow-hidden flex flex-col">
              
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
              
              {/* Phone Header */}
              <div className="bg-indigo-600 pt-10 pb-4 px-4 text-white shrink-0">
                <h4 className="font-bold">Notices</h4>
              </div>
              
              {/* Phone Content */}
              <div className="flex-1 bg-gray-50 p-4">
                
                {title || description ? (
                  <div className={`p-4 rounded-xl border shadow-sm ${getNoticeBgColor()}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {getIconForType(noticeType)}
                      <span className={`text-xs font-black uppercase tracking-wider ${noticeType === 'Emergency' ? 'text-red-600' : isPolicy ? 'text-purple-600' : 'text-gray-500'}`}>
                        {noticeType}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-tight text-lg">
                      {title || 'Notice Title Goes Here'}
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {description || 'Full description of the notice will appear here for the students to read.'}
                    </p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <CalendarClock className="w-3 h-3" />
                      <span>{new Date().toLocaleDateString()} • Sent by Manager</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <FileText className="w-12 h-12 text-gray-200 mb-2" />
                    <p className="text-sm text-gray-400 font-medium">Start typing to see the preview here</p>
                  </div>
                )}
                
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}