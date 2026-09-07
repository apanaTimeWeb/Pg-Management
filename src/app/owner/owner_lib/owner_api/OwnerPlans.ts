export const plansApi = {
  listPlans: () => {
    return [
      { id: 'plan_1', name: 'Basic', price: 999, limits: { properties: 1, staff: 2, students: 50 } },
      { id: 'plan_2', name: 'Pro', price: 1999, limits: { properties: 3, staff: 10, students: 200 } }
    ];
  }
};
