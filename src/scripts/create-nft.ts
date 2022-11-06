import { readFileSync } from "fs";
import sdk from "./initialize-sdk.js";

const editionDrop = sdk.getContract("0x9Bfa6f50e91292E3f67cEBe42f761d1362a75E50", "edition-drop");

(async () => {
  try {
    await (await editionDrop).createBatch([
      {
        name: "Visualize DAO",
        description:
          "membership NFT",
        image: readFileSync("src/scripts/assets/visual-dao.png"),
      },
    ]);
    console.log("✅ Successfully created a membership NFT");
  } catch (error) {
    console.error("failed to create membership NFT", error);
  }
})();