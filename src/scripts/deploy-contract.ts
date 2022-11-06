import { AddressZero } from "@ethersproject/constants";
import { readFileSync } from "fs";
import sdk from "./initialize-sdk.js";

(async () => {
  try {
    const contractAddress = await sdk.deployer.deployEditionDrop({
      name: "Visualize DAO",
      description: "DAO for Visualization of Contributions",
      image: readFileSync("src/scripts/assets/contribute-nft.png"),
      primary_sale_recipient: AddressZero,
    });

    const editionDrop = sdk.getContract(contractAddress, "edition-drop");
    const metadata = await (await editionDrop).metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      contractAddress
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();