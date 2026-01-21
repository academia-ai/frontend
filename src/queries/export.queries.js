import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { exportDocRequest,exportPDFRequest } from "../api"




export function useExportDocMutation() {
  return useMutation({
    mutationFn: exportDocRequest,
    onSuccess: (blob) => {

 if (!(blob instanceof Blob)) {
        console.error("Export failed: Response is not a Blob", blob);
        toast.error("Export failed: invalid file response");
        return;
      }

      // Create download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Export successful");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error exporting document",
      );
    },
  });
}


export function useExportPDFMutation() {
  return useMutation({
    mutationFn: exportPDFRequest,

    onSuccess: (blob) => {
      if (!(blob instanceof Blob)) {
        console.error("Export failed: not a Blob", blob);
        toast.error("Export failed: invalid file");
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF exported successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error exporting PDF",
      );
    },
  });
}