const express=require('express');
const server =express();
var session = require('express-session');
const PORT=4000



server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static(__dirname + '/public'))

server.set('views', 'views');
server.set('view engine', 'ejs');


server.get('/', (req, res) => {
	res.render('main');
})


const isUserSignedIn = function (req, res, next) {
	if (req.session.email) {
		next();
	} else {
		res.sendStatus(401);
	}
} 


const indexRouter=require('./routes/index.js')


server.get("/home",isUserSignedIn,(req,res)=>{
    res.render("homepage.ejs");
})


server.use('/',indexRouter)
server.listen(PORT,()=>{console.log(`server is listening on port ${PORT}`)})
