import React from 'react'

function Loading() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-10 w-64 bg-gray-100 rounded-xl animate-pulse mb-2" />
          <div className="h-6 w-96 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white shadow-soft">
                <div className="w-6 h-6 bg-gray-100 rounded-lg animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-4 w-96 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[140px] w-full bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border shadow-soft p-6">
              <div className="h-[400px] w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>

            <div className="bg-white rounded-2xl border shadow-soft p-6">
              <div className="h-[400px] w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className="h-[180px] w-full bg-gray-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading