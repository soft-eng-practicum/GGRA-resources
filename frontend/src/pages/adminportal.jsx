import { useState, useEffect } from 'react'
import { ResourceDialog, ResourceCard } from '@/components'
import { Button } from '@/components/ui/button'

function DynamicList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 items-center align-middle justify-center gap-4 overflow-y-auto">
      <div className="flex flex-col h-[1000px] lg:h-[90vh] w-full lg:w-2/3 border-1 shadow-lg rounded-lg pt-6 bg-gray-50">
        <ResourceCard className="bg-white" />
        <Button
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          className="m-4 py-5 bg-gray-200 text-green-300 text-3xl shadow-lg font-bold border border-gray-300 hover:bg-gray-300"
        >
          +
        </Button>
      </div>
      {isDialogOpen && (
        <div className="flex flex-col h-[1000px] lg:h-[90vh] w-full lg:w-1/3 border-1 rounded-lg pt-6 shadow-lg bg-gray-50">
          <ResourceDialog />
          <Button
            type="submit"
            form="resourceForm"
            className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg m-4 py-5"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  )
}

export default DynamicList
