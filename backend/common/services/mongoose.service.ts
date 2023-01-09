import debug from 'debug';
import mongoose from 'mongoose';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
  private count = 0;
  private _dbConnection: string = process.env.DB_CONNECTION_STRING || '';
  private _dbName: string = process.env.DB_NAME || 'tedu-courses';

  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    dbName: this._dbName,
  }

  constructor() {
    this.connectWithRetry();
  }

  get dbConnection(): string {
    return `${this._dbConnection}`;
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    log('Connecting to MongoDB (will retry if needed)');
    mongoose
      .set('strictQuery', true)
      .connect(this.dbConnection, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(`MongoDB connection failed (will retry #${++this.count} after ${retrySeconds} seconds):`, err);
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseService();