// import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const rapidApiKey=import.meta.env.VITE_RAPID_API_ARTICLE_KEY


// export const articleApi =createApi({
//       reducerPath:'articleApi',
//       baseQuery:fetchBaseQuery({
//          baseUrl:'https://article-extractor-and-summarizer.p.rapidapi.com/'  ,
//          prepareHeaders:(headers)=>{
//             headers.set('x-rapidapi-key',rapidApiKey);
//             headers.set('x-rapidapi-host','article-extractor-and-summarizer.p.rapidapi.com');

//          }
//       }),
//       endpoints:(builder)=>({
//             getSummary:builder.query({
//              query:(param)=>`/summarize?=${encodeURIComponent(param.articleUrl)}&length=3`
//             })
//        })

// })

// export const {useLazyGetSummaryQuery}=articleApi


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', rapidApiKey);
      headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com');
      return headers; // You need to return the headers object
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (param) => `/summarize?url=${encodeURIComponent(param.articleUrl)}&length=3`, // Corrected the query format
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
