import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { PublicAppDispatch, PublicRootState } from './publicStore';

// Use throughout Landing app instead of plain `useDispatch` and `useSelector`
export const usePublicAppDispatch: () => PublicAppDispatch = useDispatch;
export const usePublicAppSelector: TypedUseSelectorHook<PublicRootState> = useSelector;
