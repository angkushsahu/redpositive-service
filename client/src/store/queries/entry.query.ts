import { IResponseEntry, IId, IRequest, IEntryValues } from "../../types";
import apiQuery from "./api.query";

export const entryApi = apiQuery.injectEndpoints({
    endpoints: (builder) => ({
        getEntry: builder.query<IRequest & { entry: IResponseEntry }, IId>({
            query: ({ id }: IId) => {
                return {
                    url: `/entry/${id}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Entry"],
        }),
        getAllEntries: builder.query<IRequest & { entries: IResponseEntry[]; totalEntries: number }, { query: string }>({
            query: ({ query }: { query: string }) => {
                return {
                    url: `/entry/all${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Entry"],
        }),
        createEntry: builder.mutation<IRequest & { entry: IResponseEntry }, IEntryValues>({
            query: (body: IEntryValues) => {
                return {
                    url: "/entry/create",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
            invalidatesTags: ["Entry"],
        }),
        updateEntry: builder.mutation<IRequest & { entry: IResponseEntry }, IEntryValues & IId>({
            query: (body: IEntryValues & IId) => {
                const { id, ...restOfBody } = body;
                return {
                    url: `/entry/${id}`,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: restOfBody,
                };
            },
            invalidatesTags: ["Entry"],
        }),
        deleteEntry: builder.mutation<IRequest & IId, IId>({
            query: ({ id }: IId) => {
                return {
                    url: `/entry/${id}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            invalidatesTags: ["Entry"],
        }),
        sendEntryViaEmail: builder.mutation<IRequest, { entries: IResponseEntry[] }>({
            query: (body: { entries: IResponseEntry[] }) => {
                return {
                    url: `/entry/send-email`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateEntryMutation,
    useDeleteEntryMutation,
    useGetAllEntriesQuery,
    useGetEntryQuery,
    useUpdateEntryMutation,
    useSendEntryViaEmailMutation,
} = entryApi;
