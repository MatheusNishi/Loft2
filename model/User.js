const MongoClient = require('mongodb').MongoClient;

module.exports = class User {
    static async criarConta(email, senha) {
        const conn = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        let busca1 = (await db.collection('users').find({ email: email }).toArray()).length;
        if (busca1) {
            conn.close();
            return false;
        } else {
            await db.collection('users').insertOne({ email: email, senha: senha });
            conn.close();
            return true;
        }
    }

    static async logarConta(email,senha) {
        const conn = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        let retorno = (await db.collection('users').find({ email: email, senha: senha }).toArray()).length;
        if (retorno) {
            conn.close();
            return true;
        } else {
            conn.close();
            return false;
        }
    }
}