const Task = require("../model/Task");

const taskController = {}

taskController.createTask = async (req, res) => {
    try{
        const {task,isComplete} = req.body;
        const newTask = new Task({task,isComplete});
        await newTask.save();
        // res.send('create task success');
        res.status(200).json({status : 'ok', data : newTask});

    }catch(err){
        res.status(400).json({status : 'error', message : err.message});
    }
}

taskController.getTask = async (req, res) => {
    try{
        const taskList = await Task.find({}).select("-__v -updatedAt");
        res.status(200).json({status : 'ok', data : taskList});
    }catch(err){
        res.status(400).json({status : 'error', message : err.message});
    }
}

taskController.updateTask = async (req, res) => {
    try{
        //find task by id and update
        const task = await Task.findById(req.params.id);
        const task2 = await Task.updateOne({_id : req.params.id},{$set : {isComplete : !task.isComplete}}) ;
        const fields = Object.keys(req.body);
        
        res.status(200).json({status : 'ok', data : fields});
    }catch(err){
        res.status(400).json({status : 'error', message : err.message});
    }

}

taskController.deleteTask = async (req, res) => {
    try{
        const task = await Task.deleteOne({_id : req.params.id});
        res.status(200).json({status : 'ok', data : task});
    }catch(err){
        res.status(400).json({status : 'error', message : err.message});
    }
}

module.exports = taskController;