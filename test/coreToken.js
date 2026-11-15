import { expect } from "chai";
import hre from "hardhat";

const { ethers } = await hre.network.create();

describe("COREToken (CT)", function () {

  async function deployToken() {
    const token = await ethers.deployContract("CoreToken");
    return token;
  }

  it("Should have the correct name", async function () {
    const token = await deployToken();

    expect(await token.name()).to.equal("COREToken");
  });

  it("Should have the correct symbol", async function () {
    const token = await deployToken();

    expect(await token.symbol()).to.equal("CT");
  });

  it("Should have 18 decimals", async function () {
    const token = await deployToken();

    expect(await token.decimals()).to.equal(18n);
  });

  it("Should have exactly 100 million CT", async function () {
    const token = await deployToken();

    const expectedSupply =
      100_000_000n * 10n ** 18n;

    expect(await token.totalSupply()).to.equal(
      expectedSupply
    );
  });

  it("Should allocate all tokens to deployer", async function () {
    const [deployer] = await ethers.getSigners();
    const token = await deployToken();

    expect(await token.balanceOf(deployer.address))
      .to.equal(await token.totalSupply());
  });

  it("Should allow token transfers", async function () {
    const [deployer, receiver] = await ethers.getSigners();
    const token = await deployToken();

    const amount = ethers.parseEther("100");

    await token.transfer(receiver.address, amount);

    expect(await token.balanceOf(receiver.address))
      .to.equal(amount);
  });

  it("Should not expose an additional mint function", async function () {
    const token = await deployToken();

    const hasMintFunction = token.interface.fragments.some(
      (fragment) =>
        fragment.type === "function" &&
        fragment.name === "mint"
    );

    expect(hasMintFunction).to.equal(false);
  });

});
