const { model, Mongoose } = require('mongoose');

let http = require ('http'),
    express = require ('express'),
    path = require ('path'),
    Post = require ('./model/Post'),
    User = require ('./model/User'),
    Rimage = require ('./model/Rimage'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    sha256 = require('sha256'),
    mongoose = require('mongoose'),
    Image = require('./model/Image'),
    multer = require('multer'),
    app = express();

var upload = multer({ 
    storage: multer.diskStorage({
        destitation:(req,file,cb)=> {
            cb(null, "./uploads");
        },
        filename: function(req, file, callback) {callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    })});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'palava chave',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', async (req, res) =>{
    const busca = req.query.busca;
    const posts = await Post.find(busca);
    const images = await Rimage.find();
    if (req.session && req.session.login) {
        res.render('indexlogado', { posts: posts });
    } else {
        res.render('index');
    }
});

app.post('/', async (req, res) =>{
    const texto = req.body.texto;
    if(texto){
        await Post.insert(texto);
        res.redirect('/');
    }
});

app.post('/create', async (req, res)=>{
    const emailcriar = req.body.emailcriar;
    const senhacriar = sha256(req.body.senhacriar);

    if (await User.criarConta(emailcriar, senhacriar)) {
        res.redirect('/');
    } else {
        res.render('index', {erro: 'Email ja cadastrado'});
    }
});

app.post('/login', async (req, res) =>{
    const emaillogin = req.body.emaillogar;
    const senhalogin = sha256(req.body.senhalogar);
    if (await User.logarConta(emaillogin, senhalogin)) {
        req.session.login = emaillogin;
    res.redirect('/');
    } else {
        res.render('index', {erro: 'Email ou senha incorretos'});
    }

});

app.get('/logout', async (req, res) =>{
    req.session.destroy();
    res.redirect('/');
});

app.post('/upload', upload.single('arquivo'), async (req, res, next) => {
    var x = new Image;
    x.title = req.body.title;
    x.content = req.body.content;
    x.image = req.file.filename;
    x.save((err,doc)=>{
        if(err)
            console.log(err);
        });
    res.redirect('/');
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-test', { useNewUrlParser: true},()=>{});

http.createServer(app).listen(process.env.PORT || 8000);