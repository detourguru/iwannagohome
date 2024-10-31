interface LoadingProps {
  isLoading: boolean;
  text?: string;
}
const Loading = ({ isLoading, text }: LoadingProps) => {
  return (
    isLoading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="animate-ping text-white text-bold-14 text-center content-center h-24 w-24 border-4 border-t-4 border-white rounded-full">
          {text === undefined ? "로딩 중..." : text}
        </div>
      </div>
    )
  );
};

export default Loading;
