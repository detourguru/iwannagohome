interface LoadingProps {
  isLoading: boolean;
  text?: string;
}
const Loading = ({ isLoading, text }: LoadingProps) => {
  return (
    isLoading && (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="fixed inset-0 flex flex-col items-center justify-center gap-3 bg-black bg-opacity-50 z-50"
      >
        <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <span className="text-white text-bold-14 text-center">
          {text === undefined ? "로딩 중..." : text}
        </span>
      </div>
    )
  );
};

export default Loading;
