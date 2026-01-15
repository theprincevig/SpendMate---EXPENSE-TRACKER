export default function AiChatboxSkeleton() {
    return (
        <div className="w-full h-full rounded-2xl shadow-xl flex flex-col overflow-hidden">

            {/* Messages Skeleton */}
            <div className="flex-1 space-y-4 p-4 overflow-y-auto">
                {/* Date */}
                <div className="flex justify-center">
                    <div className="h-3 w-24 rounded-md shimmer" />
                </div>

                {/* AI message */}
                <div className="flex justify-start">
                    <div className="h-12 w-2/3 bg-gray-200 rounded-xl rounded-bl-none shimmer" />
                </div>

                {/* User message */}
                <div className="flex justify-end">
                    <div className="h-10 w-1/2 bg-emerald-200 rounded-xl rounded-br-none shimmer" />
                </div>

                {/* AI message */}
                <div className="flex justify-start">
                    <div className="h-16 w-3/4 bg-gray-200 rounded-xl rounded-bl-none shimmer" />
                </div>
            </div>

            {/* Input Skeleton */}
            <div className="w-full p-4 border-t border-gray-200/70 space-y-3">
                
                {/* Quick actions */}
                <div className="flex gap-2 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-8 w-35 bg-gray-200 rounded-full shimmer"
                        />
                    ))}
                </div>

                {/* Input bar */}
                <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-gray-200 rounded-full shimmer" />
                    <div className="h-10 w-10 bg-emerald-300 rounded-full shimmer" />
                </div>
            </div>
        </div>
    );
}
