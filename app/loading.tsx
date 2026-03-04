export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <div className="w-12 h-12 border-4 border-warm-200 border-t-terracotta-500 rounded-full animate-spin" />
        </div>
        <p className="text-warm-600 text-lg font-medium">
          Loading delicious content...
        </p>
      </div>
    </div>
  )
}