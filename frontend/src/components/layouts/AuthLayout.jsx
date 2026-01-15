import { TrendingUpDown } from 'lucide-react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h2 className="text-xl sm:text-2xl font-medium text-black">$pendMate</h2>
                {children}
            </div>

            <div className="relative hidden md:block w-[40vw] h-screen bg-emerald-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8">
                <img 
                    src="/logo.png" 
                    alt="logo" 
                    className='absolute top-20 opacity-5 w-3xl'
                />
                <div className="w-48 h-48 rounded-[40px] bg-green-600 absolute -top-7 -left-5" />
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-emerald-600 absolute top-[30%] -right-10" />
                <div className="w-40 h-48 rounded-[40px] bg-lime-500 absolute -bottom-7 -left-5" />

                <div className="grid grid-cols-1 z-20">
                    <StatsInfoCard 
                        icon={<TrendingUpDown />}
                        label="Track your Income & Expenses"
                        value="****"
                        color="bg-emerald-500"
                    />
                </div>

                <div className="w-64 lg:w-[90%] absolute bottom-40 shadow-lg shadow-emerald-400/15 flex flex-col items-center justify-center rounded-2xl p-2">
                    <h1 className="text-6xl text-emerald-700 font-semibold SansFlex">$pendMate</h1>
                    <h3 className="text-xl text-zinc-700 ml-30 uppercase">- Expen$e T₹acke₹</h3>
                </div>
            </div>
        </div>
    );
}

const StatsInfoCard = ({ icon, label, value, color }) => {
    return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>

        <div>
            <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
            <span className="text-xl">₹{value}</span>
        </div>
    </div>
}