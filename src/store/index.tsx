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
import ProfileApi from '../api/ProfileApi';
import PricesApi from '../api/pricesApi';
import EmployeeEvaluationApi from '../api/EmployeeEvaluationApi'; 
import EmployeeRequestsApi from '../api/EmployeeRequestsApi'; 
import EmployeeAssetsApi from '../api/EmployeeAssetsApi';
import employeeAssetTypesApi from '../api/EmployeeAssetTypesApi';
import EmployeeContractsApi from '../api/EmployeeContractsApi'
import EmployeeClearancesApi from '../api/EmployeeClearancesApi'
import AttendanceRulesApi from '../api/AttendanceRulesApi';
import OpeningPositionsApi from '../api/OpningPositionsApi';
import ApplyJobApi from '../api/applyJobApi';
import hiringApplicationsApi from '../api/hiringApplicationsApi';
import overtimeApi from '../api/overtimeApi';
import leaveTypesApi from '../api/leaveTypesApi';
import AttendanceDepartmentApi from '../api/AttendanceDepartmentApi';
import disciplinaryActionsApi from '../api/disciplinaryActionsApi';
import attendanceDepartmentRequestsApi from '../api/AttendanceDepartmentRequestsApi';

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
    [ProfileApi.reducerPath]: ProfileApi.reducer, 
    [PricesApi.reducerPath]: PricesApi.reducer,
    [EmployeeEvaluationApi.reducerPath]: EmployeeEvaluationApi.reducer,
    [EmployeeRequestsApi.reducerPath]: EmployeeRequestsApi.reducer,

    [AttendanceRulesApi.reducerPath]: AttendanceRulesApi.reducer,
    [EmployeeAssetsApi.reducerPath]: EmployeeAssetsApi.reducer,
    [employeeAssetTypesApi.reducerPath]: employeeAssetTypesApi.reducer,
    [EmployeeClearancesApi.reducerPath]: EmployeeClearancesApi.reducer,
    [EmployeeContractsApi.reducerPath]: EmployeeContractsApi.reducer,
    [OpeningPositionsApi.reducerPath]:OpeningPositionsApi.reducer,
    [ApplyJobApi.reducerPath]: ApplyJobApi.reducer,
    [hiringApplicationsApi.reducerPath]: hiringApplicationsApi.reducer,
    [overtimeApi.reducerPath]: overtimeApi.reducer,
    [leaveTypesApi.reducerPath]: leaveTypesApi.reducer,
    [AttendanceDepartmentApi.reducerPath]: AttendanceDepartmentApi.reducer,
    [disciplinaryActionsApi.reducerPath]: disciplinaryActionsApi.reducer,
    [attendanceDepartmentRequestsApi.reducerPath]: attendanceDepartmentRequestsApi.reducer,



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
            ProfileApi.middleware,
            PricesApi.middleware,
            EmployeeEvaluationApi.middleware,
            EmployeeRequestsApi.middleware,
            employeeAssetTypesApi.middleware,
            EmployeeAssetsApi.middleware,
            EmployeeClearancesApi.middleware,
            EmployeeContractsApi.middleware,
            AttendanceRulesApi.middleware,
            OpeningPositionsApi.middleware,
            ApplyJobApi.middleware,
            hiringApplicationsApi.middleware,
            overtimeApi.middleware,
            leaveTypesApi.middleware,
            AttendanceDepartmentApi.middleware,
            disciplinaryActionsApi.middleware,
            attendanceDepartmentRequestsApi.middleware,

        ),
});

export type IRootState = ReturnType<typeof rootReducer>;
