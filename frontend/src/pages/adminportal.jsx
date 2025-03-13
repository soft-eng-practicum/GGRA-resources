import { useState, useEffect } from 'react'
import { ResourceDialog } from '@/components'
import { ResourceCard } from '@/components'

function DynamicList() {
  return (
    <div className="flex h-screen p-6">
      <div className="flex justify-center items-center transition-all duration-300">
        <ResourceCard />
      </div>
      <ResourceDialog />
      <style>
        {`
          @keyframes fade-slide {
            from {
              opacity: 0;
              transform: translateY(100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-slide {
            animation: fade-slide 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  )
}

export default DynamicList
