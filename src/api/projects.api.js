import { baseUrl } from "./baseUrl"

export const createProjectRequest = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await baseUrl.post(
    "/projects",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateProjectRequest = async ({ payload, id }) => {
  const token = localStorage.getItem("token");

  const res = await baseUrl.put(
    `/projects/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const generateProjectRequest = async(payload) => {
      const token = localStorage.getItem("token");

      const res = await baseUrl.post('/ai/project',
        payload,
          {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      )

      return res.data

}



export const fetchProjectRequest = async ({ page = 1, limit = 10 }) => {
      const token = localStorage.getItem("token");

      const res = await baseUrl.get('/projects',
          {
            params: {page,limit},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      )

      return res.data

}

export const fetchSingleProjectRequest = async(id) => {
     const token = localStorage.getItem("token");

     const res = await baseUrl.get(`/projects/${id}`,
             {
              // params: {id},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      )


     return res.data

}

export const removeProjectRequest = async (id) => {
  const token = localStorage.getItem("token");

  const res = await baseUrl.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const searchProjectRequest = async(searchTerm) => {
     const token = localStorage.getItem("token");

     const res = await baseUrl.get(
  `/projects/search?searchTerm=${encodeURIComponent(searchTerm)}`,
             {
              // params: {id},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      )


     return res.data

}

