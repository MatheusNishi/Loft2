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
//app.use(cookieParser());

app.get('/', async (req, res) =>{
    const busca = req.query.busca;
    const posts = await Post.find(busca);    
    //let busca = req.query.busca;
    res.render('indexlogado', { posts: posts });
    //res.end();
});
app.post('/', async (req, res) =>{
    // const emaillogin = req.body.emaillogin;
    // const senhalogin = req.body.senhalogin;
    // const emailcriar = req.body.emailcriar;
    // const senhacriar = req.body.senhacriar;
    const texto = req.body.texto;
    if(texto){
        await Post.insert(texto);
        res.redirect('/');
    } else {
        res.render('indexlogado');

    }
    // if(emaillogin && senhalogin)
    //     User.logarConta(emaillogin, senhalogin);
    // else(emailcriar && senhacriar)
    //     User.criarConta(emailcriar, senhacriar);

    // if (req.cookies && req.cookies.login) {
    //     res.render('indexlogado', {

    //     })
    // }
        
});
// app.get('/busca', async (req, res) =>{
//     const busca = req.query.busca;
//     const posts = await Post.find(busca);    
//     //let busca = req.query.busca;
//     res.render('busca', { posts: posts });
//     //res.end();
// });
// app.post('/busca', async (req, res) => {
//     const texto = req.body.texto;
//     Post.insert(texto);
//     res.redirect('busca');
// });

http.createServer(app).listen(8000);