const myContractAddress = "0xb27efc32DaA574146383A50B48fe5c655f3d1bc6";
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
      var type = document.getElementById("type").value;
      var machine = document.getElementById("machine").value;
      var reason = document.getElementById("reason").value;


      console.log(type);
      console.log(machine);
      console.log(reason);

      //const count = await window.myContract.createTask(text);
      //console.log("id should be"+ count);

      updateTasks();
      //hidePopUp()
    } catch(e) {
      console.log(e);
    }
  }
}

//To hide or delete an element use the display: none - document.getElementById("myDIV").style.display = "none";

async function updateTasks() {

  //const count = await window.myContract.taskCount();
  //idStr = "task" + num
  var content = "<div id= \"aTask\"> <label style=\"left: 17%\">ID: 0 </label>"
              + "<label style=\"left: 25%\"> Type: Genesis Task </label> " 
              + "<label style=\"left: 40%\"> Machine: Example </label> "
              + "<label style=\"left: 60%\"> Reason: Other </label> <input id=\"CheckBox\" type=\"checkbox\" /> </div>";

  document.getElementById("allTasks").insertAdjacentHTML("afterend", content);
}


function showPopUp() {
  document.getElementById("PopUp").style.display = "flex";
}

function hidePopUp() {
  document.getElementById("PopUp").style.display = "none";
}