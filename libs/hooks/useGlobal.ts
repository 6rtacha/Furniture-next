import { useContext, createContext } from 'react';
import { Member } from '../types/member/member';

interface GlobalInterface {
	authMember: Member | null;
	setAuthMember: (member: Member | null) => void;
	orderBuilder: Date;
	setOrderBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(undefined);

export const useGlobals = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) throw new Error('useGlobals within Provider');
	return context;
};
