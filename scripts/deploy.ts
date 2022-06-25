import { ethers } from "hardhat";

async function main() {
  const Whitelist = await ethers.getContractFactory("Whitelist");
  const whitelist = await Whitelist.deploy("hai");
  await whitelist.deployed();
  console.log("whitelist address:", whitelist.address); // eslint-disable-line no-console
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
