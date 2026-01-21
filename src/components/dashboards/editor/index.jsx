import React, {  useEffect,useMemo,useState } from 'react'
import DashboardLayout from '../../layouts/dashboardLayout'
import Sidebar from '../projects/sidebar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs } from '@heroui/react'
import { itemVariants } from '../../../lib'
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion"
import { ArrowRight, CornerRightDown, FileInput, FileText, PlayCircle } from 'lucide-react'
import MDEditor from "@uiw/react-md-editor";
import { useSingleProjectQuery, useUpdateProjectMutation } from '../../../queries/project.queries'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../reuseable/loader'
import EditorSidebar from './sidebar'

const EditorIndex = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useSingleProjectQuery(id);
  const { mutateAsync } = useUpdateProjectMutation();
  const [chapNum,setChapNum] = useState(1)


  const [tab, setTab] = useState("EDITOR");
  const [manualSelection, setManualSelection] = useState(null);



const selectedContent = manualSelection ?? data?.chapters?.[0];


const initialContent = useMemo(() => {
  if (!selectedContent) return "";
  return selectedContent.sections?.length
    ? selectedContent.sections.map(s => `### ${s.title}\n${s.content}`).join("\n\n")
    : "";
}, [selectedContent]);

const [content, setContent] = useState(initialContent);
const [chapterTitle, setChapterTitle] = useState(selectedContent?.title || "");

