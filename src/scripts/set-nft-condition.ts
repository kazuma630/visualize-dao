import { MaxUint256 } from "@ethersproject/constants";
import sdk from "./initialize-sdk.js";

const editionDrop = sdk.getContract("0x9Bfa6f50e91292E3f67cEBe42f761d1362a75E50", "edition-drop");

(async () => {
  try {
    const nftConditions = [
      {
        startTime: new Date(),
        maxQuantity: 10000,
        price: 0,
        quantityLimitPerTransaction: 1,
        waitInSeconds: MaxUint256,
      },
    ];
    await (await editionDrop).claimConditions.set("0", nftConditions);
    console.log("Successfully set nftConditions");
  } catch (error) {
    console.error("Failed to set nftConditions", error);
  }
})();