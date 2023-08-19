import React from 'react';
import { useState } from 'react';
import { t } from 'i18next';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const HoaxDropDownButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const{isOwner, usedFunction} = props;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const deleteHoax = () => {
    confirmAlert({
      title: t('Delete Hoax'),
      message: t('Are you sure to delete this hoax?'),
      buttons: [
        {
          label: t('Yes'),
          onClick: () => {
            usedFunction();
          },
        },
        {
          label: t('No'),
          onClick: () => {},
        },
      ],
    });

  };

  return (
    <div className="dropdown">
      <button id='dropdownMenuButton' className="btn dropdown-toggle" type="button" onClick={handleToggle} onBlur={handleBlur} data-toggle="dropdown">
        <i className="material-symbols-outlined">more_vert</i>
      </button>
      
        <div className={isOpen ? "dropdown-menu show": "dropdown-menu"} aria-labelledby="dropdownMenuButton">
          {isOwner && (
            <button className="dropdown-item d-flex" onClick={deleteHoax}><i className="material-symbols-outlined">delete</i> {t('Delete Hoax')}</button>
          )}
        </div>
    </div>
  );
};

export default HoaxDropDownButton;