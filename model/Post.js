const MongoClient = require('mongodb').MongoClient;

module.exports = class Post {
    static async find (busca) {
        const conn = await MongoClient.connect(process.env.MONGODB_URI);
        const db = conn.db();
        let result;
        if(busca)
            result = await db.collection('posts').find({ texto: new RegExp('^' + busca) }).toArray();
        else
            result = await db.collection('posts').find().toArray();
        conn.close();
        return result;
    }

    static async insert (texto) {
        const conn = await MongoClient.connect(process.env.MONGODB_URI);
        const db = conn.db();
        await db.collection('posts').insertOne({ texto: texto });
        conn.close();
    }
}