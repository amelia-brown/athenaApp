module.exports = {
  default: 3000,
  user: process.env.USER || 'http://localhost:3001',
  ticket: process.env.TICKET || 'http://localhost:3002',
  kb: process.env.KB || 'http://localhost:3003',
  kbSearch: process.env.KBSEARCH || 'http://localhost:3004',
};
