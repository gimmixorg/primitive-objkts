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
    { address: 'tz1TxDL7npfYDSyvrZFC4deUPMySvsL6xARU', type: 'creations' }
  ]);
  const [time, setTime] = useState<number>(10);
  const [unit, setUnit] = useState<'s' | 'm' | 'h'>('m');
  const [mode, setMode] = useState<'ordered' | 'random'>('ordered');
  const config = { addresses, time, unit, mode };
  return (
    <div className="index">
      <div className="left">
        <div className="badge">PUT WEB3 ART ON YOUR EO1 or EO2</div>
        <div className="title">
          Get a live updating view of your NFT collection onto your digital
          frame, or combine your friends and favorites into one big group frame
          to share.
        </div>
        <div className="description">
          Enter up to 10 wallet addresses (Ethereum or Tezos).
        </div>
        <AddressTextInputs addresses={addresses} setAddresses={setAddresses} />
        <div className="section-title">Customize</div>
        <div className="customize">
          <div className="modes">
            <div className="customize-title">Loop mode</div>
            <div className="spacer"></div>
            <div className="modes">
              <div
                onClick={() => setMode('ordered')}
                className={`mode ${mode == 'ordered' ? 'selected' : ''}`}
              >
                Ordered
              </div>
              <div
                onClick={() => setMode('random')}
                className={`mode ${mode == 'random' ? 'selected' : ''}`}
              >
                Random
              </div>
            </div>
          </div>
          <div className="timer">
            <div className="customize-title">Time per piece</div>
            <div className="spacer" />
            <input
              type="number"
              value={time}
              onChange={e => setTime(parseFloat(e.target.value))}
              min={1}
              required
            />
            <div className="units">
              <div
                onClick={() => setUnit('s')}
                className={`unit ${unit == 's' ? 'selected' : ''}`}
              >
                sec
              </div>
              <div
                onClick={() => setUnit('m')}
                className={`unit ${unit == 'm' ? 'selected' : ''}`}
              >
                min
              </div>
              <div
                onClick={() => setUnit('h')}
                className={`unit ${unit == 'h' ? 'selected' : ''}`}
              >
                hr
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="iframe-wrapper">
          <iframe
            src={`/frame?c=${encodeURIComponent(JSON.stringify(config))}`}
            frameBorder={0}
          />
        </div>
        <div className="preview">LIVE PREVIEW</div>
        <div className="url-wrapper">
          <div className="url-title">Your Frame URL:</div>
          <a
            className="url-preview"
            target="_blank"
            href={`https://primitive-objkts.gimmix.org/frame?c=${encodeURIComponent(
              JSON.stringify(config)
            )}`}
          >
            https://primitive-objkts.gimmix.org/frame?c=
            {encodeURIComponent(JSON.stringify(config))}
          </a>
          <div className="url-info">
            To display on an Electric Object,{' '}
            <a href="https://www.electricobjects.com/set_url" target="_blank">
              paste the URL here
            </a>
            .
          </div>
        </div>
      </div>
      <style jsx>{`
        .index {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 40px;
          width: 100%;
          height: 100%;
          overflow-y: auto;
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
        .url-wrapper {
          width: 100%;
          max-width: 400px;
          margin-top: 20px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 12px;
        }
        .url-preview {
          word-break: break-all;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          border: 1px solid black;
          border-radius: 3px;
          padding: 5px;
          background-color: ghostwhite;
          margin-top: 5px;
          display: block;
          text-decoration: none;
          color: black;
        }
        .url-info {
          margin-top: 5px;
        }
        .customize-title {
          font-size: 14px;
          width: 120px;
        }
        .timer {
          display: flex;
          align-items: center;
        }
        .modes {
          margin-bottom: 5px;
        }
        .units,
        .modes {
          display: flex;
          align-items: center;
        }
        .unit,
        .mode {
          margin-left: 5px;
          background-color: #f1f1f1;
          border: 1px solid #ccc;
          padding: 5px 10px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 12px;
          border-radius: 3px;
          cursor: pointer;
        }
        .unit.selected,
        .mode.selected {
          background-color: black;
          border-color: black;
          color: white;
        }
        .timer input {
          flex: 1 1 auto;
          margin-right: 5px;
          border: 1px solid #ccc;
          border-radius: 3px;
          font-size: 14px;
          padding: 5px;
          max-width: 100px;
          text-align: right;
        }
        .section-title {
          margin-top: 20px;
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .spacer {
          flex: 1 1 auto;
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
