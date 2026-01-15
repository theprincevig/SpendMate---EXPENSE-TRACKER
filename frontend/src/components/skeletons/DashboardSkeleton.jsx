export default function DashboardSkeleton() {
    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <li key={idx}>
                        <div className="h-25 rounded-xl shimmer" />
                    </li>
                ))}
            </ul>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <li key={idx}>
                        <div className="h-100 rounded-xl shimmer" />
                    </li>
                ))}
            </ul>
        </>
    );
}