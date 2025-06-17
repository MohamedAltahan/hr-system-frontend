import { useEffect, useState } from "react";
import { useGetAllEvaluationsQuery, useDeleteEvaluationMutation } from "../../api/EmployeeEvaluationApi";
import { useGetAllEmployeeQuery } from "../../api/Employee";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import Select from "react-select";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import DateInput from "../../components/reusable_components/DateInput"; // if you have it
import dayjs from "dayjs";

const EmployeeEvaluations = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch employees for filter options
  const { data: employeesList } = useGetAllEmployeeQuery({ id: 0 });
  const employeeOptions = employeesList?.body?.data?.map(e => ({ value: e.id, label: e.name })) || [];

  // Fetch evaluations
  const { data: evaluationsData, isLoading } = useGetAllEvaluationsQuery({
    page,
    per_page: 10,
    employee_id: selectedEmployee?.value,
    evaluator_id: selectedEvaluator?.value,
    evaluation_from: fromDate,
    evaluation_to: toDate,
  });

  const evaluations = evaluationsData?.body?.data?.map(item => ({
    ...item,
    employee_name: item?.employee?.name,
    evaluator_name: item?.evaluator?.name,
    date_range: `${item.evaluation_from} → ${item.evaluation_to}`,
  })) || [];

  const pagination = evaluationsData?.body?.paginate;

  const [deleteEvaluation] = useDeleteEvaluationMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteEvaluation(selectedId).unwrap();
      toast.success(res?.message || 'Evaluation deleted successfully');
    } catch (error) {
      toast.error(error?.message || 'Failed to delete evaluation');
    } finally {
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedEmployee, selectedEvaluator, fromDate, toDate]);

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "evaluator_name", label: t("evaluator") },
    { key: "date_range", label: t("evaluation_period") },
    { key: "score", label: t("score") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("employee_evaluations")}</div>
        <div className="flex justify-end">
          <a href="/app/employee-evaluation/add">
            <AddingButton variant="main">{t("add_evaluation")}</AddingButton>
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-4" style={{ alignItems: "end" }}>
        <div>
          <Select
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            options={employeeOptions}
            placeholder={t("employee")}
            isClearable
          />
        </div>
        <div>
          <Select
            value={selectedEvaluator}
            onChange={setSelectedEvaluator}
            options={employeeOptions}
            placeholder={t("evaluator")}
            isClearable
          />
        </div>
        <div>
          <DateInput
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder={t("from_date")}
          />
        </div>
        <div>
          <DateInput
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder={t("to_date")}
          />
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
            data={evaluations}
            baseRoute="/app/employee-evaluation"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a href={`/app/employee-evaluation/edit/${item.id}`} className="font-medium text-blue-600 hover:underline editIcon">
                  <MdEdit />
                </a>
                <button onClick={() => handleDeleteClick(item.id)}               className=" deleteIcon"
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
          title={t("confirm_delete")}
          message={t("are_you_sure_you_want_to_delete_this_record")}
        />
      </div>
    </SectionBox>
  );
};

export default EmployeeEvaluations;
