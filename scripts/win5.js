const contractName = "Game5";
const gameAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:

  await game.giveMeAllowance(15000);
  await game.mint(11000);

  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
