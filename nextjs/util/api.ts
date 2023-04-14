export const apiURL =
  typeof window === "undefined" ? "api-fastapi" : "localhost";

export const GET = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const POST = async (url: string, body: any) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const PUT = async (url: string, body: any) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
