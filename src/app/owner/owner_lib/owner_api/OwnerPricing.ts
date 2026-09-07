export const pricingApi = {
  listByProperty: (propertyId: string) => {
    return [
      { id: '1', name: 'Single Bed Standard', amount: 8000, duration: 'monthly' },
      { id: '2', name: 'Double Bed Standard', amount: 6000, duration: 'monthly' }
    ];
  },
  create: (rule: any, ownerId: string) => { return { ...rule, id: Date.now().toString() }; },
  delete: (id: string, ownerId: string) => {}
};
