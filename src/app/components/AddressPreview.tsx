import React, { useState } from 'react';
import { AddressInputType } from './AddressTextInputs';
import { FaMinus, FaUserAlt } from 'react-icons/fa';
import { validateETH } from '@app/features/validators';
const AddressPreview = ({
  number,
  user,
  onChangeType,
  updateName,
  onRemoveClick
}: {
  number: number;
  user: AddressInputType;
  onChangeType: (type: string) => void;
  updateName: (name: string) => void;
  onRemoveClick: () => void;
}) => {
  const [nameInput, setNameInput] = useState('');
  const [isSettingName, setIsSettingName] = useState(false);
  const hex = validateETH(user.address)
    ? user?.address?.slice(-6)
    : parseInt(user.address, 36)
        .toString(16)
        .replace(/0/g, '')
        .slice(-11)
        .slice(0, 6);
  const onSaveNameClick = () => {
    updateName(nameInput.slice(0, 20));
    setIsSettingName(false);
  };
  return (
    <div className="address-preview">
      <div className="number">{number}</div>
      {!isSettingName ? (
        <>
          <div className="name" onClick={() => setIsSettingName(true)}>
            {user.name || <FaUserAlt />}
          </div>
          <div className="address">
            {user.address.slice(0, 6)}...{user.address.slice(-4)}
          </div>
          <div className="spacer" />
          <div className="type">
            {validateETH(user.address) ? (
              'ETH COLLECTION'
            ) : (
              <>
                TZ{' '}
                <select
                  value={user.type}
                  onChange={e => onChangeType(e.target.value)}
                >
                  <option value="collection">COLLECTION</option>
                  <option value="creations">CREATIONS</option>
                </select>
              </>
            )}
          </div>
          <div className="remove">
            <button onClick={onRemoveClick}>
              <FaMinus />
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={nameInput}
            maxLength={20}
            onChange={e => setNameInput(e.target.value)}
            className="name-input"
            placeholder={`Set nickname for ${user.address.slice(
              0,
              6
            )}...${user.address.slice(-4)}`}
          />
          <div className="buttons">
            <button onClick={onSaveNameClick}>Save</button>
            <button onClick={() => setIsSettingName(false)}>Cancel</button>
          </div>
        </>
      )}
      <style jsx>{`
        .address-preview {
          padding: 10px;
          background-color: #${hex}22;
          border: 1px solid #${hex}dd;
          border-radius: 3px;
          margin-bottom: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        .spacer {
          flex: 1 1 auto;
        }
        .type {
          font-size: 11px;
          color: #777;
          margin-right: 10px;
        }
        .number {
          font-variant-numeric: tabular-nums;
          font-weight: normal;
          color: #777;
          font-size: 14px;
          margin-right: 10px;
        }
        .type select {
          margin-left: 5px;
        }
        .remove button {
          outline: none;
          border: none;
          font-size: 14px;
          background-color: transparent;
          color: #777;
          cursor: pointer;
        }
        .remove button:hover {
          color: #333;
        }
        .name {
          cursor: pointer;
          padding: 4px;
          font-size: 12px;
          margin-right: 10px;
        }
        .address-preview :global(svg) {
          display: block;
        }
        .name-input {
          padding: 5px;
          flex: 1 1 auto;
          outline: none;
          font-size: 14px;
          border: 1px solid #ccc;
        }
        select {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 12px;
        }
        .buttons {
          margin-left: 0px;
        }
        .buttons button {
          cursor: pointer;
          background-color: black;
          border: 1px solid black;
          color: white;
          padding: 7px 10px;
          border: none;
          outline: none;
          border-radius: 3px;
          font-size: 12px;
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default AddressPreview;
