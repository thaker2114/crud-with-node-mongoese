import express from 'express';  
import { fetch,createUser,update,remove } from '../controller/userController.js';

const route = express.Router();


route.post('/create', createUser);
route.get('/getAlluser', fetch);

route.patch('/update/:id', update);

route.delete('/delete/:id', remove);


export default route;