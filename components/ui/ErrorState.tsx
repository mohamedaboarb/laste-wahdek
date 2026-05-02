function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbf0]">
      <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
        <p className="text-red-500 font-black text-xl">{message}</p>
      </div>
    </div>
  );
}

export default ErrorState;
