import { useState, useEffect } from 'react'
import { ResourceDialog, ResourceCard } from '@/components'
import { Button } from '@/components/ui/button'

function DynamicList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 items-center align-middle justify-center gap-4 overflow-y-auto">
      <div className="flex flex-col h-[1000px] lg:h-[90vh] w-full lg:w-2/3 border-1 shadow-lg rounded-lg pt-6 bg-gray-50">
        <ResourceCard className="bg-white" />
        <ResourceDialog />
      </div>
    </div>
  )
}

export default DynamicList
