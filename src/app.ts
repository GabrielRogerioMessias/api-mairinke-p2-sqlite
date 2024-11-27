import express from 'express';
import sequelize from './shared/database';
import profileRouter from './routes/profile-routes';
import { InitializeClass } from './models/initialize-models';

import depositRouter from './routes/deposit-router';
import jobRouter from './routes/job-router';
import contractRouter from './routes/contract-router';
import paymentRouter from './routes/payment-router';

const app = express();
app.use(express.json())
const port = 3000;
InitializeClass.initialize();
app.use('/api', profileRouter)
app.use('/api', depositRouter)
app.use('/api', jobRouter)
app.use('/api', contractRouter)
app.use('/api', paymentRouter)



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

sequelize.sync({ alter: true }) // `force: false` garante que ele não recrie a tabela se já existir
    .then(() => {
        console.log("Database synchronized, tables created if they don't exist");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

