function App() {

 // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
 async function initializeProvider() {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   return new ethers.Contract(AuctionContractAddress, Auction.abi, signer);
 }

 // Displays a prompt for the user to select which accounts to connect
 async function requestAccount() {
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
   setAccount(account[0]);
 }

async function sayHello() {
  console.log("Helooo!!")
}
 return ("Hello");
}

async function Hello(){
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  blockNumber = await provider.getBlockNumber()
  console.log("Hello Mia mor")

}
