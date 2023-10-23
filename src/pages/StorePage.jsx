import React from 'react'
import StoreCreationPage from '../components/storeManagement/StoreCreationPage'
import StoreListPage from '../components/storeManagement/StoreListPage'

function StorePage() {
  return (
    <div>
      <StoreCreationPage/>
      <StoreListPage/>
    </div>
  )
}

export default StorePage
