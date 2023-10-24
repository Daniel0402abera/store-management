import React, { useState } from 'react'
import StoreSelection from './StoreSelection'
import ItemSelection from './ItemSelection'

const AddItemsToStorePage = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const handleSelectedItemIdChange = (newSelectedId) => {
    setSelectedItemId(newSelectedId);
  };
  const handleSelectedStoreIdChange = (newSelectedId) => {
    setSelectedStoreId(newSelectedId);
  };
  return (
    <div>
      <ItemSelection onSelectedIdChange={handleSelectedItemIdChange} selectedItemId={selectedItemId} />
      <div>Selected Item ID: {selectedItemId}</div>
      <StoreSelection onSelectedIdChange={handleSelectedStoreIdChange} />
      <div>Selected Store ID: {selectedStoreId}</div>
      
      
    </div>
  )
}

export default AddItemsToStorePage