// Update content and title whenever selectedContent changes
useEffect(() => {
  if (selectedContent) {
    setChapterTitle(selectedContent.title || "");
    setContent(
      selectedContent.sections?.length
        ? selectedContent.sections.map(s => `### ${s.title}\n${s.content}`).join("\n\n")
        : ""
    );
  }
}, [selectedContent]);



  function handleSelectContent(chapter) {
    setManualSelection(chapter);
    console.log("Selected chapter:", chapter);
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

function sanitizeProjectForUpdate(project) {
  if (!selectedContent) return project;

  // Split editor content into sections
  const updatedSections = content
    .split(/(?=### )/) // split at each section header
    .map((s) => {
      const match = s.match(/### (.+)\n([\s\S]*)/);
      if (!match) return null;
      return { title: match[1].trim(), content: match[2].trim() };
    })
    .filter(Boolean);

  return {
    title: project.title ?? "",
    desc: project.desc ?? "",
    author: project.author ?? "",
    logo: project.logo ?? "",
    regNo: project.regNo ?? "",
    status: project.status ?? "",
    chapters: project.chapters?.map((chapter) => {
      const isSelectedChapter = selectedContent === chapter;
      return isSelectedChapter
        ? { title: chapterTitle, sections: updatedSections }
        : { title: chapter.title, sections: chapter.sections };
    }),
  };
}




  async function handleUpdateProj() {
    if (!id) return;
    const payload = sanitizeProjectForUpdate(data);
      console.log("Payload to update:", payload); 
    await mutateAsync({ id, payload });
    navigate("/dashboard");
  }

  if (isLoading) return <Loader />;
  if (error) console.log("Error fetching Project:", error.message);

  return (
<DashboardLayout>
  <section className='flex flex-col md:flex-row w-full max-h-[87vh] 2xl:max-h-[90vh]  bg-slate-950  '>

    <div className='md:max-w-[28%]  w-full hidden md:flex '>
<EditorSidebar
  data={data}
  selectedContent={selectedContent}
  handleSelectContent={handleSelectContent}
    setChapNum={setChapNum}
/>

    </div>



{/* Main Content */}
   <div className='w-full flex flex-col  items-center  gap-4  overflow-y-auto'>


{/* tabs */}

<div className='flex items-center justify-between w-full border-b border-zinc-700 p-3'>
         <div className="flex gap-4  py-4 px-3">
  <Tabs
  aria-label="Editor tabs"
  size="sm"
  className="bg-zinc-900/50 border border-zinc-700 rounded-md "
  selectedKey={tab}
  onSelectionChange={(key) => setTab(key)}
>
  <Tab
    key="EDITOR"
    title={
      <span className="whitespace-nowrap">
        Editor
      </span>
    }
    className={`px-4 py-2 rounded-md text-sm font-medium transition-all
      ${
        tab === "EDITOR"
          ? "bg-zinc-700 text-zinc-200"
          : "text-zinc-400 hover:text-zinc-200"
      }
    `}
  />

  <Tab
    key="DETAILS"
    title={
      <span className="whitespace-nowrap">
       Preview
      </span>
    }
    className={`px-4 py-2 rounded-md text-sm font-medium transition-all
      ${
        tab === "DETAILS"
          ? "bg-zinc-700 text-zinc-200"
          : "text-zinc-400 hover:text-zinc-200"
      }
    `}
  />
</Tabs>


    </div>

{tab === "EDITOR" && (
  <motion.div
    variants={itemVariants}
    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center"
  >

    <Dropdown>
      <DropdownTrigger>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto h-10 px-6 rounded-md bg-white text-black cursor-pointer
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
        className="bg-zinc-900 text-zinc-300 rounded-md min-w-[150px]"
      >
        <DropdownItem key="pdf" className="flex items-center gap-2">
          <FileText size={14} />
          Export as PDF
        </DropdownItem>

        <DropdownItem key="document" className="flex items-center gap-2">
          <FileText size={14} />
          Export as Document
        </DropdownItem>
      </DropdownMenu>

    </Dropdown>

    {/* SAVE BUTTON */}
    <motion.button
  onClick={() => handleUpdateProj(data)}

      whileHover={{ scale: 1.05, backgroundColor: "#27272a" }}
      whileTap={{ scale: 0.95 }}

      className="w-full sm:w-auto h-10 px-6 rounded-md border border-zinc-700
      bg-zinc-900/50 text-zinc-300 text-sm font-medium cursor-pointer
      hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
    >
      <PlayCircle size={16} />
      Save Changes
    </motion.button>
  </motion.div>
)}

</div>


{/* title */}




 { tab === 'EDITOR' ? <div className='flex w-full  justify-between border-b border-zinc-700 p-3 md:p-5'>

            <div className='flex flex-col gap-1'>
            <h2 className="text-2xl md:text-3xl font-semibold
             text-white">
         Editor
            </h2>
            <p className="text-zinc-400  md:text-sm max-w-2xl">
                   Chapter {chapNum}: { selectedContent?.title ? selectedContent?.title : 
                 ' Foundations of the minamlists hone methods'}

            </p>
          </div>

</div>

: 

<div className='flex w-full  justify-between border-b border-zinc-700 p-3 md:p-5'>

            <div className='flex flex-col gap-1'>
            <h2 className="text-2xl md:text-3xl font-semibold
             text-white">
 Preview Chapters
            </h2>
            <p className="text-zinc-400  md:text-sm max-w-2xl">
            Chapter 1: { selectedContent?.title ? selectedContent?.title : 
                 ' Foundations of the minamlists hone methods'}

            </p>
          </div>

</div>

            }


{tab === 'EDITOR' && (
  <div className='flex flex-col gap-2 w-full p-3 md:p-5'>
    <h2 className="text-zinc-400 md:text-sm max-w-2xl">
      Chapter Title
    </h2>

    <input
      value={chapterTitle}
      onChange={(e) => setChapterTitle(e.target.value)}
      className="
        w-full h-12 p-3 rounded-lg bg-zinc-900/60
        border border-zinc-700 text-sm text-white text-start
        focus:outline-none focus:ring-2 focus:ring-pink-500/40
      "
    />
  </div>
)}



{/* Editor text */}

{  tab === 'EDITOR' ?
<div className="w-full p-3 md:p-5 flex flex-col ">
  {/* Header / Title */}
  <div className="h-12 rounded-t-lg w-full p-3 border border-zinc-700 bg-zinc-800/50 flex items-center">
    <h1 className="text-white font-semibold text-sm md:text-base">
      T Markdown Editor
    </h1>
  </div>

  {/* Editor */}
  <MDEditor
    value={content}
    onChange={setContent}
    height={500}
    preview="edit"
    className="bg-transparent text-white border border-zinc-700 rounded-b-lg"
    textareaProps={{
      style: {
        background: "transparent",
        color: "white",
      },
    }}
    previewOptions={{
      style: {
        background: "transparent",
        color: "white",
      },
    }}
  />
</div>

:

<div className="min-h-[350px] w-full overflow-y-scroll space-y-6">
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
</div>


}




    </div>

    

    
    
  </section>
  </DashboardLayout>

  )
}

export default EditorIndex
