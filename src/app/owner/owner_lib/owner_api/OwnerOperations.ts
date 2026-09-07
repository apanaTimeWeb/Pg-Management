export const managerOperationsApi = {
  listComplaints: (propertyId: string) => {
    return [
      { id: '1', title: 'Leaking tap', status: 'Open', category: 'Plumbing', priority: 'High', date: '2023-10-27', room: '101' },
      { id: '2', title: 'AC not working', status: 'In Progress', category: 'Electrical', priority: 'High', date: '2023-10-26', room: '102' }
    ];
  }
};
