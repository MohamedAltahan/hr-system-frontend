import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import NumberInput from "../../../components/reusable_components/NumberInput";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useGetAllEmployeeQuery } from "../../../api/Employee";
import {
  useGetCarriedForwardLeaveByIdQuery,
  useUpdateCarriedForwardLeaveMutation,
} from "../../../api/CarriedForwardLeavesApi";

const EditCarriedForwardLeave = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [daysBalance, setDaysBalance] = useState("");
  const [year, setYear] = useState("");

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: leaveData, isLoading: isFetching } = useGetCarriedForwardLeaveByIdQuery(id);
  const [updateLeave, { isLoading }] = useUpdateCarriedForwardLeaveMutation();

  const employeeOptions =
    employeesData?.body?.data?.map((emp) => ({
      value: emp.id,
      label: emp.name,
    })) || [];

  useEffect(() => {
    if (leaveData?.body) {
      const { empoloyee, days_balance, year } = leaveData.body;
      setEmployee({ value: empoloyee.id, label: empoloyee.name });
      setDaysBalance(days_balance);
      setYear(year);
    }
  }, [leaveData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !daysBalance || !year) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    const payload = {
      employee_id: employee.value,
      days_balance: Number(daysBalance),
      year,
    };

    try {
      const res = await updateLeave({ id, payload }).unwrap();
      toast.success(res?.message || t("updated_successfully"));
      navigate("/app/carried-forward-leaves");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("edit_carried_forward_leave")}</div>

      {isFetching ? (
        <p>{t("loading")}</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-900 label-md">{t("employee")}</label>
            <Select
              value={employee}
              onChange={setEmployee}
              options={employeeOptions}
              placeholder={t("choose_employee")}
            />
          </div>

          <div>
            <NumberInput
              label={t("days_balance")}
              type="number"
              min="0"
              className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
              value={daysBalance}
              onChange={(e) => setDaysBalance(e.target.value)}
              placeholder={t("enter_days_balance")}
            />
          </div>

          <div>
            <NumberInput
              label={t("year")}
              type="number"
              min="0"
              className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder={t("enter_year")}
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <AddingButton type="submit" disabled={isLoading}>
              {isLoading ? t("loading") : t("update")}
            </AddingButton>
            <CancelButton onClick={() => navigate("/app/carried-forward-leaves")} type="button">
              {t("cancel")}
            </CancelButton>
          </div>
        </form>
      )}
    </SectionBox>
  );
};

export default EditCarriedForwardLeave;
