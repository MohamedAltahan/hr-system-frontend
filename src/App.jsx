import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginGuard from './utilities/LoginGuard';
import AuthGuard from './utilities/AuthGuard';
import PersonalData from './pages/Self_Service/PersonalData';
import SelfServices from './components/layout/Self_services';
import MainSelf_Service from './pages/Self_Service/MainSelf_Service';
import FinancialData from './pages/Self_Service/FinancialData';
import ReviewtheevaluationDeta from './pages/Self_Service/ReviewtheevaluationDeta';
import Attendece from './pages/Self_Service/Attendece';
import Tasks from './pages/Self_Service/Tasks';
import Mysalaryvouchers from './pages/Self_Service/Mysalaryvouchers';
import MyReports from './pages/Self_Service/MyReports';
import Disciplinaryprocedures from './pages/Self_Service/Disciplinaryprocedures';
import MyRequests from './pages/Self_Service/MyRequests';
import Addvacation from './pages/Self_Service/Addvacation';
import AddSalaryAdvance from './pages/Self_Service/AddSalaryAdvance';
import Documentary from './pages/Self_Service/documentary';
import Maintenence from './components/Maintenence';
import CheckEmail from './pages/Auth/checkEmail';
import ResetPassword from './pages/Auth/resetPasswrod';
import Staff from './pages/Users/users';
import Branches from './pages/Branch/branches';
import Financial from './pages/Financial/Financial';
import Reports from './pages/Reports/Reports';
import Documents from './pages/Documents/Documents';
import Holidays from './pages/Holidays/Holidays';
import Order from './pages/Order/Order';
import Others from './pages/Others/Others';
import Landing from './pages/Landing/Landing';


import AddUser from './pages/Users/add';
import EditUser from './pages/Users/edit/[id]';
import ShowUser from './pages/Users/[id]';

import AddBranch from './pages/Branch/add';
import EditBranch from './pages/Branch/edit/[id]';
import ShowBranch from './pages/Branch/[id]';

import Roles from './pages/Role/roles';
import AddRole from './pages/Role/add';
import ShowRole from './pages/Role/[id]';
import EditRole from './pages/Role/edit/[id]';


import Departments from './pages/Department/departments';
import AddDepartment from './pages/Department/add';
import EditDepartment from './pages/Department/edit/[id]';
import ShowDepartment from './pages/Department/[id]';


import Tenants from './pages/Tenants/tenants';
import AddTenant from './pages/Tenants/add';
import EditTenant from './pages/Tenants/edit/[id]';
import ShowTenant from './pages/Tenants/[id]';

import Plans from './pages/Plans/plans';
import AddPlane from './pages/Plans/add';
import EditPlane from './pages/Plans/edit/[id]';
import ShowPlane from './pages/Plans/[id]';



import MySubscription from './pages/Subscriptions/my_subscriptions';


import Profile from './pages/Profile/Profile';
import EmployeeEvaluations from './pages/EmployeeEvaluation/EmployeeEvaluations';
import AddEmployeeEvaluation from './pages/EmployeeEvaluation/add';
import EditEmployeeEvalution from './pages/EmployeeEvaluation/edit/[id]'
import ShowEmployeeEvalution from './pages/EmployeeEvaluation/[id]'


import JobTitles from './pages/JobTitles/index';
import ShowJobTitle from './pages/JobTitles/[id]';
import AddJobTitle from './pages/JobTitles/add';
import EditJobTitle from './pages/JobTitles/edit/[id]';


import EmployeeReqests from './pages/EmployeesRequests/EmployeeRequests';
import ShowEmployeeReqest from './pages/EmployeesRequests/[id]';
import EditEmployeeReqest from './pages/EmployeesRequests/edit/[id]';
import AddEmployeeReqest from './pages/EmployeesRequests/add';
import ApproveEmployeeRequest from './pages/EmployeesRequests/approve/[id]';

import EmployeeAssets from './pages/EmoplyeeAssets/EmployeeAssets';
import ShowEmployeeAsset from './pages/EmoplyeeAssets/[id]';
import EditEmployeeAsset from './pages/EmoplyeeAssets/edit/[id]';
import AddEmployeeAsset from './pages/EmoplyeeAssets/add';


