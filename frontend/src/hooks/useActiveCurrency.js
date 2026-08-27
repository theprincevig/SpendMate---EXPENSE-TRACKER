import { currencyConfig } from "../config/currency.Config";
import { useAuthStore } from "../store/useAuthStore";

export const useActiveCurrency = () => {
    const authUser = useAuthStore((state) => state.authUser);
    const activeCurrency = authUser?.currency || "INR";

    return {
        code: activeCurrency,
        details: currencyConfig[activeCurrency]
    };
};