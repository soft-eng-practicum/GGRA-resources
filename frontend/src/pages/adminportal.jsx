import {
  ResourceDialogProviders,
  ResourceDialogCategories,
  ResourceCardProviders,
  ResourceCardCategories,
} from '@/components'

function DynamicList() {
  return (
    <div className="flex flex-col lg:flex-row w-full p-6 items-center align-middle justify-center gap-4">
      <div className="flex flex-row sm:flex-col h-[1000px] lg:h-[90vh] relative w-full sm:w-1/2 border-1 shadow-lg rounded-lg pt-6 bg-gray-50">
        <p className="font-bold ml-12 mb-5 text-3xl">Categories</p>
        <ResourceCardCategories className="bg-white overflow-y-auto" />
        <ResourceDialogCategories />
      </div>
      <div className="flex flex-row sm:flex-col  h-[1000px] lg:h-[90vh] relative w-full sm:w-1/2 border-1 shadow-lg rounded-lg pt-6 bg-gray-50">
        <p className="font-bold ml-12 mb-5 text-3xl">Providers</p>
        <ResourceCardProviders className="bg-white" />
        <ResourceDialogProviders />
      </div>
    </div>
  )
}

export default DynamicList
