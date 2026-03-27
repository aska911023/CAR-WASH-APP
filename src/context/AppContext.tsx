import { createContext, useContext, useState, type ReactNode } from 'react';

// Models
export type UserRole = 'customer' | 'vendor' | null;

export interface AppState {
    role: UserRole;
    points: number; // For point system
    cartCount: number; // Market cart
    vendorId?: string; // If role is vendor
}

interface AppContextType {
    state: AppState;
    loginAs: (role: UserRole) => void;
    logout: () => void;
    addPoints: (val: number) => void;
    deductPoints: (val: number) => boolean;
}

const defaultState: AppState = {
    role: null, // Change to simulate logged-in state initially
    points: 1500, // Pre-loaded points for demo
    cartCount: 2,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState>(defaultState);

    const loginAs = (role: UserRole) => {
        setState((prev) => ({ ...prev, role }));
    };

    const logout = () => {
        setState((prev) => ({ ...prev, role: null }));
    };

    const addPoints = (val: number) => {
        setState((prev) => ({ ...prev, points: prev.points + val }));
    };

    const deductPoints = (val: number): boolean => {
        if (state.points >= val) {
            setState((prev) => ({ ...prev, points: prev.points - val }));
            return true;
        }
        return false;
    };

    return (
        <AppContext.Provider value={{ state, loginAs, logout, addPoints, deductPoints }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within an AppProvider');
    return context;
};
