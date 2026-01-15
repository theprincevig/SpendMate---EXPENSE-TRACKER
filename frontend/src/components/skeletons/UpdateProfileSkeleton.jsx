export default function UpdateProfileSkeleton() {
    return (
        <div className="bg-white p-6 shadow-md flex flex-col gap-6 items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full shimmer" />

            {/* Inputs */}
            <div className="w-full space-y-4">
                <div className="h-12 rounded-lg shimmer" />
                <div className="h-12 rounded-lg shimmer" />
                <div className="h-12 rounded-lg shimmer" />
            </div>

            {/* Change password row */}
            <div className="w-full h-12 rounded-xl shimmer" />

            {/* Buttons */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="h-11 rounded-lg shimmer" />
                <div className="h-11 rounded-lg shimmer" />
            </div>
        </div>
    );
}