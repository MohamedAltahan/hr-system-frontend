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
import { useTranslation } from "react-i18next";

const Plans = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const companyId = '';

  const { data: plansData } = useGetAllPlansQuery({ company_id: companyId, page });
  const plans = (plansData?.body?.data || []).map(plan => ({
    ...plan,
    features: plan.features?.join("، "),
    is_active: plan.is_active === 1 ? t("active") : t("inactive"),
    trial_days: plan.is_trial !== 0 ? plan.trial_days : t("not_applicable"),
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
      toast.success(res?.message || t("plan_delete_success"));
    } catch (error) {
      toast.error(error?.data?.message || t("plan_delete_error"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "name", label: t("plan_name") },
    { key: "description", label: t("description") },
    { key: "price", label: t("price") },
    { key: "price_after_discount", label: t("price_after_discount") },
    { key: "currency", label: t("currency") },
    { key: "duration_in_months", label: t("duration_months") },
    { key: "trial_days", label: t("trial_days") },
    { key: "is_active", label: t("status") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("plans_management")}</div>
        <div className="flex justify-end">
          <a href="/app/plans/add">
            <AddingButton variant="main">{t("add_plan")}</AddingButton>
          </a>
        </div>
      </div>

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
          title={t("plan_confirm_delete_title")}
          message={t("plan_confirm_delete_message")}
        />
      </div>
    </SectionBox>
  );
};

export default Plans;
