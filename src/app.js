const myContractAddress = "0x3Be3A7be94240651E7046F24B65b0B582aD29607";
const emptyAddress = '0x0000000000000000000000000000000000000000';
 

 // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
 async function initializeProvider() {
  const MachineManagement = await $.getJSON("MachineManagement.json")

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(myContractAddress, MachineManagement.abi, signer);
 }

 // Displays a prompt for the user to select which accounts to connect
 async function requestAccount() {
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
   setAccount(account[0]);
 }


async function Hello() {
  if (typeof window.ethereum !== 'undefined') {
    const contract = await initializeProvider();
    try {
      const count = await contract.taskCount();
      // console.log("The count is---->: "+ count)
      // console.log(contract)

    } catch (e) {
      console.log('error ocurred: ', e);
    }
  }
  //blockNumber = await provider.getBlockNumber()
  console.log("Working")

}
