interface fetchDataProps {
  path: string;
  body: any;
}
const fetchData = async ({ path, body }: fetchDataProps) => {
  const response = await fetch(path, body);
  if (!response.ok) {
    throw new Error("호출 중 에러가 발생했습니다.");
  }
  return await response.json();
};

export default fetchData;
