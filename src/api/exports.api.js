import { baseUrl } from "./baseUrl";


export const exportDocRequest = async ({ id }) => {


  const res = await baseUrl.get(`/export/${id}/docx`, {
    responseType: "blob",
  });

  return res.data; 
};

export const exportPDFRequest = async ({ id }) => {


  const res = await baseUrl.get(`/export/${id}/pdf`, {
    responseType: "blob",
  });

  return res.data; 
};

