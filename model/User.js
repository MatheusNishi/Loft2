const client = require('mongodb').MongoClient;

module.exports = class User {
    static find() {
        return client.connect(
            'mongodb://localhost:27017/mongo-test',
            {useNewUrlParser:true}).then((client) => {
                let db = client.db('mongo-test');
                return db.collection('users').find({}).toArray();
            });
    }
    static async criarConta(email, senha) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        if (await db.collection('users').find({ email: email }).toArray()) {
            conn.close();
            return false;
        } else {
            await db.collection('users').insertOne({ email: email, senha: senha });
            return true;
        }
    }

    static async logarConta(email, senha) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        if (await db.collection('users').find({ email: email }).toArray()) {
            if(await db.collection('users').find({ email: email, senha: senha }).toArray()) {
                // retorna positivo
            }
        } else {
            // retorna negativo
        }
    }
}