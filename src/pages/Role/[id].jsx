import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetRoleByIdQuery } from '../../api/RolesApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from "react-icons/lu";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { useState } from 'react';


const RoleShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading } = useGetRoleByIdQuery(id);

  const [openGroups, setOpenGroups] = useState({}); // ✅ Move hook to top

  if (isLoading) return <p>جاري تحميل البيانات...</p>;

  const role = data?.body;

  // Group permissions by their 'group' field
  const groupedPermissions = (role?.permissions || []).reduce((acc, perm) => {
    const group = perm.group || "غير مصنف";
    if (!acc[group]) acc[group] = [];
    acc[group].push(perm);
    return acc;
  }, {});

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };
  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">عرض  الدور</h2>
      

      <div className=" gap-4 bg-white border border-gray-200"



        style={{ borderRadius: '10px', overflow: 'hidden' }}>

<div className="flex align-center items-center px-4 py-4 justify-between" style={{borderBottom: '1px solid #1515151A'}}>
<h2 className="text-base font-bold">عرض تفاصيل الدور</h2>
<button className='EditPermissionBtn'><CancelButton   onClick={() => navigate(`/app/role/edit/${id}` )}> <LuPencil /> تعديل
</CancelButton></button>
</div>


<div className='grid grid-cols-2'>
     <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>اسم الدور (AR):</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{role?.translation?.title?.ar || '-'}</p>
        </div>


         <div className="flex align-center items-center p-3">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>اسم الدور (EN):</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{role?.name || '-'}</p>
        </div>
</div>
       
      
       
      </div>

        <div className=" gap-4 bg-white border border-gray-200 shadow-sm rounded-xl "

>
        <h3 className="text-lg font-bold border-b p-4" >الصلاحيات:</h3>
   {Object.entries(groupedPermissions).map(([group, perms]) => {
        const isOpen = openGroups[group];

        return (
          <div key={group} className="bg-white border-b  p-4">
            <button
              type="button"
              className="flex items-center justify-between w-full"
              onClick={() => toggleGroup(group)}
            >
              <span className="text-lg font-semibold text-gray-800 capitalize">
                {group}
              </span>
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {isOpen && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {perms.map((perm) => (
                  <li
                    key={perm.id}
                    className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{perm.title || perm.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/role')}>
          رجوع
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default RoleShow;
