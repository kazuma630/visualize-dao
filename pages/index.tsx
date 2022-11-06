import { ConnectWallet, ChainId, useNetwork, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const [network, switchNetwork] = useNetwork();

  // 接続されたウォレットアドレスがGoerliかどうか判定
  if (address && network && network.data.chain?.id !== ChainId.Goerli) {
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
  } else return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to VisualizeDAO
        </h1>
        <br/>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
};

export default Home;
