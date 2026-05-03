import {
  getAllInterviewReports,
  getInterviewReportById,
  generateinterviewReport,
  generateResumePdf
} from "../services/interview.api.js";
import {  useContext,useEffect ,useState} from "react";
import { InterviewContext } from "../Interview.context.jsx";
import { useParams } from "react-router";


export const useInterview = () => {
   const context = useContext(InterviewContext);
const [generatingResume, setGeneratingResume] = useState(false);
  const {interviewId} =useParams();
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateinterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
    } catch (err) {
     } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response =null
    try {
       response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (err) {
     } finally {
      setLoading(false);
    }
     return response?.interviewReport
  };

  const getReports = async () => {
    setLoading(true);
    let response =null
    try {
       response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (err) {
     } finally {
      setLoading(false);
    }
    return response?.interviewReports
  };

const getResumePdf =async(interviewReportId)=>{
   setGeneratingResume(true);
  let response=null
  try{
response =await generateResumePdf({interviewReportId})
const url =window.URL.createObjectURL(new Blob([response],{type:"application/pdf"}))
const link =document.createElement("a")
link.href= url
link.setAttribute("download",`resume_${interviewReportId}.pdf`)
document.body.appendChild(link)
link.click()
  }catch(error){
console.log(error);
  }finally{
     setGeneratingResume(false);
  }
}
 
const deleteReport =async (reportId)=>{
  try {
    const res = await fetch(`https://job-ready-815l.onrender.com/api/interview/${reportId}`, {
      method: "DELETE",
      credentials: "include"    
    });

    const data = await res.json();
setReports((prev) => prev.filter((r) => r._id !== reportId));
    if (!res.ok) {
      throw new Error(data.message);
    }


    return data;
  } catch (err) {
    console.error(err);
  }
}

  useEffect(()=>{
    if(interviewId){
      getReportById(interviewId)
    }else{
      getReports()
    }  
  },[interviewId])

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,deleteReport,generatingResume
  };
};
