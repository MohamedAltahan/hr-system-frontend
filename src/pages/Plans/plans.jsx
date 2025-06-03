import { useEffect, useState } from "react";
import {
  useGetAllPlansQuery,
  useDeletePlanMutation,
} from "../../api/PlansApi"; 

import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";

const Plans = () => {
  const [page, setPage] = useState(1);
  const companyId = ''; // or get dynamically if needed

  const { data: plansData } = useGetAllPlansQuery({ company_id: companyId, page });

  const plans = (plansData?.body?.data || []).map(plan => ({
    ...plan,
    features: plan.features?.join("، "), // Join features for display
      is_active: plan.is_active === 1 ? 'نشط' : 'غير نشط', // translate status here

  }));

  const pagination = plansData?.body?.paginate;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletePlan, { isLoading }] = useDeletePlanMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deletePlan(selectedId).unwrap();
      toast.success(res?.message || "تم حذف الخطة بنجاح");
    } catch (error) {
      toast.error(error?.message || "فشل حذف الخطة");
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "name", label: "اسم الخطة" },
    { key: "description", label: "الوصف" },
    { key: "price", label: "السعر" },
    { key: "price_after_discount", label: "السعر بعد الخصم" },
    { key: "currency", label: "العملة" },
    { key: "duration_in_months", label: "المدة (بالأشهر)" },
    { key: "trial_days", label: "أيام التجربة" },
    // { key: "features", label: "المميزات" },
    { key: "is_active", label: "الحالة" },
  ];

  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">إدارة الخطط</div>
        <div className="flex justify-end">
          <a href="/app/plans/add">
            <AddingButton variant="main">إضافة خطة</AddingButton>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductTable
            headers={headers}
            data={plans}
            baseRoute="/app/plans"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/plans/edit/${item.id}`}
                  className="text-blue-600 hover:underline editIcon"
                >
                  <MdEdit />
                </a>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="deleteIcon"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          />
        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="تأكيد الحذف"
          message="هل أنت متأكد أنك تريد حذف هذه الخطة؟"
        />
      </div>
    </SectionBox>
  );
};

export default Plans;
