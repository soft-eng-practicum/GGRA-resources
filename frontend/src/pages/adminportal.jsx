import { useState, useEffect } from 'react'
import { ResourceDialog, ResourceCard } from '@/components'
import { Button } from '@/components/ui/button'

function DynamicList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-row h-screen p-6 align-middle items-center">
      <div className="flex flex-col border-1 shadow-lg rounded-lg p-6 bg-gray-50">
        <ResourceCard className="bg-white" />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="mt-4 w-full bg-gray-100 text-green-300 text-3xl shadow-lg font-bold border border-gray-200 hover:bg-gray-300"
        >
          +
        </Button>
      </div>
      <ResourceDialog />
    </div>
  )
}

export default DynamicList
