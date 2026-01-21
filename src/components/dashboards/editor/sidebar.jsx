// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowBigLeftIcon, CornerDownLeft, GripVertical, Pencil, Plus, SparkleIcon, Trash2 } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';




const EditorSidebar = ({data,  selectedContent, handleSelectContent,  setChapNum }) => {

  console.log('Data info:', data)
 
    const navigate = useNavigate()
  return (
    <div className=' w-full h-full  flex flex-col justify-between 
    gap-2 border-r  border-zinc-700 py-3'>

        <div className='w-full'>


<div className='flex flex-col w-full gap-2 border-b border-zinc-700 pb-4 px-3'>

            <div className='flex items-center  gap-2 p-3 cursor-pointer'>
                <CornerDownLeft color='white' size={14} />
            <span
            onClick={() => navigate(-1)}
             className='text-zinc-300 text-sm cursor-pointer'>Back to  Dashboard </span>
            </div>


<div className='flex flex-col w-full'>
            <h1 className='font-semibold text-zinc-300 text-base
             md:text-xl'>{data?.title ?? ''}</h1>
               <p className="text-zinc-400  md:text-sm max-w-2xl"> {data.desc ?? ''}</p>

               </div>

            </div>

            <div className="flex-1 gap-2 overflow-y-scroll max-h-[56vh] ">

            {/*  CERTIFICATION*/}

            <div>
   
                 <div onClick={() => handleSelectContent(data?.certification, 'Certification')}
          className={`flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer relative group
          hover:bg-zinc-800/40 transition-all text-zinc-400 shadow-lg shadow-zinc-900
          `}
        >
           <GripVertical size={14} className="text-zinc-500" />
          <h1>CERTIFICATION</h1>

   

        </div>

            </div>


        {/*  DEDICATION*/}

            <div>
   
                 <div  onClick={() => handleSelectContent(data?.dedication, 'Dedication')}
          className={`flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer relative group
          hover:bg-zinc-800/40 transition-all text-zinc-400 shadow-lg shadow-zinc-900
          `}
        >
           <GripVertical size={14} className="text-zinc-500" />
          <h1>DEDICATION</h1>

  

        </div>

            </div>

                 
                                    {/*  Table of contents*/}
                 
                             <div>
                    
                                  <div onClick={() => handleSelectContent(data?.tableOfContents, 'Table Of Content')}
                           className={`hidden items-center gap-2 px-3 py-3 rounded-md cursor-pointer relative group
                           hover:bg-zinc-800/40 transition-all text-zinc-400 shadow-lg shadow-zinc-900
                           `}
                         >
                            <GripVertical size={14} className="text-zinc-500" />
                           <h1>TABLE OF CONTENT</h1>
                 
                   
                 
                         </div>
                 
                             </div>
                 


     
             {/*  abstract*/}
     
                 <div>
        
                      <div onClick={() => handleSelectContent(data?.abstract, 'Abstract')} 
               className={`flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer relative group
               hover:bg-zinc-800/40 transition-all text-zinc-400 shadow-lg shadow-zinc-900
               `}
             >
                <GripVertical size={14} className="text-zinc-500" />
               <h1>ABSTRACT</h1>
     
           
     
             </div>
     
                 </div>

            {/* chpaters */}
                <div 
                 className="flex flex-col gap-2 p-1 ">
      {data?.chapters?.map((chapter,index) => (
        <div onClick={() => {
          handleSelectContent(chapter)
                     setChapNum(index + 1)
        
        }}
          key={chapter._id}
          className={`flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer relative group
          hover:bg-zinc-800/40 transition-all text-zinc-400 shadow-lg shadow-zinc-900
    ${selectedContent?.type === 'chapter' && 
    selectedContent?.title === chapter.title ? 'bg-zinc-800' : ''}`}


        >
          <GripVertical size={14} className="text-zinc-500" />

          <span className="text-sm">
            Chapter {index + 1}: {chapter.title && chapter.title.slice(0,37) + '...'}
          </span>

                {/* Icons */}
                <div className="absolute top-3 right-3  gap-2 z-20 hidden
                  bg-zinc-500 max-w-80">
           <button
                  className="p-1  rounded-md text-white ">
                      <SparkleIcon size={16} />
                   </button>

                  <button className="p-1  rounded-md text-red-400
                   ">
                    <Trash2 size={16} />
                  </button>
                </div>
          
        </div>
      ))}
    </div>


    </div>

        </div>

 

        
        <div className='w-full px-2 hidden'>
                <motion.button
            whileHover={{ scale: 1.05,backgroundColor: "#27272a" }}
            whileTap={{ scale: 0.95 }}
            className="h-10 px-2 md:px-6 rounded-md border border-zinc-700 cursor-pointer w-full
              bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all  text-sm font-medium
               flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add new Chpater
          </motion.button>
        </div>


      
    </div>
  )
}

export default EditorSidebar
