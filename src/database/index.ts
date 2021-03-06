import { MongoClient, MongoError, Db} from 'mongodb'

// export type MongoClient = MongoClient
export type DBType = Db
// export class Database<Client extends MongoClient> {

//     private instance: Database<Client>

//     private client: Client
//     private url: string
//     private db: Db

//     constructor(client: Client, url: string) {
//         this.client = client
//         this.url = url
//     }

//     public getDatabase() {
//         if (this.instance) return this.instance
//         return new Database<Client>(this.client, this.url)
//     }

//     async connect(dbName: string) {
//         return new Promise<Db>((resolve, reject) => {
//             this.client.connect(`${this.url}/${dbName}`, (err: MongoError, db: Db) => {
//                 if (err) {
//                     return reject(err)
//                 }
//                 this.db = db
//                 return resolve(db)
//             })
//         })
//     }

//     async close() {
//         return new Promise((resolve, reject) => {
//             this.db.close((err: MongoError) => {
//                 return err ? reject(err) : resolve()
//             })
//         })
//     }
// }

// export default (new Database<MongoClient>(MongoClient, DB_URL)).getDatabase()

class DataBase {

    private connection: Db = null

    setConnection(connection: Db) {
        //console.log('set', connection)
        this.connection = connection
    }

    getConnection() {
        return this.connection
    }

}

export  const DB = new DataBase()