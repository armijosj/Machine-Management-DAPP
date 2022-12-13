// SPDX-License-Identifier: MIT
pragma solidity >=0.4 <0.9;

contract MachineManagement {
    struct Task {
        uint id;
        string taskType;
        string machine;
        string source;
        bool completed;
    }
    
    uint public taskCount = 0;

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string taskType,
        string machine,
        string source,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    function createTask(string memory _taskType, string memory _machine, string memory _source) public {
        tasks[taskCount] = Task(taskCount, _taskType, _machine, _source, false);
        taskCount ++;
        emit TaskCreated(taskCount, _taskType, _machine, _source, false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

    function getTaskCount() public view returns ( uint ) {
        return taskCount;
    }

    function getValues( uint _id) public view returns ( string memory, string memory , string memory , bool  ){
        Task memory myTask = tasks[_id];
        return (myTask.taskType , myTask.machine ,  myTask.source ,  myTask.completed );
    }


}