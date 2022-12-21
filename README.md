# Local Hardhat Games

Let's work on our solidity skills while deploying against a local hardhat blockchain! Inside this repository you'll find 5 smart contracts labled `Game1` to `Game5`. The goal of each smart contract is to:

1. Deploy it to our local hardhat network
2. Send some transaction(s) to emit the Winner event!

If you see the Winner event in the transaction receipt: congratulations, you're a winner! Let's talk about how to setup and run each game.

## 1. Install Depedencies

Install all depedencies with `npm i`. This will install everything you need, including `hardhat`.

## 2. Run the Hardhat Node

Next, take a look at the `hardhat.config.js` file. Specifically this line:

```javascript
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'localhost' // <-- this one!
};
```

The `defaultNetwork` is going to set our scripts to run, by default, against our local node. 

Let's go ahead and run our local node. You can do so by running `npx hardhat node`. This will spin up a local, persistent hardhat blockchain on your port 8545. 

## 3. Deploy a Contract

Its time to deploy a contract! We can use the deploy script to do this. Open up a second terminal and **keep your hardhat node running**. In this new terminal run `npx hardhat run scripts/deploy.js`. If you do this successfully you should see two things in the two terminals:

- **Your Script Terminal** - A message saying "Game1 deployed to address: 0x..." (copy the contract address)
- **Hardhat Node Terminal** - A contract deployed to your local hardhat blockchain (notice all the JSON RPC methods being logged!)

How is this working? To understand, take a look at your `scripts/deploy.js` script:

```javascript
const contractName = "Game1"; // <-- use the contract name here

async function main() {
  const Game = await hre.ethers.getContractFactory(contractName); // <-- hardhat compiles and grabs the contract abi/bytecode using the name
  const game = await Game.deploy(); // <-- the transaction to deploy your contract to the blockchain
  console.log(`${contractName} deployed to address: ${game.address}`); // <-- our log telling us the address!
}
```

We've deployed `Game1`, now its time to win!

## 4. Win the Game

Use the address you deployed your contract from step 3. Paste it into the `scripts/win.js` file where the comments direct you to. 

You can keep the contract name as `Game1` for now. When you attempt `Game2` later on, you'll need to change this! Hardhat uses this contract name to go fetch the ABI for the contract from the `artifacts` folder.

Now run `npx hardhat run scripts/win.js`, this will go ahead and call `win` on your `Game1` contract. If you're successful you should see a transaction receipt with a `Winner` event inside of the `events` array. 

## 5. Play Game2 through Game5

Try each game! See if you can emit the Winner event on each one. Remember to:

1. Change the `contractName` in `scripts/deploy.js`
2. Deploy each new game to your local hardhat environment 
3. Copy the address into the `scripts/win.js`
4. Change the `contractName` in `scripts/win.js`
5. Modify the win script to succesfully complete the challenge. You may need to run multiple transactions in order to win each game!

# Troubleshooting

## Common Errors

1. **Gas Estimation Error** - if you see a gas estimation error, this means that the blockchain node was unable to estimate the gas. The reason for this is often because the transaction reverted! 
2. **`game.[method]` is not a function** - this typically happens because you forgot to change the contract name. More technically, there's function that you think should exist on the contract, but hardhat is not able to call it because the ABI it fetched from the `artifacts` folder does not have that method defined.

## Use Hardhat Console Log

Are you stuck on a particular challenge? You can use `console.log` from Hardhat! To do so, simply import it into your contract (before you deploy it):

```solidity
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Game1 {
  event Winner(address winner);

  function win() public {
    console.log(22);
    emit Winner(msg.sender);
  }
}
```

Now when you call `win` on `Game1` you will see `22` show up in your local hardhat node. This will happen even if the transaction reverts!