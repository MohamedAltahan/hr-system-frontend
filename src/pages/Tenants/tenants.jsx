import { useEffect, useState } from "react";
import { useGetAllTenantsQuery, useDeleteTenantMutation } from "../../api/TenantsApi"; // Adjust path if needed
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { useDisableCompanyMutation } from "../../api/TenantsApi";

import CustomToggle from '../../components/reusable_components/StyledSwitch';


const Tenants = () => {
  const [page, setPage] = useState(1);

  // Fetch tenants data
  const { data: tenantsData, isLoading } = useGetAllTenantsQuery({ name: '', page });

  // Map tenants data for table, flattening created_at.date
const tenants = (tenantsData?.body?.data || []).map(tenant => ({
  ...tenant,
  created_at: tenant.created_at?.date || '',
  is_active: tenant.is_active,
  plan_name: tenant.subscription?.plan_data?.name || '-------',
}));



  const pagination = tenantsData?.body?.paginate;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [deleteTenant, { isLoading: deleteLoading }] = useDeleteTenantMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteTenant(selectedId).unwrap();
      toast.success(res?.message || 'Tenant deleted successfully');
    } catch (error) {
      console.log(error);
      
      toast.error(error?.data?.message || 'Failed to delete tenant');
    } finally {
      setConfirmOpen(false);
    }
  };

  // Table headers based on your tenant response fields
  const headers = [
    { key: 'company_name', label: 'اسم الشركة' },
    { key: 'domain', label: 'اسم الشركة المميز' },
    // { key: 'email', label: 'البريد الإلكتروني' },
    // { key: 'phone', label: 'رقم الهاتف' },
    { key: 'is_active', label: 'الحالة' },
    { key: 'version', label: 'الإصدار' },
    { key: 'plan_name', label: 'اسم الباقة' },
    // { key: 'creating_status', label: 'حالة الإنشاء' },
    { key: 'created_at', label: 'تاريخ الإنشاء' },
  ];


const [disableCompany, { isLoading: toggleLoading }] = useDisableCompanyMutation();

  const handleToggleStatus = async (company_id, currentStatus) => {
  try {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const res = await disableCompany({ company_id, is_active: newStatus }).unwrap();
    toast.success(res?.message || "تم تحديث الحالة");
  } catch (error) {
    console.error(error);
    toast.error(error?.data?.message || "حدث خطأ أثناء تحديث الحالة");
  }
};


  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">إدارة الشركات</div>
        <div className="flex justify-end">
          <a href="/app/tenant/add">
            <AddingButton variant="main">إضافة شركة</AddingButton>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        {isLoading || deleteLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
         <ProductTable
  headers={headers}
  data={tenants}
  baseRoute="/app/tenant"
  pagination={pagination}
  onPageChange={(newPage) => setPage(Number(newPage))}
  rowKey="id"
  renderActions={(item) => (
    <div className="flex gap-2 items-center">
      
      <a href={`/app/tenant/edit/${item.id}`} className="text-blue-600 hover:underline editIcon">
        <MdEdit />
      </a>
      <button onClick={() => handleDeleteClick(item.id)} className="deleteIcon">
        <MdDelete />
      </button>
    </div>
  )}
  customCellRender={{
    is_active: (item) => (
       <CustomToggle
        checked={item.is_active === 1}
        onChange={() => handleToggleStatus(item.id, item.is_active)}
      />
 
    ),
  }}
/>

        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="تأكيد الحذف"
          message="هل أنت متأكد أنك تريد حذف هذه الشركة؟" 
        />
      </div>
    </SectionBox>
  );
};

export default Tenants;
