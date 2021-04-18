import React, { useState } from 'react';
import Head from 'next/head';
import useConfig from '@app/features/useConfig';
import FrameETH from '@app/components/FrameETH';
import FrameTZ from '@app/components/FrameTZ';

const Frame = () => {
  const { addresses } = useConfig();
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(0);
  const nextUser = () => {
    setIndex(index => (index + 1) % (addresses.length || 1));
    setTurn(turn => turn + 1);
  };
  const activeUser = addresses[index];
  return (
    <div className="frame">
      <Head>
        <title>
          Art from {addresses.map(a => a.name || a.address).join(', ')}
        </title>
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`Art from ${addresses
            .map(a => a.name || a.address)
            .join(', ')}`}
        />
        <meta
          name="twitter:description"
          content="Get a live updating view of your NFT collection onto your digital
          frame, or combine your friends and favorites into one big group frame
          to share.."
        />
        <meta
          name="twitter:image"
          content="https://primitiv-eobjkts.gimmix.org/static/empty.jpg"
        />
        <link
          rel="icon"
          href="https://primitive-objkts.gimmix.org/static/empty.jpg"
        />
      </Head>
      {addresses.length == 0 && <div className="empty"></div>}
      {activeUser?.address.startsWith('0x') && (
        <FrameETH user={activeUser} turn={turn} onComplete={nextUser} />
      )}
      {activeUser?.address.startsWith('tz') && (
        <FrameTZ user={activeUser} turn={turn} onComplete={nextUser} />
      )}
      <style jsx>{`
        .frame {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          font-family: 'Inter', sans-serif;
          background-color: black;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

Frame.noLayout = true;

export default Frame;
