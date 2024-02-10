import { Request } from "express";

export const paginate = ({ request } : { request: Request }) => {
  const page: number = parseInt(searchParams(request.url, 'page')  || '1', 10);
  const perPage: number = parseInt(searchParams(request.url, 'perPage') || '10', 10);

  const skip: number = (page - 1) * perPage;
  const take: number = perPage;

  const pagination = {
    skip,
    take,
    page,
    perPage,
  };

  return {
    pagination,
  };
};

function searchParams(url: string, paramName: string): string | null {
  const urlParts = url.split('?');
  if (urlParts.length !== 2)
    return null;


  const queryString = urlParts[1];
  const searchParams = new URLSearchParams(queryString);
  const paramValue = searchParams.get(paramName);

  return paramValue !== null ? paramValue : null;
}
