import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { propertiesApi } from '@/app/owner/owner_lib/owner_api/OwnerProperties';
import { roomsApi } from '@/app/owner/owner_lib/owner_api/OwnerRooms';
import { bedsApi } from '@/app/owner/owner_lib/owner_api/OwnerBeds';
import { studentsApi } from '@/app/owner/owner_lib/owner_api/OwnerStudents';

interface OwnerStudentsAddModalProps {
  ownerId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OwnerStudentsAddModal({ ownerId, isOpen, onClose, onSuccess }: OwnerStudentsAddModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    roomId: '',
    bedId: '',
    rentAmount: 8000,
    depositAmount: 10000,
    moveInDate: new Date().toISOString().slice(0, 10),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [properties, setProperties] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [beds, setBeds] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setProperties(propertiesApi.listByOwner(ownerId));
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyId: '',
        roomId: '',
        bedId: '',
        rentAmount: 8000,
        depositAmount: 10000,
        moveInDate: new Date().toISOString().slice(0, 10),
      });
      setError('');
    }
  }, [isOpen, ownerId]);

  useEffect(() => {
    if (formData.propertyId) {
      setRooms(roomsApi.listByProperty(formData.propertyId));
      setFormData(prev => ({ ...prev, roomId: '', bedId: '' }));
      setBeds([]);
    }
  }, [formData.propertyId]);

  useEffect(() => {
    if (formData.roomId) {
      const roomBeds = bedsApi.listByRoom(formData.roomId);
      setBeds(roomBeds.filter((b: any) => b.status === 'available'));
      setFormData(prev => ({ ...prev, bedId: '' }));
    }
  }, [formData.roomId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.propertyId) return setError('Please select a property');
    
    setLoading(true);
    try {
      studentsApi.create(formData, ownerId);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <h2 className="text-xl font-bold text-primary">Onboard New Student</h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-page rounded-full transition-colors">
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-danger-bg border border-danger/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              <p className="text-sm text-danger-text">{error}</p>
            </div>
          )}

          <form id="add-student-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary">Full Name <span className="text-danger">*</span></label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Rahul Kumar" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary">Phone Number <span className="text-danger">*</span></label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="9876543210" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-secondary">Email Address <span className="text-danger">*</span></label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="rahul@example.com" />
                </div>
              </div>
            </div>

            {/* Placement Details */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Placement & Rent</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-secondary">Property <span className="text-danger">*</span></label>
                  <select required value={formData.propertyId} onChange={e => setFormData({...formData, propertyId: e.target.value})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option value="">Select Property</option>
                    {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary">Room (Optional)</label>
                  <select value={formData.roomId} onChange={e => setFormData({...formData, roomId: e.target.value})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" disabled={!formData.propertyId}>
                    <option value="">Select Room</option>
                    {rooms.map(r => <option key={r.id} value={r.id}>Room {r.number}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary">Bed (Optional)</label>
                  <select value={formData.bedId} onChange={e => setFormData({...formData, bedId: e.target.value})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" disabled={!formData.roomId}>
                    <option value="">Select Bed</option>
                    {beds.map(b => <option key={b.id} value={b.id}>Bed {b.code}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary">Monthly Rent (₹)</label>
                  <input type="number" required min="0" value={formData.rentAmount} onChange={e => setFormData({...formData, rentAmount: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary">Security Deposit (₹)</label>
                  <input type="number" required min="0" value={formData.depositAmount} onChange={e => setFormData({...formData, depositAmount: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-bg-page border border-border rounded-xl text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-border bg-bg-page shrink-0 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-secondary hover:text-primary hover:bg-card rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" form="add-student-form" disabled={loading} className="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </div>
      </div>
    </div>
  );
}
