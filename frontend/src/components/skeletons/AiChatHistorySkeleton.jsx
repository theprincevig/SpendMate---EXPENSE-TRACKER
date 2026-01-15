export default function AiChatHistorySkeleton() {
    return (
        <>
            <ul className="space-y-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <li key={idx}>
                        <div className="w-[90%] h-8 shimmer" />
                    </li>
                ))}
            </ul>
        </>
    );
}