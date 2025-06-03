import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authApi from '../api/Auth';
import Self_ServicesApi from '../api/Self_ServicesSlice';
import AttendceApi from '../api/Attendce';
import InitialSystemApi from '../api/InitialSystem';
import EmployeeApi from '../api/Employee';
import branchesApi from '../api/Branches';
import SidebarApi from '../api/SidebarApi'; // ✅ Add this import
import departmentsApi from '../api/DepartmentsApi';
import positionsApi from '../api/positionsApi';
import jobTitlesApi from '../api/jobTitlesApi';
import RolesApi from '../api/RolesApi'; 
import permissionsApi from '../api/PermissionsApi';
import tenantApi from '../api/TenantsApi';
import plansApi from '../api/PlansApi';
import subscriptionsApi from '../api/subscriptionsApi';
const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [Self_ServicesApi.reducerPath]: Self_ServicesApi.reducer,
    [AttendceApi.reducerPath]: AttendceApi.reducer,
    [InitialSystemApi.reducerPath]: InitialSystemApi.reducer,
    [EmployeeApi.reducerPath]: EmployeeApi.reducer,
    [branchesApi.reducerPath]: branchesApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [positionsApi.reducerPath]: positionsApi.reducer,
    [jobTitlesApi.reducerPath]: jobTitlesApi.reducer,
    [SidebarApi.reducerPath]: SidebarApi.reducer, 
    [RolesApi.reducerPath]: RolesApi.reducer, 
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [tenantApi.reducerPath]: tenantApi.reducer, 
    [plansApi.reducerPath]: plansApi.reducer, 
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            Self_ServicesApi.middleware,
            AttendceApi.middleware,
            InitialSystemApi.middleware,
            EmployeeApi.middleware,
            branchesApi.middleware,
            departmentsApi.middleware,
            positionsApi.middleware,
            jobTitlesApi.middleware,
            RolesApi.middleware, 

            tenantApi.middleware, 
            permissionsApi.middleware,
            SidebarApi.middleware ,
            plansApi.middleware,
            subscriptionsApi.middleware,
        ),
});

export type IRootState = ReturnType<typeof rootReducer>;
