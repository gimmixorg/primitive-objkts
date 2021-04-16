import AddressTextInputs, {
  AddressInputType
} from '@app/components/AddressTextInputs';
import React, { useState } from 'react';

const IndexPage = () => {
  const [addresses, setAddresses] = useState<AddressInputType[]>([
    {
      address: 'tz1gqaKjfQBhUMCE6LhbkpuittRiWv5Z6w38',
      type: 'creations'
    },
    { address: 'tz1iGcF8HVtYJpCFAsLX6nwYgQgDR162VNBi', type: 'creations' },
    { address: 'tz1R4bLnuw5uwWLrvFV3vajbw2eBXb6MQ3F3', type: 'creations' },
    { address: 'tz1TxDL7npfYDSyvrZFC4deUPMySvsL6xARU', type: 'creations' },
    { address: 'tz1Q4wtbjXfPvNxpj8NfztiFDV6Mzeu2RVx8', type: 'creations' }
  ]);
  return (
    <div className="index">
      <div className="left">
        <div className="badge">PUT WEB3 ON YOUR EO1 or EO2</div>
        <div className="title">
          Make a live updating view of your NFT collection for your digital
          frame, or combine your friends and favorites into one big group frame
          to share.
        </div>
        <div className="description">
          Enter up to 10 wallet addresses (Ethereum or Tezos).
        </div>
        <AddressTextInputs addresses={addresses} setAddresses={setAddresses} />
      </div>
      <div className="right">
        <div className="iframe-wrapper">
          <iframe
            src={`/frame?addresses=${encodeURIComponent(
              JSON.stringify(addresses)
            )}`}
            frameBorder={0}
          />
        </div>
        <div className="preview">LIVE PREVIEW</div>
        <div className="url-preview">
          https://primitive-objkts.gimmix.org/frame?addresses=
          {encodeURIComponent(JSON.stringify(addresses))}
        </div>
      </div>
      <style jsx>{`
        .index {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 40px;
          width: 100%;
          height: 100%;
          overflow-y: hidden;
          padding: 20px;
          padding-bottom: 80px;
        }
        .left {
          padding: 30px;
          border: 3px solid #333;
          overflow-y: auto;
          max-height: 100%;
        }
        .title {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol' !important;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.5em;
          margin-bottom: 20px;
        }
        .description {
          margin-bottom: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol' !important;
        }
        .right {
          background-color: #f1f1f1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 3px solid #333;
        }
        .iframe-wrapper {
          height: 480px;
          width: 270px;
          overflow: hidden;
          outline: 10px solid #333;
          background-color: black;
        }
        .preview {
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 20px;
        }
        iframe {
          outline: none;
          height: 1920px;
          width: 1080px;
          transform: scale(0.25);
          transform-origin: top left;
        }
        .badge {
          background-color: blueviolet;
          padding: 5px 10px;
          font-size: 14px;
          margin-bottom: 20px;
          color: white;
          display: inline-block;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          border-radius: 3px;
        }
        .url-preview {
          overflow: hidden;
          width: 100%;
          max-width: 400px;
          margin-top: 20px;
          word-break: break-all;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        @media (max-width: 768px) {
          .index {
            display: block;
          }
          .left {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
