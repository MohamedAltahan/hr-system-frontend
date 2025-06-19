import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../../components/reusable_components/DateInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useGetAllEmployeeQuery } from "../../../api/Employee";
import { useGetAllDepartmentsQuery } from "../../../api/DepartmentsApi";
import {
  useGetEmployeeAssetByIdQuery,
  useUpdateEmployeeAssetMutation,
} from "../../../api/EmployeeAssetsApi";
import { useGetAllEmployeeAssetTypesQuery } from "../../../api/EmployeeAssetTypesApi";

const EditEmployeeAsset = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [employeeId, setEmployeeId] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [assetTypeId, setAssetTypeId] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [status, setStatus] = useState(null);
const [returnDate, setReturnDate] = useState("");

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: departmentsData } = useGetAllDepartmentsQuery({ id: 0 });
  const { data: assetTypesData } = useGetAllEmployeeAssetTypesQuery({});
  const { data: assetData, isLoading } = useGetEmployeeAssetByIdQuery(id);

  const [updateEmployeeAsset, { isLoading: isUpdating }] = useUpdateEmployeeAssetMutation();

  const employeeOptions = employeesData?.body?.data?.map((e) => ({
    value: e.id,
    label: e.name,
  })) || [];

  const managerOptions = employeeOptions;
  const statusOptions = [
  { value: "pending", label: t("pending") || "قيد الانتظار" },
  { value: "issued", label: t("issued") || "تم التسليم" },
  { value: "returned", label: t("returned") || "تم الإرجاع" },
  { value: "lost", label: t("lost") || "مفقود" },
];


  const departmentOptions = departmentsData?.body?.data?.map((d) => ({
    value: d.id,
    label: d.name,
  })) || [];

  const assetTypeOptions = assetTypesData?.body?.data?.map((type) => ({
    value: type.id,
    label: type.name,
  })) || [];

  useEffect(() => {
    if (assetData?.body) {
      const asset = assetData.body;
      console.log(asset);
      
      setEmployeeId({ value: asset.employee?.id, label: asset.employee?.name });
      setManagerId({ value: asset.manager?.id, label: asset.manager?.name });
      setDepartmentId({ value: asset.department?.id, label: asset?.department?.name });
      setAssetTypeId({ value: asset.asset_type?.id, label: asset.asset_type?.name });
      setIssueDate(asset.issue_date?.date);
      setReturnDate(asset.return_date?.date);
      setStatus({ value: asset.status, label: t(asset.status) || asset.status });

    }
  }, [assetData]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("employee_id", employeeId?.value);
  formData.append("manager_id", managerId?.value);
  formData.append("department_id", departmentId?.value);
  formData.append("employee_asset_type_id", assetTypeId?.value);
  formData.append("issue_date", issueDate);
  formData.append("return_date", returnDate);
  formData.append("status", status?.value);

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const res = await updateEmployeeAsset({ id, formData }).unwrap();
    toast.success(res?.message || t("updated_successfully"));
    navigate("/app/employee-assets");
  } catch (err) {
    toast.error(err?.data?.message || t("something_went_wrong"));
  }
};



  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("edit_employee_asset")}</div>

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
          <AddingButton type="submit" disabled={isUpdating}>
            {isUpdating ? t("loading") : t("update")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-assets")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditEmployeeAsset;
