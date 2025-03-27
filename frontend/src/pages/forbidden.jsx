import React from 'react'

function Forbidden() {
  return (
    <div className="h-svh mb-10">
      <div className="p-10 text-center text-red-700 bg-red-100 rounded-xl shadow-lg max-w-xl mx-auto mt-20">
        <h1 className="text-4xl font-bold">403 Forbidden</h1>
        <p className="mt-4 text-lg">
          You don’t have access to this resource or repository.
        </p>
      </div>
    </div>
  )
}

export default Forbidden
