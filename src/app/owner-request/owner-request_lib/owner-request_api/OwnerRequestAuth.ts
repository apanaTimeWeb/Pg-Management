export const authApi = { ownerRequests: { create: async (data: any) => { return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500)); } } };