import EmployeeClearances from './pages/EmployeeClearances/EmployeeClearances';
import ShowEmployeeClearance from './pages/EmployeeClearances/[id]';
import EditEmployeeClearance from './pages/EmployeeClearances/edit/[id]';
import AddEmployeeClearance from './pages/EmployeeClearances/add';

import EmployeeContract from './pages/EmployeeContracts/EmployeeContracts';
import ShowEmployeeContract from './pages/EmployeeContracts/[id]';
import EditEmployeeContract from './pages/EmployeeContracts/edit/[id]';
import AddEmployeeContract from './pages/EmployeeContracts/add';

import EmployeeAssetsTypes from './pages/EmployeeAssetsTypes/EmployeeAssetsTypes';
import ShowEmployeeAssetsType from './pages/EmployeeAssetsTypes/[id]';
import EditEmployeeAssetsType from './pages/EmployeeAssetsTypes/edit/[id]';
import AddEmployeeAssetsType from './pages/EmployeeAssetsTypes/add'

import AttendanceRules from './pages/AttendanceRules/AttendanceRules';
import AddAttendanceRule from './pages/AttendanceRules/add';
import EditAttendanceRule from './pages/AttendanceRules/edit/[id]';
import ShowAttendanceRule from './pages/AttendanceRules/[id]'

import OpeningPositions from './pages/OpningPositions/OpningPositions';
import AddOpeningPosition from './pages/OpningPositions/add';
import EditOpeningPosition from './pages/OpningPositions/edit/[id]';
import ShowOpeningPosition from './pages/OpningPositions/[id]';


import ApplyJob from './pages/ApplyJob/ApplyJob';




import Positions from './pages/Positions';
import EditPosition from './pages/Positions/edit/[id]';
import ShowPosition from './pages/Positions/[id]';
import AddPosition from './pages/Positions/add';


import HiringApplications from './pages/HiringApplications/HiringApplications';
import ShowHiringApplication from './pages/HiringApplications/[id]';
import ChangeApplicationStatus from './pages/HiringApplications/ChangeApplicationStatus/[id]';

import Overtime from './pages/Overtime/Overtime';
import AddOvertime from './pages/Overtime/add';
import ShowOvertime from './pages/Overtime/[id]'
import EditOvertime from './pages/Overtime/edit/[id]'


import AttendanceDeparture from './pages/AttendanceDepartment/AttendanceDepartmnets';
import ShowAttendanceDeparture from './pages/AttendanceDepartment/[id]';
import EditAttendanceDeparture from './pages/AttendanceDepartment/edit/[id]';

import DisciplinaryActions from './pages/DisciplinaryActions/DisciplinaryActions';
import ShowDisciplinaryAction from './pages/DisciplinaryActions/[id]';
import AddDisciplinaryAction from './pages/DisciplinaryActions/add';
import EditDisciplinaryAction from './pages/DisciplinaryActions/edit/[id]';


import AttendanceDepartmentRequests from './pages/AttendanceDepartmentRequests/AttendanceDepartmentRequests';
import ShowAttendanceDepartureRequests from './pages/AttendanceDepartmentRequests/[id]';



import LeavesIndex from './pages/LeavesManagment/LeavesManagment';
import ShowLeave from './pages/LeavesManagment/[id]';

