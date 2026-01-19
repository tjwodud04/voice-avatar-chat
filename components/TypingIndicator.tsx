export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
        <div className="flex space-x-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
}
