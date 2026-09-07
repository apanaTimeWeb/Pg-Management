// RESPONSIBILITY: Renders the OwnerPropertiesCreateLocation component. Receives data via props/hooks.

import { MapPin } from 'lucide-react';

export interface OwnerPropertiesCreateLocationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function OwnerPropertiesCreateLocation({ formData, handleInputChange }: OwnerPropertiesCreateLocationProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border bg-[rgba(99,102,241,0.02)] flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold text-primary">Location & Contact</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-secondary">Complete Address *</label>
          <input required type="text" name="address" value={formData.address} onChange={handleInputChange}
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Plot no, Street, Area"
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-medium text-secondary">City *</label>
          <input required type="text" name="city" value={formData.city} onChange={handleInputChange}
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="e.g. Patna, Delhi"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-secondary">Pincode *</label>
          <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="800001"
          />
        </div>
        
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-secondary">Landmark (Optional)</label>
          <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange}
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="e.g. Near Metro Station"
          />
        </div>
      </div>
    </div>
  );
}
