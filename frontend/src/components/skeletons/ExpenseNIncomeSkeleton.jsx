export default function ExpenseNIncomeSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Income Overview Skeleton */}
            <div className="h-[420px] rounded-xl shimmer" />

            {/* Income List Skeleton */}
            <div className="h-32 rounded-xl shimmer" />
        </div>
    );
}