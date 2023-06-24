import { Router } from "express";
import  Todo  from "../models/todos";
const router=Router();
let todos:Todo[] =[]
type reuestbody={text:string};
type reuestparams={todoid:string};
router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
}
);
router.post('/todo',(req,res,next)=>{
    const body =req.body as reuestbody
    const newtodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    }
    todos.push(newtodo);
    res.status(201).json({message:"added todo",todos:todos})
});
router.put('/todo/:todoid',(req,res,next)=>{
    const params =req.body as reuestparams
    const tid=params.todoid;
    const body =req.body as reuestbody
    const todoindex= todos.findIndex((todoitem) =>todoitem.id === tid);
    if (todoindex>=0){
        todos[todoindex]={id:todos[todoindex].id,text:body.text}
        return res.status(200).json({message:'updated',data:todos})
    }
    return res.status(404).json({message:"coudnot find anything"})
}
);
router.delete('/delete/:id',(req,res,next)=>{
    const params =req.body as reuestparams
    todos=todos.filter((todoitem) =>todoitem.id !== params.todoid);
    res.status(200).json({message:"deleted"})
})

export default router;