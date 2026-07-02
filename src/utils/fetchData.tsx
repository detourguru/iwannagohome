interface fetchDataProps {
  path: string;
  body: any;
}
const fetchData = async ({ path, body }: fetchDataProps) => {
  const response = await fetch(path, body);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "호출 중 에러가 발생했습니다.", {
      cause: response,
    });
  }
  return data;
};

export default fetchData;
