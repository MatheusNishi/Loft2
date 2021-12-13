const MongoClient = require('mongodb').MongoClient;

module.exports = class User {
    // static find() {
    //     return client.connect(
    //         'mongodb://localhost:27017/mongo-test',
    //         {useNewUrlParser:true}).then((client) => {
    //             let db = client.db('mongo-test');
    //             return db.collection('users').find({}).toArray();
    //         });
    // }
    static async criarConta(email, senha) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        console.log(email);
        console.log(senha);
        let busca1 = (await db.collection('users').find({ email: email }).toArray()).length;
        console.log(await db.collection('users').find({ email: email }).toArray());
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
        const conn = await MongoClient.connect('mongodb://localhost:27017/mongo-test');
        const db = conn.db();
        let retorno = (await db.collection('users').find({ email: email, senha: senha }).toArray()).length;
        console.log(retorno);
        if (retorno) {
            conn.close();
            return true;
        } else {
            conn.close();
            console.log(0);
            return false;
        }
    }
}