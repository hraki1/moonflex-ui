import LoadingSpinner from "@/components/UI/LoadingSpinner";

// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen mt-[60PX]">
      <LoadingSpinner />
    </div>
  );
}
