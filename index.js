let http = require ('http'),
    express = require ('express'),
    path = require ('path'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/a', (req, res) =>{
    res.render('index');
});
app.get('/', (req, res) =>{
    res.end('<h1>Pagina</h1>');
});

http.createServer(app).listen(3003);

// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/mongo-test', (err, conn) => {
//     if (err) throw err;
//     const db = conn.db();
//     console.log('Conexao estabelecida');
//     db.collection('posts').insertOne({
//         nome: 'Pedro'
//     });
//     db.collection('posts').find().toArray().then((res) => {
//         console.log(res);
//         conn.close();
//     });

// });