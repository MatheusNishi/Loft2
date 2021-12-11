let http = require ('http'),
    express = require ('express'),
    path = require ('path'),
    Post = require ('./model/Post'),
    User = require ('./model/User'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) =>{
    res.render('index');
});
app.get('/a', (req, res) =>{
    res.end('<h1>Pagina a</h1>');
});
app.get('/busca', async (req, res) =>{
    const busca = req.query.busca;
    const posts = await Post.find(busca);    
    //let busca = req.query.busca;
    res.render('busca', { posts: posts });
    //res.end();
});
app.post('/busca', async (req, res) => {
    const texto = req.body.texto;
    Post.insert(texto);
    res.redirect('busca');
});
app.post('/login', (req, res) => {
    let login = req.body.login;
    let pass = req.body.password;
    res.end();
});

http.createServer(app).listen(8008);

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