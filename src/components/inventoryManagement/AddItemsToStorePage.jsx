import React from 'react'
import StoreSelection from './StoreSelection'
import ItemSelection from './ItemSelection'

const AddItemsToStorePage = () => {
  return (
    <div style={{display:'flex'}}>
      <StoreSelection/>
      <ItemSelection/>
      
    </div>
  )
}

export default AddItemsToStorePage
