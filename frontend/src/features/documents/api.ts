import { http } from "../../services/httpService";
import type { SummaryObject, CreateDocumentDto } from "./types";

export const DocumentsApi = {
  list: () => http<SummaryObject[]>("/getSummaryObjects"),
  get: (id: string) => http<SummaryObject>(`/getSummaryObject/${id}`),
  create: (dto: CreateDocumentDto) => {
    const form = new FormData();
    form.append("file", dto.file);
    return http<SummaryObject>("/createSummaryObject", { method: "POST", body: form });
  },
};