import axios from "axios";
import { Apartment, House } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8765",
});

export function createHouse(house: House): Promise<any> {
  return api.post("houses", house);
}

export function createApartment(apartment: Apartment) {
  return api.post("apartments", apartment);
}

export function fetchNeighborhoods() {
  return api.get("neighborhoods");
}
