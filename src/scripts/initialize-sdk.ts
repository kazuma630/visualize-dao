import ethers from "ethers";
import nextEnv from "@next/env";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// .envで定義した環境変数の読み込み
const { loadEnvConfig } = nextEnv;
const { PRIVATE_KEY_ADDRESS, ALCHEMY_API_URL, WALLET_ADDRESS } = loadEnvConfig(
  process.cwd()
).combinedEnv;

const sdk = new ThirdwebSDK(
  new ethers.Wallet(process.env.PRIVATE_KEY_ADDRESS!, ethers.getDefaultProvider(process.env.ALCHEMY_API_URL))
);

// SDKの初期化スクリプトを実行
(async () => {
  try {
    if (!sdk || !("getSigner" in sdk)) return;
    const address = await sdk.getSigner()?.getAddress();
    console.log("SDK initialized by address:", address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

export default sdk;