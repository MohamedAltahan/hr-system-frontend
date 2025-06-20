import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAttendanceRuleByIdQuery,
  useUpdateAttendanceRuleMutation,
} from "../../../api/AttendanceRulesApi";
import SectionBox from "../../../components/ui/containers/SectionBox";
import TextInput from "../../../components/reusable_components/TextInput";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import ToggleInput from "../../../components/reusable_components/ToggleInput";
import Select from "react-select";
import { toast } from "react-toastify";
import { t } from "i18next";

const EditAttendanceRule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetAttendanceRuleByIdQuery(id);
  const [updateAttendanceRule, { isLoading }] = useUpdateAttendanceRuleMutation();

  const shiftTimeOptions = [
    { value: "morning", label: t("morning") },
    { value: "evening", label: t("evening") },
    { value: "night", label: t("night") },
  ];

  const workTypeOptions = [
    { value: "full-time", label: t("full_time") },
    { value: "part-time", label: t("part_time") },
  ];

  const [formData, setFormData] = useState({
    name: { ar: "", en: "" },
    entry_time: "",
    exit_time: "",
    break_time: "",
    grace_period_minutes: "",
    shift_time: "",
    work_type: "",
    weekly_days_count: "",
    status: 1,
  });

  useEffect(() => {
    if (data?.body) {
      const res = data.body;
      setFormData({
        name: { ar: res.name, en: res.name },
        entry_time: res.entry_time?.time_24hr || "",
        exit_time: res.exit_time?.time_24hr || "",
        break_time: res.break_time?.time_24hr || "",
        grace_period_minutes: res.grace_period_minutes?.toString() || "",
        shift_time: res.shift_time || "",
        work_type: res.work_type || "",
        weekly_days_count: res.weekly_days_count?.toString() || "",
        status: res.status,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("_ar")) {
      const key = name.split("_")[0];
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          ar: value,
          en: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToUpload = new FormData();
    formDataToUpload.append("name[ar]", formData.name.ar);
    formDataToUpload.append("name[en]", formData.name.en);
    formDataToUpload.append("entry_time", formData.entry_time);
    formDataToUpload.append("exit_time", formData.exit_time);
    formDataToUpload.append("break_time", formData.break_time);
    formDataToUpload.append("grace_period_minutes", formData.grace_period_minutes);
    formDataToUpload.append("shift_time", formData.shift_time);
    formDataToUpload.append("work_type", formData.work_type);
    formDataToUpload.append("weekly_days_count", formData.weekly_days_count);
    formDataToUpload.append("status", formData.status);

    try {
      const res = await updateAttendanceRule({ id, formData: formDataToUpload }).unwrap();
      toast.success(res?.message || t("updated_successfully"));
      navigate("/app/attendance-rules");
    } catch (error) {
      toast.error(error?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="text-xl font-bold">{t("edit_rule")}</h2>

          <ToggleInput
            label={t("status")}
            name="status"
            checked={formData.status === 1}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <TextInput
            label={t("name")}
            name="name_ar"
            value={formData.name.ar}
            onChange={handleChange}
          />
          <TextInput
            label={t("entry_time")}
            name="entry_time"
            type="time"
            value={formData.entry_time}
            onChange={handleChange}
          />
          <TextInput
            label={t("exit_time")}
            name="exit_time"
            type="time"
            value={formData.exit_time}
            onChange={handleChange}
          />
          <TextInput
            label={t("break_time")}
            name="break_time"
            type="time"
            value={formData.break_time}
            onChange={handleChange}
          />
          <TextInput
            label={t("grace_period_minutes")}
            name="grace_period_minutes"
            type="number"
            value={formData.grace_period_minutes}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 text-gray-900 label-md">{t("shift_time")}</label>
            <Select
              name="shift_time"
              options={shiftTimeOptions}
              value={shiftTimeOptions.find(opt => opt.value === formData.shift_time)}
              onChange={(selected) => setFormData(prev => ({ ...prev, shift_time: selected?.value }))}
              placeholder={t("choose_shift_time")}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-900 label-md">{t("work_type")}</label>
            <Select
              name="work_type"
              options={workTypeOptions}
              value={workTypeOptions.find(opt => opt.value === formData.work_type)}
              onChange={(selected) => setFormData(prev => ({ ...prev, work_type: selected?.value }))}
              placeholder={t("choose_work_type")}
            />
          </div>

          <div>
            <TextInput
              label={t("weekly_days_count")}
              name="weekly_days_count"
              type="number"
              value={formData.weekly_days_count}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1 && value <= 7) {
                  handleChange(e);
                }
              }}
              min={1}
              max={7}
            />
            <p className="text-sm text-gray-500" style={{ fontSize: "12px" }}>
              {t("weekly_days_count_hint")}
            </p>
          </div>

          <div className="col-span-2 flex justify-end gap-5">
            <AddingButton type="submit" variant="main" disabled={isLoading}>
              {isLoading ? t("updating") : t("update")}
            </AddingButton>
            <CancelButton
              variant="primary"
              type="button"
              onClick={() => navigate("/app/attendance-rules")}
            >
              {t("cancel")}
            </CancelButton>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditAttendanceRule;
