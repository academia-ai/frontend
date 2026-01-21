import { useState } from "react";
import { SheetClose } from "../../ui/sheet";
import {
  SparkleIcon,
  BookIcon,
  ListOrderedIcon,
  PenLine,
  LightbulbIcon,
  Check,
  Plus,
  ArrowLeft,
  Trash,
  Loader,
} from "lucide-react";
import { useCreateProjectMutation,  useGenerateProjectMutation } from "../../../queries/project.queries";
// import { toast } from "sonner";
import { useUserQuery } from "../../../queries";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const CreateProject = ({ onClose }) => {

  const navigate = useNavigate()
  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setNumChapters] = useState(null);
  const [topic, setTopic] = useState("");
    const [regNo, setRegNo] = useState("");
  const [writingStyle, setWritingStyle] = useState("FORMAL");

  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [step, setStep] = useState("1");
  const [error, setError] = useState('')

  const [errors] = useState({
    title: "",
    numChapters: "",
    regNo: "",
  });

  const token  = !!localStorage.getItem('token')
  const {mutateAsync, isPending} = useCreateProjectMutation(token)
  const{mutateAsync: generateOutline } = useGenerateProjectMutation(token)
const { data: user } = useUserQuery(token)
// const {data: chapterDatas} = useFetchProjectQuery(token)

  const handleChapterChange = (index, field, value) => {
    setChapters((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAddChapter = () => {
    setChapters((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleDeleteChapter = (index) => {
    setChapters((prev) => prev.filter((_, i) => i !== index));
  };


  const handleGenerateProject = async(e) => {
    try {
          e.preventDefault()
      setError('')
          setGeneratingOutline(true);

     const res = await generateOutline({
      title: bookTitle,
      chapNum: numChapters,
      style: writingStyle,
      desc: topic,
 })

 console.log('Data details:', res)
          setGeneratingOutline(false);
   setChapters(res?.project?.chapters ?? []);
          setStep('2')
      
  } catch(err) {
        setGeneratingOutline(false);
    console.log(err)
          setError('An unexpected error occurred. Please try again.', err)
  }
  }
  
  console.log('Chapters:' , chapters)



  const handleCreateProject = async(e) => {
    e.preventDefault()
      setError('')
      // console.log('User details:', user)
   

      try {
    if (!bookTitle || chapters.length === 0) {
      toast.error("Book title and at least one chapter are required");
      return;

    }
    
const cleanedChapters = chapters.map(chap => ({
  title: chap.title,
  desc: chap.desc,
  sections: (chap.sections ?? [])
    .filter(sec => {
      if (!sec.content) return false;
 
      if (Array.isArray(sec.content)) {
        sec.content = sec.content
          .map(item => (typeof item === 'string' ? item : JSON.stringify(item)))
          .join("\n"); 
      }
      return sec.content && sec.content.toString().trim() !== '';
    })
    .map(sec => ({
      title: sec.title,
      content: sec.content,
    })),
}));



  const res = await mutateAsync({
      title: bookTitle,
      // chapNum:numChapters,
      // style: writingStyle,
      // regNo,
      desc: topic,
      author: user.fullName ?? '',
      chapters: cleanedChapters,
    })

    console.log('Project:', res)
 navigate(`/editor/${res.project._id}`)

  } catch(err) {
    console.log(err)
          setError('An unexpected error occurred. Please try again.', err)
  }
  }

  const formatSectionsToText = (sections) =>
  sections
    .map(
      (s) => `${s.section_number} ${s.title}\n${s.content}`
    )
    .join("\n\n");

const parseTextToSections = (text, oldSections) => {
  const blocks = text.split("\n\n");

  return blocks.map((block, i) => {
    const [, ...contentLines] = block.split("\n");
    const content = contentLines.join("\n");

    return {
      ...oldSections[i],
      content,
    };
  });
};


  return (
    <section className="px-2 pb-5 flex flex-col gap-6 md:max-w-[550px] w-full shadow-lg
      rounded-lg ">

      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-xl text-zinc-300">
          Create New eProject
        </h1>
        <SheetClose onClick={onClose} />
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`rounded-full w-10 h-8 flex items-center justify-center font-semibold ${
            step === "1" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-300"
          }`}
        >
          {step === "2" ? <Check size={16} /> : "1"}
        </div>
        <div
          className={`h-1 w-full ${
            step === "2" ? "bg-zinc-300" : "bg-zinc-900"
          }`}
        />
        <div
          className={`rounded-full w-10 h-8 flex items-center justify-center font-semibold ${
            step === "2" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-300"
          }`}
        >
          2
        </div>
      </div>

      {/* FORM */}
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

        {/* STEP 1 */}
        {step === "1" && (
          <>

              {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-sm text-red-400 text-center">{error}</p>
        </div>
      )}
            {/* Book Title */}
            <div className="flex flex-col gap-1">
              <label className="flex gap-2 items-center text-zinc-300">
                <BookIcon size={16} />
                <span>Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                className="border border-zinc-400 rounded px-3 py-2 text-zinc-300"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Number of Chapters */}
            <div className="flex flex-col gap-1">
              <label className="flex gap-2 items-center text-zinc-300">
                <ListOrderedIcon size={16} />
                <span>Number of Chapters</span>
              </label>
              <input
                type="number"
                placeholder="Enter number of chapters"
                className="border border-zinc-400 rounded px-3 py-2 text-zinc-300"
                value={numChapters ?? ""}
                onChange={(e) => setNumChapters(Number(e.target.value))}
              />
              {errors.numChapters && <p className="text-red-500 text-sm">{errors.numChapters}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="flex gap-2 items-center text-zinc-300">
                <LightbulbIcon size={16} />
                <span>Description (optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter description (optional)"
                className="border border-zinc-400 rounded px-3 py-2 text-zinc-300"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

                     {/* RegNo*/}
            <div className="hidden flex-col gap-1">
              <label className="flex gap-2 items-center text-zinc-300">
                <LightbulbIcon size={16} />
                <span>School Reg Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter school reg no)"
                className="border border-zinc-400 rounded px-3 py-2 text-zinc-300"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>

            {/* Writing Style */}
            <div className="flex flex-col gap-1">
              <label className="flex gap-2 items-center text-zinc-300">
                <PenLine size={16} />
                <span>Writing Style</span>
              </label>
              <select
                className="border border-zinc-400 rounded px-3 py-2 text-zinc-300"
                value={writingStyle}
                onChange={(e) => setWritingStyle(e.target.value)}
              >
                <option value="FORMAL">Formal</option>
                <option value="INFORMAL"> Informal </option>
                <option value="TECHNICAL">Technical </option>
                <option value="NARRATIVE">Narative</option>
         
              </select>
            </div>

            <button
              type="submit"
              className="h-10 px-2 md:px-6 rounded-md border border-zinc-700 cursor-pointer mb-5  disabled:cursor-wait
                bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all text-sm font-medium
                flex items-center justify-center gap-2"
              disabled={generatingOutline}
              onClick={handleGenerateProject}
            >

          {generatingOutline ?  
          
          <div className="flex gap-1 items-center">
              <Loader size={16} />
         Generating....
              </div>

              :        
          <div className="flex gap-1 items-center">
              <SparkleIcon size={16} />
         Generate with Ai
              </div>
              
              }
              
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === "2" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-zinc-300 text-base flex gap-1">Review Chapters   
                   <p className="text-zinc-400">({chapters.length} Chapters)</p> </h2>
         

                        <div
                onClick={() => setStep("1")}
                className="flex items-center gap-1 cursor-pointer text-zinc-300"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </div>
            </div>

            {Array.isArray(chapters) && chapters.length === 0 ? (
              <div className="border-zinc-300 border-[0.5px] h-[200px] w-full rounded-lg p-4 flex flex-col 
              items-center justify-center gap-3">
                <BookIcon size={54} color="white" />
                <p className="text-center text-zinc-400">
                  No chapters added yet. Add one to get started.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {chapters.map((chap, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2  p-2  cursor-pointer
                     border border-zinc-600 rounded-lg"
                  >

                    <div className="flex items-center w-full relative">
                    <input
                      type="text"
                      placeholder={`Chapter ${index + 1} Title`}
                      className=" rounded px-1 py-2 text-zinc-400"
                      value={chap.title}
                      onChange={(e) =>
                        handleChapterChange(index, "title", e.target.value)
                      }
                    />
         <button
                      type="button"
                      className=" px-2 md:px-6 rounded-md cursor-pointer absolute -right-5
                         text-zinc-300 hover:bg-zinc-800 transition-all text-sm font-medium
                      flex items-center gap-2"
                      onClick={() => handleDeleteChapter(index)}
                    >
                      <Trash size={18} color="white"/>
                      
                    </button>
                    </div>
             <textarea
  className="border border-zinc-400 rounded px-3 py-2 text-zinc-400 min-h-[120px]"
  value={formatSectionsToText(chap.sections)}
  onChange={(e) =>
    handleChapterChange(
      index,
      "sections",
      parseTextToSections(e.target.value, chap.sections)
    )
  }
/>

                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between w-full mt-4">
    

              <div className="flex gap-3 w-full mb-5">
                <button
                  type="button"
                  className="h-10 px-2 md:px-6 rounded-md border border-zinc-700 cursor-pointer
                    bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all text-sm font-medium
                    hidden items-center gap-2 w-full"
                  onClick={handleAddChapter}
                >
                  <Plus size={18} />
                  Add Chapter
                </button>

                <button
                  type="button"
                  className="h-10 px-2 md:px-4 rounded-md border border-zinc-700 cursor-pointer w-full
                    bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all text-sm font-medium
                    flex items-center gap-2 text-center"
                  disabled={isPending}
                  onClick={handleCreateProject}
                >



                         {isPending ?  
          
          <div className="flex gap-1 items-center justify-center w-full">
              <Loader size={16} />
         Creating....
              </div>

              :        
          <div className="flex gap-2 items-center w-full justify-center">
          <SparkleIcon size={16} />
                  Create eProject   

              </div>
              
              }
                
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

    </section>
  );
};

export default CreateProject;
