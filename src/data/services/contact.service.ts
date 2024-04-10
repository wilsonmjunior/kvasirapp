import { SvgProps } from "react-native-svg";

import { api } from "../api";

export type Link = {
  descricao: string;
  link: string;
  icon?: React.FC<SvgProps>;
};

export type ContactLinks = {
  links: Link[];
};

export async function getContactLinks() {
  try {
    const response = await api.get<ContactLinks>("app/links/contato");

    return response.data;
  } catch (error) {
    throw error;
  }
}
