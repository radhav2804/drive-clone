import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.json({ message: 'Node Drive API running with TypeScript' });
});

export default app;