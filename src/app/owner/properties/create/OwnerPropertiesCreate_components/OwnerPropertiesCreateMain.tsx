'use client';

// RESPONSIBILITY: Renders the OwnerPropertiesCreateMain component. Receives data via props/hooks.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { api } from '@/lib/api';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/lib/ui/ToastContext';
import { useOwnerPropertyContext } from '@/app/owner/components/OwnerPropertyContext';

import { OwnerPropertiesCreateBasicInfo } from './OwnerPropertiesCreateBasicInfo';
import { OwnerPropertiesCreateLocation } from './OwnerPropertiesCreateLocation';
import { OwnerPropertiesCreateConfig } from './OwnerPropertiesCreateConfig';
import { OwnerPropertiesCreateAmenities } from './OwnerPropertiesCreateAmenities';
import { OwnerPropertiesCreatePhotos } from './OwnerPropertiesCreatePhotos';

export function OwnerPropertiesCreateMain() {
  const router = useRouter();
  const { showToast } = useToast();
  const { refreshProperties } = useOwnerPropertyContext();
  const user = typeof window !== 'undefined' ? getSession() : null;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.ownerId) {
      try {
        const details = api.owners.getOwner360(user.ownerId);
        if (!details || !details.subscription || details.subscription.status !== 'active' || details.subscription.planId === 'none') {
          router.push('/owner/subscription');
          showToast('Please purchase a subscription plan to create a PG.', 'error');
        }
      } catch (err) {
      }
    }
  }, [user, router, showToast]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'coed',
    description: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    contactName: '',
    contactPhone: '',
    floorsCount: 1,
    nightEntryTime: '23:00',
    noticePeriodDays: 30,
    messEnabled: false,
    visitorCutoff: '20:00',
    defaultDeposit: 0,
    rentCycleDate: 1,
    photos: '',
    generateRooms: false,
    singleRoomsCount: 0,
    doubleRoomsCount: 0,
    tripleRoomsCount: 0
  });

  const [amenities, setAmenities] = useState<string[]>(['Wifi', 'Power Backup', 'CCTV']);
  const availableAmenities = ['Wifi', 'Power Backup', 'CCTV', 'AC', 'Washing Machine', 'RO Water', 'Parking', 'Gym', 'TV', 'Lounge'];

  const handleToggleAmenity = (am: string) => {
    if (amenities.includes(am)) {
      setAmenities(amenities.filter(a => a !== am));
    } else {
      setAmenities([...amenities, am]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'name' && !formData.slug) {
        setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!user) {
      setError('Session expired. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const photosArray = formData.photos.split(',').map(s => s.trim()).filter(Boolean);
      
      const newProp = api.properties.create({
        ownerId: user.id,
        name: formData.name,
        slug: formData.slug,
        type: formData.type as 'boys'|'girls'|'coed',
        description: formData.description,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        landmark: formData.landmark,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        floorsCount: formData.floorsCount,
        nightEntryTime: formData.nightEntryTime,
        noticePeriodDays: formData.noticePeriodDays,
        messEnabled: formData.messEnabled,
        visitorCutoff: formData.visitorCutoff,
        defaultDeposit: formData.defaultDeposit,
        rentCycleDate: formData.rentCycleDate,
        amenities: amenities,
        photos: photosArray,
        generateRooms: formData.generateRooms || formData.singleRoomsCount > 0 || formData.doubleRoomsCount > 0 || formData.tripleRoomsCount > 0,
        singleRoomsCount: formData.singleRoomsCount,
        doubleRoomsCount: formData.doubleRoomsCount,
        tripleRoomsCount: formData.tripleRoomsCount
      });

      showToast('Property branch created successfully!', 'success');
      await new Promise(resolve => setTimeout(resolve, 500));
      refreshProperties();
      router.push(`/owner/properties/${newProp.id}`);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create property. Check your subscription limit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/owner/properties" className="p-2 hover:bg-card rounded-full transition-colors text-secondary hover:text-primary border border-transparent hover:border-border">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[22px] font-bold text-primary">Add New Property</h1>
          <p className="text-sm text-secondary">Set up a new PG branch and its configuration.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger-bg border border-danger text-danger rounded-md flex items-center gap-3 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <OwnerPropertiesCreateBasicInfo formData={formData} handleInputChange={handleInputChange} />
        <OwnerPropertiesCreateLocation formData={formData} handleInputChange={handleInputChange} />
        <OwnerPropertiesCreateConfig formData={formData} handleInputChange={handleInputChange} />
        <OwnerPropertiesCreateAmenities amenities={amenities} handleToggleAmenity={handleToggleAmenity} availableAmenities={availableAmenities} />
        <OwnerPropertiesCreatePhotos formData={formData} handleInputChange={handleInputChange} />

        <div className="flex justify-end pt-4 pb-10">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:-translate-y-0.5"
          >
            {loading ? 'Creating...' : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Create Property
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
