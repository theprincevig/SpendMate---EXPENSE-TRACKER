export default function ViewProfileSkeleton() {
    return (
        <div className="bg-white p-6 border-b border-gray-200/80 shadow-md flex gap-6 items-center justify-between animate-pulse">
            
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200 shimmer" />

            {/* Info */}
            <div className="flex flex-col items-end gap-2 w-full max-w-xs">
                <div className="h-5 w-40 bg-gray-200 rounded shimmer" />
                <div className="h-4 w-32 bg-gray-200 rounded shimmer" />
                <div className="h-4 w-48 bg-gray-200 rounded shimmer" />
            </div>

        </div>
    );
}
