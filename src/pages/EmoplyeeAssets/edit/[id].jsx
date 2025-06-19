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
      setEmployeeId({ value: asset.employee_id, label: asset.employee?.name });
      setManagerId({ value: asset.manager_id, label: asset.manager?.name });
      setDepartmentId({ value: asset.department_id, label: asset?.employee?.department_name?.name });
      setAssetTypeId({ value: asset.employee_asset_type_id, label: asset.asset_type?.name });
      setIssueDate(asset.issue_date?.date);
      setReturnDate(asset.return_date?.date);
    }
  }, [assetData]);

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
        status: "pending",
      };

      const res = await updateEmployeeAsset({ id, data: payload }).unwrap();
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

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isUpdating}>
            {isUpdating ? t("loading") : t("save")}
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
