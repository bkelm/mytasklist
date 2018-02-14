var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://bkelm:stprocks@ds257627.mlab.com:57627/mytasklist',['tasks']);

// Get all tasks

router.get('/tasks', function (req, res, next) {
    db.tasks.find(function(err,tasks) {

        if(err) {
            res.send(err);
        }
        res.json(tasks);

        });
});

// Get a single task

router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,task) {

        if(err) {
            res.send(err);
        }
        res.json(task);

    });
});

// Save Task

router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete a task



module.exports = router;