import React, {  useMemo, useState } from 'react'
import DashboardLayout from '../../layouts/dashboardLayout'
import Sidebar from '../projects/sidebar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs } from '@heroui/react'
import { itemVariants } from '../../../lib'
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion"
import { ArrowRight, CornerDownLeft, CornerRightDown, FileInput, FileText, PlayCircle } from 'lucide-react'
import MDEditor from "@uiw/react-md-editor";
import { useSingleProjectQuery } from '../../../queries/project.queries'
import {  useNavigate, useParams } from 'react-router-dom'
import Loader from '../../reuseable/loader'
import ProjectSidebar from '../projects/sidebar'
import { useExportDocMutation } from '../../../queries'
import { useExportPDFMutation } from '../../../queries'

const ProjectDetail = () => {

  
    const navigate = useNavigate()
const {id} = useParams();
const {data, isLoading, error} = useSingleProjectQuery(id);

const {mutateAsync: exportDocx} = useExportDocMutation()
const { mutateAsync: exportPDF } = useExportPDFMutation();



const [manualSelection, setManualSelection] = useState(null);
const [chapNum,setChapNum] = useState(1)

const selectedContent = manualSelection ?? data?.chapters?.[0];

const content = useMemo(() => {
  if (!selectedContent?.sections?.length) return "";
  
  return selectedContent.sections
    .map(s => `### ${s.title}\n${s.content}`)
    .join("\n\n");
}, [selectedContent]);

if (!id) {
  console.log('No id provided');
  return;
}

if (isLoading) return <Loader />;
if (error) console.log('Error fetching Project:', error.message);

function handleSelectContent(item, title) {
  if (item.sections) {
    setManualSelection(item);
  } else {
    setManualSelection({
      title,
      sections: [{ title: '', content: item.content || '' }]
    });
  }
}


function parseSectionContent(rawContent) {
  if (!rawContent) return { text: "", subsections: [] };

  const regex = /{[^}]+}/g;
  const matches = rawContent.match(regex) || [];

  const subsections = matches
    .map((m) => {
      try {
        return JSON.parse(m);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const cleanText = rawContent.replace(regex, "").trim();

  return { text: cleanText, subsections };
}


async function handleExportDoc(id) {
  await exportDocx({ id });
}

async function handleExportPDF(id) {
  await exportPDF({ id });
}



  return (
<DashboardLayout>
  <section className='flex w-full  overflow-hidden    md:max-h-[87vh] 2xl:max-h-[90vh] '>

    <div className='md:max-w-[28%]   w-full hidden md:flex '>
<ProjectSidebar
  data={data}
  selectedContent={selectedContent}
  handleSelectContent={handleSelectContent}
  setChapNum={setChapNum}
/>

    </div>



{/* Main Content */}
   <div className='w-full flex flex-col  items-center  gap-4 '>


{/* tabs */}

<div className='flex items-center justify-end w-full border-b border-zinc-700 p-3'>




  <motion.div
    variants={itemVariants}
    className="flex flex-row items-center gap-4 w-full sm:w-auto justify-between"
  >

    
                <div className=' md:hidden flex items-center  gap-2 p-3 cursor-pointer'>
                    <CornerDownLeft color='white' size={14} />
                <span
                onClick={() => navigate(-1)}
                 className='text-zinc-300 text-sm cursor-pointer'>Back to  Dashboard </span>
                </div>
    

    <Dropdown>

      <DropdownTrigger>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
          whileTap={{ scale: 0.95 }}
          className="w-auto h-10 px-6 rounded-md bg-white text-black cursor-pointer
          text-sm font-medium hover:bg-zinc-200 transition-all
          flex items-center justify-center gap-2"
        >
          <FileInput  size={15}  color='black' />
          Export
          <CornerRightDown size={14} />
        </motion.button>

      </DropdownTrigger>

      <DropdownMenu
        aria-label="Export actions"
        className="bg-zinc-900 text-zinc-300 rounded-md min-w-40"
      >
        <DropdownItem onClick={() => handleExportPDF(data._id)}
         key="pdf" className="flex items-center gap-2">
  
         <h1 className='flex items-center gap-2 text-sm'>       
           <FileText size={14} />
          Export as PDF 
           </h1>

        </DropdownItem>

        <DropdownItem   onClick={() => handleExportDoc(data._id)}
        key="document" className="flex items-center gap-2">


         <h1 className='flex items-center gap-2 text-sm'>       
           <FileText size={14} />
          Export as Document
           </h1>
     

        </DropdownItem>
      </DropdownMenu>

    </Dropdown>


  </motion.div>


</div>


{/* title */}




 {/* <div className='flex w-full  justify-between border-b border-zinc-700 p-3 md:p-5'>

            <div className='flex flex-col gap-1'>
            <h2 className="text-2xl md:text-3xl font-semibold
             text-white">
        Chapter Editors
            </h2>
            <p className="text-zinc-400  md:text-sm max-w-2xl">
                   Editing: Chapter 1:{ selectedContent?.title ? selectedContent?.title : 
                 ' Foundations of the minamlists hone methods'}

            </p>
          </div>

</div> */}



{/* Chapters */}
{selectedContent && selectedContent.sections?.length > 0 && (
  <div className='flex w-full justify-between border-b border-zinc-700 p-3 md:p-5'>

    <div className='flex flex-col gap-1'>

<h2 className="text-2xl md:text-3xl font-semibold text-white">
  {!['Certification', 'Abstract', 'Dedication', 'tableOfContents'].includes(selectedContent?.title) && (
    <span>Chapter {chapNum}: </span>
  )}
  {selectedContent?.title}
</h2>


      <p className="text-zinc-400 md:text-sm max-w-2xl hidden">
        Chapter {chapNum}: {selectedContent.title}
      </p>
    </div>
  </div>
)}

{/* Dedication / Certification / Abstract */}
{selectedContent && (!selectedContent.sections || selectedContent.sections.length === 0) && (
  <div className='flex w-full justify-between border-b border-zinc-700 p-3 md:p-5'>
    <div className='flex flex-col gap-1'>
      <h2 className="text-2xl md:text-3xl font-semibold text-white">
        {selectedContent.title}
      </h2>
      <p className="text-zinc-400 md:text-sm max-w-2xl">
        {selectedContent.content}
      </p>
    </div>
  </div>
)}



{/* Editor text */}


{content && <div className="min-h-[250px] w-full overflow-y-scroll space-y-6">
  {selectedContent?.sections?.map((cont, idx) => {
    const { text, subsections } = parseSectionContent(cont.content);

    return (
      <div key={idx} className="flex flex-col gap-3 px-4">

        {/* Section Title */}
        <h2 className="text-lg font-semibold text-white">
          {cont.title}
        </h2>

        {/* Main Paragraph */}
        {text && (
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {text}
          </p>
        )}

        {/* Subsections */}
        {subsections.map((sub, i) => (
          <div key={i} className="pl-4 border-l border-zinc-700 space-y-2">

            <h3 className="text-sm font-semibold text-zinc-200">
              {sub.title}
            </h3>

         <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
  {Array.isArray(sub.content)
    ? sub.content.join(" ")
    : sub.content}
</p>

          </div>
        ))}
      </div>
    );
  })}
</div> }







    </div>

    

    
    
  </section>
  </DashboardLayout>

  )
}

export default ProjectDetail
