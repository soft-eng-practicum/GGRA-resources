import {
  ResourceDialogProviders,
  ResourceDialogCategories,
  ResourceCardProviders,
  ResourceCardCategories,
  ResourceRefresh,
} from '@/components'

import { useEffect, useState } from 'react'

function DynamicList() {
  const [categoryItems, setCategoryItems] = useState([])
  const [providerItems, setProviderItems] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [providersRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:3000/api/getProviders'),
          fetch('http://localhost:3000/api/getCategories'),
        ])

        if (!providersRes.ok || !categoriesRes.ok)
          throw new Error('One or more fetches failed.')

        const providersPayload = await providersRes.json()
        const categoriesPayload = await categoriesRes.json()

        const providerList = JSON.parse(providersPayload.content)
        const categoryList = JSON.parse(categoriesPayload.content)

        setProviderItems(
          providerList.map((item) => ({
            catId: item.catId,
            id: item.id,
            name: item.name,
            description: item.description,
            street: item.street,
            city: item.city,
            state: item.state,
            zip: item.zip,
            phone: item.phone,
            email: item.email,
            website: item.website,
            longitude: item.lng,
            latitude: item.lat,
          })),
        )

        setCategoryItems(
          categoryList.map((item) => ({
            catId: item.catId,
            type: item.type,
          })),
        )
      } catch (err) {
        console.error('Error fetching resources or categories:', err)
      }
    }

    fetchAllData()
  }, [])

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 items-center align-middle justify-center gap-4">
      <div className="flex flex-col h-[1000px] lg:h-[90vh] relative w-full lg:w-1/2 border-1 shadow-lg rounded-lg pt-6 bg-gray-50">
        <div className="flex flex-row justify-between mb-5 px-12">
          <p className="font-bold text-3xl">Categories</p>
          <ResourceRefresh
            setItems={setCategoryItems}
            endpoint="getCategories"
          />
        </div>
        <ResourceCardCategories
          className="bg-white overflow-y-auto"
          setItems={setCategoryItems}
          items={categoryItems}
        />
        <ResourceDialogCategories />
      </div>
      <div className="flex flex-col  h-[1000px] lg:h-[90vh] relative w-full lg:w-1/2 border-1 shadow-lg rounded-lg pt-6 bg-gray-50">
        <div className="flex flex-row justify-between mb-5 px-12">
          <p className="font-bold text-3xl">Providers</p>
          <ResourceRefresh
            setItems={setProviderItems}
            endpoint="getProviders"
          />
        </div>
        <ResourceCardProviders
          className="bg-white overflow-y-auto"
          setItems={setProviderItems}
          items={providerItems}
        />
        <ResourceDialogProviders />
      </div>
    </div>
  )
}

export default DynamicList
