import React, { createContext, useState } from 'react';

export const AccountSettingsContext = createContext();

export const AccountSettingsProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState('Your Company Name');
  const [name, setName] = useState('Nathaniel');
  const [lastName, setLastName] = useState('Poole');
  const [phone, setPhone] = useState('555-555-5555');
  const [email, setEmail] = useState('nathaniel.poole@microsoft.com');
  const [address, setAddress] = useState('1234 Microsoft Way, Redmond, WA 98052');
  const [edit, setEdit] = useState(false);

  const editProfile = () => {
    setEdit(!edit);
  };

  return (
    <AccountSettingsContext.Provider value={{ companyName, setCompanyName, name, setName, lastName, setLastName, phone, setPhone, email, setEmail, address, setAddress, edit, editProfile }}>
      {children}
    </AccountSettingsContext.Provider>
  );
};