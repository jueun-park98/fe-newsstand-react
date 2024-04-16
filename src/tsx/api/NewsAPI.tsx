const SERVER = "http://localhost:3000";

export const fetchNews: () => Promise<object[]> = async () => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const news = await fetch(`${SERVER}/news`, request)
    .then((response) => {
      if (!response.ok) throw new Error("Network Error");
      return response;
    })
    .then((data) => data.json());

  return news;
};
