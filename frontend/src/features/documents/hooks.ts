import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentsApi } from "./api";
import type { CreateDocumentDto } from "./types";

export const useSummaries = () =>
  useQuery({ queryKey: ["documents"], queryFn: DocumentsApi.list });

export const useCreateSummary = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDocumentDto) => DocumentsApi.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["documents"] }),
  });
};