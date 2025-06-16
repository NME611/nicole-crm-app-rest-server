import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './restdb.js';
import './App.css';
import { CustomerList } from './CustomerList.js';
import { CustomerAddUpdateForm } from './CustomerAddUpdateForm.js';

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';

  // Call getCustomers when formObject changes (or you could use a 'dataChange' counter)
  useEffect(() => { getCustomers() }, [formObject]);

  const getCustomers = function () {
    getAll(setCustomers);
  }

  const handleListClick = function (item) {
    if (formObject.id === item.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  }

  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject }
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    let postOpCallback = () => { setFormObject(blankCustomer); }
    if (formObject.id >= 0) {
      deleteById(formObject.id, postOpCallback);
    } else {
      setFormObject(blankCustomer);
    }
  }

  let onSaveClick = function () {
    let postopCallback = () => { setFormObject(blankCustomer); }
    if (mode === 'Add') {
      post(formObject, postopCallback);
    }
    if (mode === 'Update') {
      put(formObject, postopCallback);
    }
  }

  let pvars = {
    mode: mode,
    handleInputChange: handleInputChange,
    formObject: formObject,
    onDeleteClick: onDeleteClick,
    onSaveClick: onSaveClick,
    onCancelClick: onCancelClick
  }

  return (
    <div>
      <CustomerList
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}
      />
      <CustomerAddUpdateForm {...pvars} />
    </div>
  );
}

export default App;
