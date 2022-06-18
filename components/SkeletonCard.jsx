import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const skeletonCard = () => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
    <div className="w-full m-auto">
          <div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-2xl items-center border-[1px] border-[#00000025] hover:cursor-default cursor-default">
            <div className="card-wrap relative m-auto outline-none hover:cursor-default " >
              <div className="h-full py-3 flex flex-col">
                <div className="text-center px-2">
                  <div className="flex justify-center mb-1">
                    <Skeleton width={100} height={20}/>
                  </div>
                  <Skeleton width={50} />
                </div>
                <div className=" flex justify-center object-contain w-full h-48 ">
                  <Skeleton height={190} width={200} />
                </div>
                <div className="px-6 pt-5 flex justify-between items-center">
                  <div>
                    <Skeleton width={150} height={30} />
                  </div>
                  <Skeleton circle={true} height={30} width={30} />
                </div>
              </div>
              <div className="px-6 relative mt-2">
                <div className="block pb-2">
                  <div className="text-gray-700 text-2xl">
                    <div className="flex items-baseline space-x-1">
                      <Skeleton width={150} height={50} />
                    </div>
                  </div>
                </div>
                <div className="block pb-2">
                  {/* <p className="text-gray-800 text-xs">
                    Rent </p> */}
                    <Skeleton width={150} height={50} />
                  <div className="text-gray-700 text-xl">
                    <div className="flex items-baseline space-x-1">
                    </div>
                  </div>
                </div>
                <div className="block pb-2">
                  <div className="text-gray-700 text-2xl">
                    <div className="flex items-baseline space-x-1 mt-2">
                      <Skeleton width={209} height={30} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end p-3 md:items-baseline">
                <Skeleton width={80} height={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default skeletonCard


