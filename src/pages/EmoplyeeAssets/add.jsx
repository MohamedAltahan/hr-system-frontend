import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../components/reusable_components/DateInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useGetAllEmployeeQuery } from "../../api/Employee";
import { useGetAllDepartmentsQuery } from "../../api/DepartmentsApi";
import { useCreateEmployeeAssetMutation } from "../../api/EmployeeAssetsApi";
import { useGetAllEmployeeAssetTypesQuery } from "../../api/EmployeeAssetTypesApi";

const AddEmployeeAsset = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [assetTypeId, setAssetTypeId] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState(null);


  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: departmentsData } = useGetAllDepartmentsQuery({ id: 0 });
  const { data: assetTypesData } = useGetAllEmployeeAssetTypesQuery({});

  const [createEmployeeAsset, { isLoading }] = useCreateEmployeeAssetMutation();

  const employeeOptions = employeesData?.body?.data?.map((e) => ({
    value: e.id,
    label: e.name,
  })) || [];

  const managerOptions = employeeOptions;

  const departmentOptions = departmentsData?.body?.data?.map((d) => ({
    value: d.id,
    label: d.name,
  })) || [];
const statusOptions = [
  { value: "pending", label: t("pending") || "قيد الانتظار" },
  { value: "issued", label: t("issued") || "تم التسليم" },
  { value: "returned", label: t("returned") || "تم الإرجاع" },
  { value: "lost", label: t("lost") || "مفقود" },
];

  const assetTypeOptions = assetTypesData?.body?.data?.map((type) => ({
    value: type.id,
    label: type.name,
  })) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !managerId || !departmentId || !assetTypeId || !issueDate || !returnDate) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    if (new Date(issueDate) > new Date(returnDate)) {
      toast.error(t("issue_date_cannot_be_after_return_date") || "تاريخ التسليم لا يمكن أن يكون بعد تاريخ الاسترجاع");
      return;
    }

    try {
      const payload = {
        employee_id: employeeId.value,
        manager_id: managerId.value,
        department_id: departmentId.value,
        employee_asset_type_id: assetTypeId.value,
        issue_date: issueDate,
        return_date: returnDate,
        status: status.value,
      };

      const res = await createEmployeeAsset(payload).unwrap();
      toast.success(res?.message || t("created_successfully"));
      navigate("/app/employee-assets");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("add_employee_asset")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("employee")}</label>
          <Select
            value={employeeId}
            onChange={setEmployeeId}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("manager")}</label>
          <Select
            value={managerId}
            onChange={setManagerId}
            options={managerOptions}
            placeholder={t("choose_manager")}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("department")}</label>
          <Select
            value={departmentId}
            onChange={setDepartmentId}
            options={departmentOptions}
            placeholder={t("choose_department")}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("asset_type")}</label>
          <Select
            value={assetTypeId}
            onChange={setAssetTypeId}
            options={assetTypeOptions}
            placeholder={t("choose_asset_type")}
          />
        </div>

        <DateInput
          label={t("issue_date")}
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />

        <DateInput
          label={t("return_date")}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <div>
  <label className="block mb-2 text-gray-900 label-md">{t("status")}</label>
  <Select
    value={status}
    onChange={setStatus}
    options={statusOptions}
    placeholder={t("choose_status")}
    isClearable
  />
</div>


        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("add")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-assets")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddEmployeeAsset;
