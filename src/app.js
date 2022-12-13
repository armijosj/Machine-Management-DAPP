const myContractAddress = "0xd62aD1B7799CdD7D3AE63FE8a0bc88857624FC51";  // <- paste address here
 
window.myContract = null;

var localTasks = 0;

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
      var type = document.getElementById("type").value;
      var machine = document.getElementById("machine").value;
      var reason = document.getElementById("reason").value;
      const response = await window.myContract.createTask(type, machine, reason);
      updateTasks();
      hidePopUp();
    } catch(e) {
      console.log(e);
    }
  }
}

async function updateTasks() {
  document.getElementById("allTasks").innerHTML="<div id =\"firstTask\"></div>";
  const currNumTasks = await window.myContract.taskCount();
  for ( var i = 0; i< currNumTasks; i++){
  const values = await window.myContract.getValues( i )
    var content = "<div id= \"aTask\"> <label style=\"left: 17%\">ID: " + i + " </label>"
                + "<label style=\"left: 25%\"> Type:" + values[0] + " </label> " 
                + "<label style=\"left: 40%\"> Machine: " + values[1] + " </label> "
                + "<label style=\"left: 60%\"> Reason:" + values[2] + " </label> <input onclick=\"checkTask( " + i + " )\" type=\"checkbox\" ";
    console.log(values);            
    if (values[3]){
      content += "checked /> </div>";
    } else {
      content += "/> </div>";
    }          
    document.getElementById("firstTask").insertAdjacentHTML("afterend", content);
  }  
}

async function checkTask( inputID ) {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const response = await window.myContract.toggleCompleted(inputID);
      updateTasks();
    } catch(e) {
      console.log(e);
    }
  }
}


function showPopUp() {
  document.getElementById("PopUp").style.display = "flex";
}

function hidePopUp() {
  document.getElementById("type").value = "";
  document.getElementById("machine").value = "" ;
  document.getElementById("reason").value = "";
  document.getElementById("PopUp").style.display = "none";
}