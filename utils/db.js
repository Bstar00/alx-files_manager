import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.db = null;
    MongoClient.connect(url, { useUnifiedTopology: true })
      .then(client => {
        this.db = client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      })
      .catch(err => {
        console.error(err.message);
        this.db = null;
      });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    if (!this.db) return 0;
    return this.users.countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0;
    return this.files.countDocuments();
  }

  async getUser(query) {
    if (!this.db) return null;
    const user = await this.users.findOne(query);
    return user;
  }
}

const dbClient = new DBClient();
export default dbClient;
