export const foodApi = {
  getByProperty: (propertyId: string) => {
    return {
      id: propertyId,
      status: 'Active',
      dailyMenu: {
        monday: { breakfast: 'Poha', lunch: 'Dal Roti', dinner: 'Paneer' },
        tuesday: { breakfast: 'Idli', lunch: 'Rajma Chawal', dinner: 'Chicken' }
      }
    };
  },
  save: (propertyId: string, menu: any) => {}
};
