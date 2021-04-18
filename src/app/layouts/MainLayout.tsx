import Head from 'next/head';
import React, { FunctionComponent } from 'react';
import Link from 'next/link';

const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="main-layout">
      <Head>
        <title>PRIMITVE OBJKTS</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="info-bar">
        WORKS WITH{' '}
        <a href="https://hicetnunc.xyz" target="_blank">
          HIC ET NUNC
        </a>{' '}
        OBJKTs AND ETHEREUM NFTs. AUTO-ADJUSTS FOR ANY SCREEN, INCLUDING
        ELECTRIC OBJECTS EO1 AND EO2!
        <div className="stripes">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="pattern_Z4YTl"
                patternUnits="userSpaceOnUse"
                width="5"
                height="5"
                patternTransform="rotate(75)"
              >
                <line
                  x1="0"
                  y="0"
                  x2="0"
                  y2="5"
                  stroke="ghostwhite"
                  strokeWidth="5"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#pattern_Z4YTl)"
              opacity="0.1"
            />
          </svg>
        </div>
      </div>
      <header>
        <div>
          <Link href="/">
            <a className="factory">PRIMITIVE OBJKTS</a>
          </Link>
        </div>
        <div></div>
      </header>
      <main>{children}</main>
      <footer>
        <div>GIMMIX © MMXXI</div>
        <div>
          Free and Open Source
          <br />
          Not affiliated with or endorsed by Electric Objects or Hic Et Nunc.
        </div>
      </footer>
      <style jsx>{`
        .main-layout {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
        header {
          padding: 20px;
        }
        main {
          padding-top: 100px;
          padding-bottom: 20px;
          max-width: 1200px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: stretch;
          flex-direction: column;
        }
        .info-bar {
          padding: 5px 20px;
          background-color: blueviolet;
          color: white;
          text-transform: uppercase;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 12px;
          overflow: hidden;
          cursor: default;
          min-height: 26px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
        .info-bar a {
          color: white;
        }
        header {
          position: fixed;
          top: 26px;
          left: 0;
          right: 0;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .stripes {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .factory {
          font-size: 24px;
          text-decoration: none;
          font-weight: bold;
          color: black;
        }
        footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          right: 0;
          padding: 10px 20px;
          color: #aaa;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        footer div:last-of-type {
          text-align: right;
          font-size: 14px;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          font-family: 'Space Grotesk', sans-serif;
        }
        html,
        body {
          background-color: ghostwhite;
          margin: 0;
          padding: 0;
          height: 100%;
        }
        #__next {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
