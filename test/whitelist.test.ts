import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Whitelist } from '../typechain';

describe("Whitelist", () => {
    let users: SignerWithAddress[]
    let whitelist: Whitelist
    const MAX_ADDRESSES = 10;
    beforeEach(async () => {
        users = await ethers.getSigners();
        const WhitelistFactory = await ethers.getContractFactory("Whitelist");
        whitelist = await WhitelistFactory.deploy(MAX_ADDRESSES) as Whitelist;
        whitelist.deployed();
    })

    it("should be deployed", async () => {
        expect(whitelist.address).to.be.properAddress
    })

    describe("add address to whitelist", () => {
        beforeEach(async () => {
            await whitelist.addAddressToWhitelist()
        })

        it("increased amount whitelisted", async () => {
            const amount = await whitelist.numAddressesWhitelisted();
            expect(amount).to.eq(1)
        })

        it("reverts if repeats address", async () => {
           expect(whitelist.addAddressToWhitelist()).to.be.revertedWith("Sender has already been whitelisted")
        })

        it("cant whitelist more then max addresses", async() => {
            const [, ...addresses] = users;
            const whitelistAll = async () => await addresses.forEach(async (user) => whitelist.connect(user).addAddressToWhitelist())
            expect(whitelistAll()).to.be.revertedWith("More addresses cant be added, limit reached")
        })
    })
})
