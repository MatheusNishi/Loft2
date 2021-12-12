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
    session = require('cookie-session'),
    mongoose = require('mongoose'),
    Model = require('./model/model'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', async (req, res) =>{
    const busca = req.query.busca;
    const posts = await Post.find(busca);
    if (req.cookies && req.cookies.login) {
        res.render('indexlogado', { posts: posts });
    } else {
        res.render('indexlogado', { posts: posts });
    }
});
app.post('/', async (req, res) =>{
    const texto = req.body.texto;
    if(texto){
        await Post.insert(texto);
        res.redirect('/');
    }
    
    if (req.cookies && req.cookies.login) {
        res.render('indexlogado')
    } else {
        res.render('indexlogado')
    }
});
app.post('/create', async (req, res)=>{
    const emailcriar = req.body.emailcriar;
    const senhacriar = sha256.x2(req.body.senhacriar);

    if (await User.criarConta(emailcriar, senhacriar)) {
        res.redirect('/');
    } else {

    }
});

app.post('/login', async (req, res) =>{
    const emaillogin = req.body.emaillogin;
    const senhalogin = sha256.x2(req.body.senhalogin);
    
    if (await User.logarConta(emaillogin, senhalogin)) {
        res.cookie('login', emaillogin);
        res.render('indexlogado');
    } else {
        res.render('indexlogado', )
    }
});

app.post('/upload', upload.single('arquivo'), async (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next("Hey error");
    }

    const imagepost = new model({
        image: file.path
    });

    const savedimage = await imagepost.save()
    res.json(savedimage)
});

app.get('/image', async(req, res) => {
    const image = await model.find()
    res.json(image)
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true},()=>{
    console.log('db connected');
})

http.createServer(app).listen(process.env.PORT || 8000);