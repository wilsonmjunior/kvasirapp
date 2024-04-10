import { api } from "../api";

export type Link = {
  descricao: string;
  link: string;
  type: "link" | "button";
};

export type HomeLinks = {
  links: Link[];
};

export async function getHomeLinks() {
  try {
    const response = await api.get<HomeLinks>("app/links/home");

    return response.data;
  } catch (error) {
    throw error;
  }
}
