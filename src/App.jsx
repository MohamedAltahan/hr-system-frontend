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
import Attendance from './pages/Attendance/Attendance';
import Holidays from './pages/Holidays/Holidays';
import Order from './pages/Order/Order';
import Others from './pages/Others/Others';
import Landing from './pages/Landing/Landing';
import AttendeceLayout from './components/layout/AttendeceLayout';
import PreparingAttendanceAndDeparture from './pages/Attendance/PreparingAttendanceAndDeparture';
import AnalyzingEmployeePerformance from './pages/Attendance/AnalyzingEmployeePerformance';
import AttendanceAndDepartureRequests from './pages/Attendance/AttendanceAndDepartureRequests';
import Departuremanagement from './pages/Attendance/Departuremanagement';
import DisciplinaryProcedures from './pages/Attendance/DisciplinaryProcedures';
import AddDisciplinaryProcedures from './pages/Attendance/AddDisciplinaryProcedures';
import AttendanceAndDepartureRegistration from './pages/Attendance/AttendanceAndDepartureRegistration';

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


const App = () => {
  return (
    
    <>
      <Routes >
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

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
            path="Attendance"
            element={
              <AuthGuard>
                <AttendeceLayout />
              </AuthGuard>
            }
          >
            {/* Attendance Children */}
            <Route
            index
              element={
                <AuthGuard>
                  <Attendance />
                </AuthGuard>
              }
            />
            <Route
           
              path="PreparingAttendanceAndDeparture"
              element={
                <AuthGuard>
                  <PreparingAttendanceAndDeparture />
                </AuthGuard>
              }
            />
            <Route
           
              path="DisciplinaryProcedures"
              element={
                <AuthGuard>
                  <DisciplinaryProcedures />
                </AuthGuard>
              }
            />
            <Route
           
              path="AnalyzingEmployeePerformance"
              element={
                <AuthGuard>
                  <AnalyzingEmployeePerformance />
                </AuthGuard>
              }
            />
            <Route
           
              path="AttendanceAndDepartureRegistration"
              element={
                <AuthGuard>
                  <AttendanceAndDepartureRegistration />
                </AuthGuard>
              }
            />
            <Route
           
              path="AttendanceAndDepartureRequests"
              element={
                <AuthGuard>
                  <AttendanceAndDepartureRequests />
                </AuthGuard>
              }
            />
            <Route
           
              path="Departuremanagement"
              element={
                <AuthGuard>
                  <Departuremanagement />
                </AuthGuard>
              }
            />
          </Route>

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
          <Route
            path="AddDisciplinaryProcedures"
            element={
              <AuthGuard>
                <AddDisciplinaryProcedures />
              </AuthGuard>
            }
          />
          <Route
            path="updateDisciplinaryProcedures/:id"
            element={
              <AuthGuard>
                <AddDisciplinaryProcedures />
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
