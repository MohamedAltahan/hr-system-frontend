import { useEffect, useState } from "react";
import {
  useGetAllEmployeeContractsQuery,
  useDeleteEmployeeContractMutation,
} from "../../api/EmployeeContractsApi";
import { useGetAllEmployeeQuery } from "../../api/Employee";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import Select from "react-select";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import DateInput from "../../components/reusable_components/DateInput";
import dayjs from "dayjs";

const EmployeeContracts = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: employeesList } = useGetAllEmployeeQuery({ id: 0 });
  const employeeOptions = employeesList?.body?.data?.map(e => ({ value: e.id, label: e.name })) || [];

  const { data: contractsData, isLoading } = useGetAllEmployeeContractsQuery({
    page,
    per_page: 10,
    employee_id: selectedEmployee?.value,
    from_date: fromDate,
    to_date: toDate,
  });

  const contracts = contractsData?.body?.data?.map(contract => ({
    ...contract,
    employee_name: contract?.employee?.name || "-",
    date_range: `${contract.start_date.date} - ${contract.end_date.date}`,
is_active: contract?.is_active == "1" ? t("active") : t("inactive")
  })) || [];

  const pagination = contractsData?.body?.paginate;

  const [deleteContract] = useDeleteEmployeeContractMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteContract(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (error) {
      toast.error(error?.data?.message || t("delete_error"));
    } finally {
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedEmployee, fromDate, toDate]);


  

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "date_range", label: t("contract_period") },
    { key: "salary", label: t("salary") },
    { key: "is_active", label: t("status") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("employee_contracts")}</div>
        <div className="flex justify-end">
          <a href="/app/employee-contracts/add">
            <AddingButton variant="main">{t("add_contract")}</AddingButton>
          </a>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="grid grid-cols-4 gap-4 mb-4" style={{ alignItems: "end" }}>
        <Select
          value={selectedEmployee}
          onChange={setSelectedEmployee}
          options={employeeOptions}
          placeholder={t("employee")}
          isClearable
        />
        <DateInput
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder={t("from_date")}
        />
        <DateInput
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder={t("to_date")}
        />
      </div> */}

      {/* Table */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductTable
            headers={headers}
            data={contracts}
            baseRoute="/app/employee-contracts"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a href={`/app/employee-contracts/edit/${item.id}`} className="editIcon">
                  <MdEdit />
                </a>
                <button onClick={() => handleDeleteClick(item.id)} className="deleteIcon">
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
          message={t("are_you_sure_you_want_to_delete_this_contract")}
        />
      </div>
    </SectionBox>
  );
};

export default EmployeeContracts;
