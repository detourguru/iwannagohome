interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center gap-2 h-full text-center">
    <span className="text-bold-20">😢 문제가 발생했어요</span>
    <span className="text-regular-14 text-gray-500">{message}</span>
  </div>
);

export default ErrorMessage;
