import LoadingSpinner from "@/components/UI/LoadingSpinner";

// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)] mt-[60px]">
      <LoadingSpinner />
    </div>
  );
}
