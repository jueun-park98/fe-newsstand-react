import { News } from "../components/constants";

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

export const fetchSubscription: () => Promise<object[]> = async () => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${SERVER}/subscription`, request);
  if (!response.ok) throw new Error("Network Error");
  const subscription = response.json();

  return subscription;
};

export const postSubscription: (news: News) => Promise<Response> = async (news) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(news),
  };
  const response = await fetch(`${SERVER}/subscription`, request);
  if (!response.ok) throw new Error("Network Error");

  return response;
};

export const deleteSubscription: (id: string) => Promise<Response> = async (id) => {
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${SERVER}/subscription/${id}`, request);
  if (!response.ok) throw new Error("Network Error");

  return response;
};