import CarriedForwardLeaves from './pages/CarriedForwardLeaves/CarriedForwardLeaves';
import AddCarriedForwardLeave from './pages/CarriedForwardLeaves/add';
import ShowCarriedForwardLeave from './pages/CarriedForwardLeaves/[id]';
import EditCarriedForwardLeave from './pages/CarriedForwardLeaves/edit/[id]';
const App = () => {
  return (
    
    <>
      <Routes >
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route path='/apply-job' element={<ApplyJob />}/>

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            <LoginGuard>
              <Login />
            </LoginGuard>
          }
        />
        <Route
          path="/CheckEmail"
          element={
            <LoginGuard>
              <CheckEmail />
            </LoginGuard>
          }
        />
        <Route
          path="/ResetPassword"
          element={
            <LoginGuard>
              <ResetPassword />
            </LoginGuard>
          }
        />

        {/* Main Application Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="Dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
       <Route path="users">
  <Route
    index
    element={
      <AuthGuard>
        <Staff />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddUser />
      </AuthGuard>
    }
  />
   <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditUser />
      </AuthGuard>
    }
  />

    <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowUser />
      </AuthGuard>
    }
  />
</Route>
<Route path="plans">
  <Route
    index
    element={
      <AuthGuard>
        <Plans />
      </AuthGuard>
    }
  />

<Route
    path="add"
    element={
      <AuthGuard>
        <AddPlane />
      </AuthGuard>
    }
  />

<Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditPlane />
      </AuthGuard>
    }
  />

<Route
    path=":id"
    element={
      <AuthGuard>
        <ShowPlane />
      </AuthGuard>
    }
  />

  </Route>

  <Route path="my_subscriptions">
  <Route
    index
    element={
      <AuthGuard>
        <MySubscription/>
      </AuthGuard>
    }
  />
  </Route>
  <Route path='profile'>
  <Route
    index
    element={
      <AuthGuard>
        <Profile />
      </AuthGuard>
    }
  />
  </Route>
<Route path="employee-evaluation">
  <Route
    index
    element={
      <AuthGuard> 
        <EmployeeEvaluations /> 
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddEmployeeEvaluation />
      </AuthGuard>
    }
  />
   <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditEmployeeEvalution />
      </AuthGuard>
    }
  />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowEmployeeEvalution />
      </AuthGuard>
    }
  />
  </Route>

<Route path="job-titles">
  <Route
    index
    element={
      <AuthGuard>
        <JobTitles />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddJobTitle />
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditJobTitle />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowJobTitle />
      </AuthGuard>
    }
  />
  
</Route>

<Route path="employee-clearances">
  <Route
    index
    element={
      <AuthGuard>
        <EmployeeClearances />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddEmployeeClearance />
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditEmployeeClearance />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowEmployeeClearance />
      </AuthGuard>
    }
  />
  
</Route>


<Route path="employee-contracts">
  <Route
    index
    element={
      <AuthGuard>
        <EmployeeContract />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddEmployeeContract/>
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditEmployeeContract />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowEmployeeContract />
      </AuthGuard>
    }
  />
  
</Route>

<Route path="employee-asset-types">
  <Route
    index
    element={
      <AuthGuard>
        <EmployeeAssetsTypes />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddEmployeeAssetsType/>
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditEmployeeAssetsType />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowEmployeeAssetsType />
      </AuthGuard>
    }
  />
  
</Route>

<Route path='attendance-rules'>
  <Route
    index
    element={
      <AuthGuard>
        <AttendanceRules />
      </AuthGuard>
    } 
    />
    <Route
    path="add"
    element={
      <AuthGuard>
        <AddAttendanceRule />
      </AuthGuard>
    }
    />
    <Route
    path="edit/:id"    element={
      <AuthGuard>
        <EditAttendanceRule />
      </AuthGuard>
    }
    />
    <Route
    path=":id"    element={
      <AuthGuard>
        <ShowAttendanceRule />
      </AuthGuard>
    }
    />
</Route>
<Route path='opening-positions'>
  <Route
    index
    element={
      <AuthGuard>
        <OpeningPositions />
      </AuthGuard>
    } 
    />
    <Route
    path="add"
    element={
      <AuthGuard>
        <AddOpeningPosition />
      </AuthGuard>
    }
    />

        <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditOpeningPosition />
      </AuthGuard>
    }
    />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowOpeningPosition />
      </AuthGuard>
    }
    />
</Route>




<Route path='overtime'>
  <Route
    index
    element={
      <AuthGuard>
        <Overtime />
      </AuthGuard>
    } 
    />
    <Route
    path="add"
    element={
      <AuthGuard>
        <AddOvertime />
      </AuthGuard>
    }
    />

        <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditOvertime />
      </AuthGuard>
    }
    />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowOvertime />
      </AuthGuard>
    }
    />
</Route>




<Route path='attendance-departure'>
  <Route
    index
    element={
      <AuthGuard>
        <AttendanceDeparture />
      </AuthGuard>
    } 
    />
  
        <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditAttendanceDeparture />
      </AuthGuard>
    }
    />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowAttendanceDeparture />
      </AuthGuard>
    }
    />
</Route>



<Route path='attendance-departure-requests'>
  <Route
    index
    element={
      <AuthGuard>
        <AttendanceDepartmentRequests />
      </AuthGuard>
    } 
    />
  
     
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowAttendanceDepartureRequests />
      </AuthGuard>
    }
    />
</Route>



<Route path='leaves'>
  <Route
    index
    element={
      <AuthGuard>
        <LeavesIndex />
      </AuthGuard>
    } 
    />
  
     
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowLeave />
      </AuthGuard>
    }
    />
</Route>



<Route path='carried-forward-leaves'>
  <Route
    index
    element={
      <AuthGuard>
        <CarriedForwardLeaves />
      </AuthGuard>
    } 
    />
      <Route
    path="add"
    element={
      <AuthGuard>
        <AddCarriedForwardLeave />
      </AuthGuard>
    }
    />
  
        <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditCarriedForwardLeave />
      </AuthGuard>
    }
    />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowCarriedForwardLeave />
      </AuthGuard>
    }
    />
</Route>



<Route path='disciplinary-actions'>
  <Route
    index
    element={
      <AuthGuard>
        <DisciplinaryActions />
      </AuthGuard>
    } 
    />
      <Route
    path="add"
    element={
      <AuthGuard>
        <AddDisciplinaryAction />
      </AuthGuard>
    }
    />
  
        <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditDisciplinaryAction />
      </AuthGuard>
    }
    />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowDisciplinaryAction />
      </AuthGuard>
    }
    />
</Route>



<Route path='hiring-applications'>
  <Route
    index
    element={
      <AuthGuard>
        <HiringApplications />
      </AuthGuard>
    } 
    />

       <Route
    path=":id"    element={
      <AuthGuard>
        <ShowHiringApplication />
      </AuthGuard>
    }
    />
    <Route
    path='change-application-status/:id'
    element={<ChangeApplicationStatus />}
    />
 



</Route>



<Route path='position'>
  <Route
    index
    element={
      <AuthGuard>
        <Positions />
      </AuthGuard>
    } 
    />
    <Route
    path="add"
    element={
      <AuthGuard>
        <AddPosition />
      </AuthGuard>
    }
    />

        <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditPosition />
      </AuthGuard>
    }
    />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowPosition />
      </AuthGuard>
    }
    />
</Route>



<Route path="employee-requests">
  <Route
    index
    element={
      <AuthGuard>
        <EmployeeReqests />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddEmployeeReqest />
      </AuthGuard>
    }
  />
    <Route
    path="approve/:id"
    element={
      <AuthGuard>
        <ApproveEmployeeRequest />
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditEmployeeReqest />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowEmployeeReqest />
      </AuthGuard>
    }
  />
  
</Route>




<Route path="employee-assets">
  <Route
    index
    element={
      <AuthGuard>
        <EmployeeAssets />
      </AuthGuard>
    }
  />
  <Route
        path="add"

    element={
      <AuthGuard>
        <AddEmployeeAsset />
      </AuthGuard>
    }
  />
  <Route
        path=":id"

    element={
      <AuthGuard>
        <ShowEmployeeAsset />
      </AuthGuard>
    }
  />

  <Route
        path="edit/:id"

    element={
      <AuthGuard>
        <EditEmployeeAsset />
      </AuthGuard>
    }
  />
  
</Route>


<Route path="department">
  <Route
    index
    element={
      <AuthGuard>
        <Departments />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddDepartment />
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditDepartment />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowDepartment />
      </AuthGuard>
    }
  />
  
</Route>




<Route path="branch">
    <Route
    index
    element={
      <AuthGuard>
        <Branches />
      </AuthGuard>
    }
  />

<Route
    path="add"
    element={
      <AuthGuard>
        <AddBranch />
      </AuthGuard>
    }
  />
<Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditBranch />
      </AuthGuard>
    }
  />

<Route
    path=":id"
    element={
      <AuthGuard>
        <ShowBranch />
      </AuthGuard>
    }
  />

  </Route>
 
 <Route path="role">
  <Route
    index
    element={
      <AuthGuard>
        <Roles />
      </AuthGuard>
    }
  />
  <Route
    path="add"
    element={
      <AuthGuard>
        <AddRole />
      </AuthGuard>
    }
  />
  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowRole />
      </AuthGuard>
    }
  />  
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditRole />
      </AuthGuard>
    }
  />
  </Route>
  <Route path="tenant">
  <Route
    index
    element={
      <AuthGuard>
        <Tenants />
      </AuthGuard>
    }
  />
    <Route
    path="add"
    element={
      <AuthGuard>
        <AddTenant />
      </AuthGuard>
    }
  />
  <Route
    path="edit/:id"
    element={
      <AuthGuard>
        <EditTenant />
      </AuthGuard>
    }
  />

  <Route
    path=":id"
    element={
      <AuthGuard>
        <ShowTenant />
      </AuthGuard>
    }
  />  
  </Route>
 
       
          <Route
            path="Financial"
            element={
              <AuthGuard>
                <Financial />
              </AuthGuard>
            }
          />
          <Route
            path="Reports"
            element={
              <AuthGuard>
                <Reports />
              </AuthGuard>
            }
          />
          <Route
            path="Documents"
            element={
              <AuthGuard>
                <Documents />
              </AuthGuard>
            }
          />
       

          <Route
            path="Holidays"
            element={
              <AuthGuard>
                <Holidays />
              </AuthGuard>
            }
          />
          <Route
            path="Order"
            element={
              <AuthGuard>
                <Order />
              </AuthGuard>
            }
          />
          <Route
            path="Others"
            element={
              <AuthGuard>
                <Others />
              </AuthGuard>
            }
          />

          <Route
            path="Self_Service"
            element={
              <AuthGuard>
                <SelfServices />
              </AuthGuard>
            }
          >
            <Route
              index
              element={
                <AuthGuard>
                  <MainSelf_Service />
                </AuthGuard>
              }
            />
            <Route
              path="PersonalData"
              element={
                <AuthGuard>
                  <PersonalData />
                </AuthGuard>
              }
            />
            <Route
              path="FinancialData"
              element={
                <AuthGuard>
                  <FinancialData />
                </AuthGuard>
              }
            />
            <Route
              path="Reviewtheevaluation"
              element={
                <AuthGuard>
                  <ReviewtheevaluationDeta />
                </AuthGuard>
              }
            />
            <Route
              path="Attendance"
              element={
                <AuthGuard>
                  <Attendece />
                </AuthGuard>
              }
            />
            <Route
              path="Mytasks"
              element={
                <AuthGuard>
                  <Tasks />
                </AuthGuard>
              }
            />
            <Route
              path="Mysalaryvouchers"
              element={
                <AuthGuard>
                  <Mysalaryvouchers />
                </AuthGuard>
              }
            />
            <Route
              path="MyReports"
              element={
                <AuthGuard>
                  <MyReports />
                </AuthGuard>
              }
            />
            <Route
              path="Disciplinaryprocedures"
              element={
                <AuthGuard>
                  <Disciplinaryprocedures />
                </AuthGuard>
              }
            />
            <Route
              path="documentary"
              element={
                <AuthGuard>
                  <Documentary />
                </AuthGuard>
              }
            />
            <Route
              path="MyRequests"
              element={
                <AuthGuard>
                  <MyRequests />
                </AuthGuard>
              }
            />
          </Route>

          <Route
            path="Addvacation"
            element={
              <AuthGuard>
                <Addvacation />
              </AuthGuard>
            }
          />
          <Route
            path="AddSalaryAdvance"
            element={
              <AuthGuard>
                <AddSalaryAdvance />
              </AuthGuard>
            }
          />
        
          <Route path="*" element={<Maintenence />} />
          
        </Route>

      </Routes>
    </>



  );



  
};

export default App;
