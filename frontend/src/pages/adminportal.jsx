import { useState, useEffect } from 'react'
import { ResourceDialog, ResourceCard } from '@/components'
import { Button } from '@/components/ui/button'

function DynamicList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-row h-screen w-full p-6 items-center align-middle justify-center gap-4">
      <div className="flex flex-col h-[90vh] w-2/3 border-1 shadow-lg rounded-lg px-6 pt-6 bg-gray-50">
        <ResourceCard className="bg-white" />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="my-4 py-5 bg-gray-200 text-green-300 text-3xl shadow-lg font-bold border border-gray-300 hover:bg-gray-300"
        >
          +
        </Button>
      </div>
      <ResourceDialog className="w-1/3" />
    </div>
  )
}

export default DynamicList
