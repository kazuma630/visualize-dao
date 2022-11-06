import * as React from 'react';
import Head from 'next/head';

export default function BaseHead(): JSX.Element {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Visualize DAO</title>
      <meta name="title" content="Visualize DAO" />
      <meta name="description" content="DAO上の貢献を可視化するためのツール" />
    </Head>
  ); 
}