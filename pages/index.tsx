import { ConnectWallet, ChainId, useNetwork, useAddress, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const [network, switchNetwork] = useNetwork();

  const editionDrop = useContract("0x9Bfa6f50e91292E3f67cEBe42f761d1362a75E50", "edition-drop").contract;
  const [hasMembershipNFT, setHasMembershipNFT] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }
    const checkBalance = async () => {
      try {
        const balance = await editionDrop!.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasMembershipNFT(true);
          console.log("this user has a membership NFT");
        } else {
          setHasMembershipNFT(false);
          console.log("this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasMembershipNFT(false);
        console.error("Failed to get balance", error);
      }
    };

    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsMinting(true);
      await editionDrop!.claim("0", 1);
      console.log(
        `Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop!.getAddress()}/0`
      );
      setHasMembershipNFT(true);
    } catch (error) {
      setHasMembershipNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsMinting(false);
    }
  };

  // ウォレットと接続していない場合、接続ボタンを表示
  if (!address) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to VisualizeDAO
          </h1>
          <div className={styles.connect}>
            <ConnectWallet />
          </div>
        </main>
      </div>
    );
  }
  // 接続されたウォレットアドレスがGoerliかどうか判定
  else if (address && network && network.data.chain?.id !== ChainId.Goerli) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>ネットワークをGoerliに切り替えてください</h1>
          <br/>
          <div>このアプリはGoerliテストネットでのみ動作します。</div>
          <div>ウォレットから接続中のネットワークを切り替えてください。</div>
        </main>
      </div>
    );
  }
  // DAO ダッシュボード画面を表示
  else if (hasMembershipNFT){
    return (
      <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>VisualizeDAO Member Page</h1>
        <p>プロジェクトを登録する。もしくは面白そうなプロジェクトに参画してみよう。</p>
      </main>
    </div>
    );
  }
  // ウォレットと接続している場合、Mintボタンを表示
  else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Mint DAOMembershipNFT(free)</h1>
          <button disabled={isMinting} onClick={mintNft}>
            {isMinting ? "Minting..." : "Mint your nft (FREE)"}
          </button>
        </main>
      </div>
    )
  };
};

export default Home;
