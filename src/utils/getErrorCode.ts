export default function getErrorCode(error: Error): 429 | 500 {
  const match = error.message.match(/\[(\d{3})\s/);
  const errorCode = match ? Number(match[1]) : null;

  if (errorCode === 429) return 429;

  if (errorCode !== null) {
    console.error(`알 수 없는 에러 코드: ${errorCode}`);
  }

  return 500;
}
