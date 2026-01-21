import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProjectRequest, fetchProjectRequest, fetchSingleProjectRequest, generateProjectRequest, removeProjectRequest, searchProjectRequest, updateProjectRequest } from "../api";
import { toast } from "sonner";



export  function useCreateProjectMutation() {
    const queryClient = useQueryClient()

   return  useMutation({
    mutationFn: createProjectRequest,
    onSuccess: () => {
        toast.success('Created successful')
           queryClient.invalidateQueries(["projects"])
    },
    onError: (error) => {
        toast.error( error?.response?.data?.message || 'Error creating projects')
    }

    })

}

export  function useUpdateProjectMutation() {
    const queryClient = useQueryClient()

   return  useMutation({
    mutationFn: updateProjectRequest,
    onSuccess: () => {
        toast.success('Updated successful')
           queryClient.invalidateQueries(["projects"])
    },
    onError: (error) => {
        toast.error( error?.response?.data?.message || 'Error updating projects')
    }

    })

}

export function useGenerateProjectMutation() {
    return useMutation({
        mutationFn: generateProjectRequest ,
        onSuccess: () => {
            toast.success('Generated successfully')
        },
          onError: (err) => {
            toast.error('Failed to generate:', err)
        },
    })

}


export function useFetchProjectQuery(page, limit = 10,enabled =true) {
    return useQuery({
        queryKey: ['projects', page, limit],
        queryFn: fetchProjectRequest,
        enabled,
        retry: false,
        staleTime: 1000 * 60 * 5,
        onError: (err) => {
console.log('error fetching projects:', err)
        }
    })
}

export function useSingleProjectQuery(id,enabled = true) {
 return useQuery({
    queryKey: [`projects`, id],
    queryFn: () => fetchSingleProjectRequest(id),
    enabled: !!id && enabled,
    retry: false,
    staleTime: 1000 * 60 * 50,
    onError: (err) => {
console.log('error fetching single projects:', err)
        }

 })

}

export function useRemoveProjectQuery(id,enabled=true) {
const queryClient = useQueryClient()


    return useMutation({
        mutationFn: () => removeProjectRequest(id),
        enabled,
        retry: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
         queryClient.invalidateQueries(["projects"])
        },
        onError: (err) => {
console.log('error deleting projects:', err)
        }
    })
}

export function useSearchProjectQuery (searchTerm, enabled=true){
    return useQuery({
     queryKey: ['projects/search', searchTerm],   
        queryFn: () => searchProjectRequest(searchTerm),
        enabled,
        staleTime: 1000 * 60 * 50,
            onError: (err) => {
console.log('error searching projects:', err)
        }
    })

}
