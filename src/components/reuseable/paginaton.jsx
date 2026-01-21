import React from 'react'

const Paginaton = ({totalPages, currentPage, onPageChange}) => {


    const pages = Array.from({length: totalPages}, (_,index) => index + 1)
  return (
    <div className='w-full flex itees-center justify-center '>

            <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="inline-flex mx-2 gap-2">
        {pages.map((page) => {
            return (
                <button
                    key={page}
                    className={`px-3 py-1 rounded hover:bg-gray-600 transition ${
                        currentPage === page ? "bg-gray-600 text-white" : "bg-gray-700 text-white"
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            )
        })}

        </div>


          <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => onPageChange(currentPage  + 1)}
        disabled={currentPage === totalPages}
      >
        Prev
      </button>
      
    </div>
  )
}

export default Paginaton
