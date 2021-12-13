const { model, Mongoose } = require('mongoose');

let http = require ('http'),
    express = require ('express'),
    path = require ('path'),
    Post = require ('./model/Post'),
    User = require ('./model/User'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    Model = require('./model/model'),
    sha256 = require('sha256'),
    app = express();

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
    console.log(texto);
});

app.post('/create', async (req, res)=>{
    const emailcriar = req.body.emailcriar;
    const senhacriar = req.body.senhacriar;
    console.log(emailcriar);
    console.log(senhacriar);

    await User.criarConta(emailcriar, senhacriar)
        res.redirect('/');
});

app.post('/login', async (req, res) =>{
    const emaillogin = req.body.emaillogar;
    const senhalogin = req.body.senhalogar;
    console.log(emaillogin);
    console.log(senhalogin);
    if (await User.logarConta(emaillogin, senhalogin)) {
        req.session.login = emaillogin;
    }
    res.redirect('/');

});
app.get('/logout', async (req, res) =>{
    req.session.destroy();
    res.redirect('/');
});

// app.post('/upload', upload.single('arquivo'), async (req, res, next) => {
//     const file = req.file;
//     if (!file) {
//         const error = new Error('Please upload a file');
//         error.httpStatusCode = 400;
//         return next("Hey error");
//     }

//     const imagepost = new model({
//         image: file.path
//     });

//     const savedimage = await imagepost.save()
//     res.json(savedimage)
// });

// app.get('/image', async(req, res) => {
//     const image = await model.find()
//     res.json(image)
// });

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-test', { useNewUrlParser: true},()=>{
//     console.log('db connected');
// })

http.createServer(app).listen(process.env.PORT || 8000);