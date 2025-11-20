import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { ProtectedAppDispatch, ProtectedRootState } from './protectedStore';

// Use throughout Dashboard app instead of plain `useDispatch` and `useSelector`
export const useProtectedAppDispatch: () => ProtectedAppDispatch = useDispatch;
export const useProtectedAppSelector: TypedUseSelectorHook<ProtectedRootState> = useSelector;
