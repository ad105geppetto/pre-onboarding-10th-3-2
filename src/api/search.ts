import apiRequest from "./index";

const RESOURCE = "/search";

export const getSearch = async (q: string, page = 1, limit = 10) => {
  try {
    if (!q) {
      return { data: { result: [] } };
    }

    const response = await apiRequest.get(`${RESOURCE}?q=${q}&page=${page}&limit=${limit}`);

    return response;
  } catch (error) {
    throw new Error("API getSearch error");
  }
};
