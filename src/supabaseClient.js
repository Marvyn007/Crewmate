// Simple database mock for testing
export const mockDatabase = {
  async getCrewmates() {
    const stored = localStorage.getItem('crewmates');
    return stored ? JSON.parse(stored) : [];
  },

  async addCrewmate(crewmate) {
    const crewmates = await this.getCrewmates();
    const newCrewmate = {
      ...crewmate,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    crewmates.push(newCrewmate);
    localStorage.setItem('crewmates', JSON.stringify(crewmates));
    return newCrewmate;
  },

  async updateCrewmate(id, updates) {
    const crewmates = await this.getCrewmates();
    const index = crewmates.findIndex(c => c.id === id);
    if (index !== -1) {
      crewmates[index] = { ...crewmates[index], ...updates };
      localStorage.setItem('crewmates', JSON.stringify(crewmates));
      return crewmates[index];
    }
    return null;
  },

  async deleteCrewmate(id) {
    const crewmates = await this.getCrewmates();
    const filtered = crewmates.filter(c => c.id !== id);
    localStorage.setItem('crewmates', JSON.stringify(filtered));
    return true;
  },

  async getCrewmate(id) {
    const crewmates = await this.getCrewmates();
    return crewmates.find(c => c.id === id);
  }
};