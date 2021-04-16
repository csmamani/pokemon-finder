import express, { Application } from 'express';
import Handlebars from 'express-handlebars';

const app: Application = express();
const PORT = process.env.PORT || 4400;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.engine(
  'hbs',
  Handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '../../views/layouts',
    partialsDir: __dirname + '../../views/partials',
  })
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
