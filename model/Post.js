const MongoClient = require('mongodb').MongoClient;

module.exports = class Post {
    static async find (busca) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        if(busca)
            return await db.collection('posts').find({ texto: new RegExp('^' + busca) }).toArray();
        return await db.collection('posts').find().toArray();
    }

    static async insert (texto) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        db.collection('posts').insertOne({ texto: texto });
    }
}