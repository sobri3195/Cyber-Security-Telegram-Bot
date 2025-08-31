const fs = require('fs').promises;
const path = require('path');

class DataManager {
  constructor() {
    this.usersFile = path.join(__dirname, '../data/users.json');
    this.glossaryFile = path.join(__dirname, '../data/glossary.json');
    this.eventsFile = path.join(__dirname, '../data/events.json');
  }

  // Load data from JSON file
  async loadData(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading data from ${filePath}:`, error);
      return null;
    }
  }

  // Save data to JSON file
  async saveData(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Error saving data to ${filePath}:`, error);
      return false;
    }
  }

  // Add new user
  async addUser(chatId, username = null, firstName = null, lastName = null) {
    try {
      const usersData = await this.loadData(this.usersFile) || { users: [], admin_users: [] };
      
      // Check if user already exists
      const existingUser = usersData.users.find(user => user.chat_id === chatId);
      if (!existingUser) {
        usersData.users.push({
          chat_id: chatId,
          username,
          first_name: firstName,
          last_name: lastName,
          joined_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        });
        
        await this.saveData(this.usersFile, usersData);
        console.log(`New user added: ${chatId} (${username || firstName || 'Unknown'})`);
      } else {
        // Update last activity
        existingUser.last_activity = new Date().toISOString();
        await this.saveData(this.usersFile, usersData);
      }
      
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  }

  // Get all users for broadcast
  async getAllUsers() {
    try {
      const usersData = await this.loadData(this.usersFile);
      return usersData?.users || [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  // Get glossary terms
  async getGlossary() {
    try {
      return await this.loadData(this.glossaryFile);
    } catch (error) {
      console.error('Error loading glossary:', error);
      return {};
    }
  }

  // Search glossary term
  async searchGlossary(term) {
    try {
      const glossary = await this.getGlossary();
      const searchTerm = term.toLowerCase();
      
      // Exact match first
      if (glossary[searchTerm]) {
        return {
          term: searchTerm,
          definition: glossary[searchTerm],
          matchType: 'exact'
        };
      }
      
      // Partial match
      const matches = Object.entries(glossary).filter(([key, value]) => 
        key.toLowerCase().includes(searchTerm) || 
        value.toLowerCase().includes(searchTerm)
      );
      
      if (matches.length > 0) {
        return {
          term: matches[0][0],
          definition: matches[0][1],
          matchType: 'partial',
          suggestions: matches.slice(0, 3).map(([key]) => key)
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error searching glossary:', error);
      return null;
    }
  }

  // Get events
  async getEvents() {
    try {
      const eventsData = await this.loadData(this.eventsFile);
      return eventsData?.events || [];
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  }

  // Update user activity
  async updateUserActivity(chatId) {
    try {
      const usersData = await this.loadData(this.usersFile);
      if (usersData && usersData.users) {
        const user = usersData.users.find(u => u.chat_id === chatId);
        if (user) {
          user.last_activity = new Date().toISOString();
          await this.saveData(this.usersFile, usersData);
        }
      }
    } catch (error) {
      console.error('Error updating user activity:', error);
    }
  }

  // Check if user is admin
  async isAdmin(chatId) {
    try {
      const usersData = await this.loadData(this.usersFile);
      return usersData?.admin_users?.includes(chatId) || false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
}

module.exports = DataManager;
