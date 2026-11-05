import UpdateEventContent from "@/components/UpdateEventContent";
import { Suspense } from "react";

export default function UpdateEventPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    }>
      <UpdateEventContent />
    </Suspense>
  );
}