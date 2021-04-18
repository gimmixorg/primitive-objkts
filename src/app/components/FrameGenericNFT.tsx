import useConfig from '@app/features/useConfig';
import React from 'react';

const FrameGenericNFT = ({
  image,
  name,
  description,
  advanceToNext
}: {
  image: string;
  name: string;
  description: string;
  advanceToNext: () => void;
}) => {
  const { fill, metadata } = useConfig();
  return (
    <div className="nft">
      <img src={image} onError={advanceToNext} />
      {metadata == 'show' && (
        <div className="meta">
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </div>
      )}
      <style jsx>{`
        .nft {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: ${fill};
        }
        .meta {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px;
        }
        .name {
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 5px;
          text-shadow: 0px 0px 4px rgba(0, 0, 0.1);
        }
        .description {
          opacity: 0.7;
          font-size: 18px;
          line-height: 1.5em;
          text-shadow: 0px 0px 4px rgba(0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default FrameGenericNFT;
