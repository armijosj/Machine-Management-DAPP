// DEPRECATED TEST - It only works with the previous version of Solidity. Testing has been done manually throught the Web Application.

const TodoList = require('../build/contracts/MachineManagement.json')
contract('MachineManagement', (accounts) => {
  before(async () => {
    this.machineManagement = await MachineManagement.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.machineManagement.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists tasks', async () => {
    const taskCount = await this.machineManagement.taskCount()
    const task = await this.machineManagement.tasks(taskCount)
    assert.equal(0, taskCount.toNumber())

    const result = await this.machineManagement.createTask('aType', 'aMachine', 'aReason')
    taskCount = await this.machineManagement.taskCount()
    assert.equal(result.completed, false)
    assert.equal(taskCount.toNumber(), 1)
  })

  it('creates tasks', async () => {
    const result = await this.machineManagement.createTask('anotherType', 'anotherMachine', 'anotherReason')
    const taskCount = await this.machineManagement.taskCount()
    assert.equal(taskCount, 2)
    machineManagement.getValues(0)
    result = machineManagement.tasks(2)
    assert.equal(result.type, 'anotherType')
  })

  it('toggles task completion', async () => {
    const result = await this.machineManagement.toggleCompleted(1)
    const task = await this.machineManagement.tasks(1)
    assert.equal(task.completed, true)
    result = await this.machineManagement.toggleCompleted(1)
    assert.equal(task.completed, false)
  })

})