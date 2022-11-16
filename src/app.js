const myContractAddress = "0x398647A5472ffcBd5aD6FBb0f0D63b21489399D9";
const emptyAddress = '0x0000000000000000000000000000000000000000';
 
window.myContract = null;

window.onload = function() {
  initializeProvider();
};

 // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
 async function initializeProvider() {
  const MachineManagement = await $.getJSON("MachineManagement.json")
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
  const signer = provider.getSigner();
  window.myContract = await new ethers.Contract(myContractAddress, MachineManagement.abi, signer);
 }



async function createNewTask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      //const myContract = await initializeProvider();
      

      //await myContract.createTask("This is a task")
      var text = document.getElementById("newTaskInput").value;
      document.getElementById("newTaskInput").value = "";
      console.log(text);

      const count = await window.myContract.createTask(text);
      console.log(count);

      updateTasks();

    } catch(e) {
      console.log(e);
    }
  }
}

async function updateTasks() {

  const count = await window.myContract.taskCount();
  var content = "<h3 style=\"color: #d1633c; font-size: 1.15em;\"> Task Count is: " + count +"</h3>";
  document.getElementById("allTasks").insertAdjacentHTML("afterend", content);
}

//  var = "<div id= \"aMemo\"> <label style=\"\">" + obj.text
// + "</label><label style=\"position: absolute; left: 40%\"> Cookie: " + obj.last_modified  
// + "</label><button id=\"" + obj.id +"\" style=\"position: absolute; left: 80%; background-color: #c21515; color: white; cursor: pointer;\"> Delete </button></div>";