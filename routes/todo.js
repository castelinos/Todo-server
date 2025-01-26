import express from 'express';
import { Todo } from '../models/Todo.js';
import { verifyAuthorizedRole, verifyUser } from '../middlewares/user.js';

const router = express.Router();

router.get('/', verifyUser, async(req,res) => {
    let list = await Todo.find();
    res.status(200).json(list);
})

router.post('/', verifyUser, async (req,res) => {
    const data = req.body;

    let s = await Todo.create({ 
        title: data.title, 
        description: data.description, 
        completed:false 
    });

    res.status(201).json({status:'success'});
})


router.put('/:id', verifyUser, findTodo, async (req,res) => {

    try {
        let todo = req.todo;

        todo = Object.assign(todo, req.body)
        await todo.save();
        
        res.status(200).json({status:'success'});
        
    } catch (error) {
        console.log('Error updating Todo', error.message);
        res.status(500).json({status:'Internal server error'});
    }
    
})

router.delete('/:id', verifyUser, verifyAuthorizedRole, findTodo, async (req,res) => {
    try {
        let todo = req.todo;
        await todo.deleteOne();
        res.status(200).json({status:'success'});
        
    } catch (error) {
        console.log('Error removing document', error.message);
        res.status(500).json({status:'Internal server error'});
    }
}) 

async function findTodo(req, res, next){
    try {
        let todoID = req.params.id;
        let todo = await Todo.findById(todoID);

        if( !todo ){
            res.status(404).json({status:"Todo not found!"})
        }
        
        req.todo = todo;
        next();
        
    } catch (error) {
        console.log('Error finding Todo', error.message);
        res.status(500).json({ "message":"Internal server error" });
    }
}

export default router;