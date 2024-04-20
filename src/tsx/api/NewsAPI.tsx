const SERVER = process.env.REACT_APP_SERVER;

export const fetchNews: () => Promise<object[]> = async () => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${SERVER}/news`, request);
  if (!response.ok) throw new Error("Network Error");
  const news = response.json();

  return news;
};
