import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../components/reusable_components/DateInput";
import NumberInput from "../../components/reusable_components/NumberInput";
import { useGetAllEmployeeQuery } from "../../api/Employee";
import { useCreateEvaluationMutation } from "../../api/EmployeeEvaluationApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddEmployeeEvaluation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState(null);
  const [evaluatorId, setEvaluatorId] = useState(null);
  const [evaluationFrom, setEvaluationFrom] = useState('');
  const [evaluationTo, setEvaluationTo] = useState('');
  const [score, setScore] = useState('');

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const employeeOptions = employeesData?.body?.data?.map(e => ({
    value: e.id,
    label: e.name
  })) || [];

  const [createEvaluation, { isLoading }] = useCreateEvaluationMutation();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!employeeId || !evaluatorId || !evaluationFrom || !evaluationTo || score === '') {
    toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
    return;
  }

  const numericScore = Number(score);
  if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
    toast.error(t("score_must_be_between_0_and_100") || "يجب أن تكون الدرجة بين 0 و100");
    return;
  }

  if (new Date(evaluationFrom) > new Date(evaluationTo)) {
    toast.error(t("from_date_cannot_be_after_to_date") || "تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية");
    return;
  }

  try {
    const payload = {
      employee_id: employeeId.value,
      evaluator_id: evaluatorId.value,
      evaluation_from: evaluationFrom,
      evaluation_to: evaluationTo,
      score: numericScore,
    };

    const res = await createEvaluation(payload).unwrap();
    toast.success(res?.message || t("created_successfully"));
    navigate("/app/employee-evaluation");
  } catch (error) {
    toast.error(error?.message || t("something_went_wrong"));
  }
};


  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("add_evaluation")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Employee */}
        <div>
          <label className="block mb-2 text-gray-900 dark:text-black label-md mb-3">
            {t("employee")}
          </label>
          <Select
            value={employeeId}
            onChange={setEmployeeId}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        {/* Evaluator */}
        <div>
          <label className="block mb-2 text-gray-900 dark:text-black label-md mb-3">
            {t("evaluator")}
          </label>
          <Select
            value={evaluatorId}
            onChange={setEvaluatorId}
            options={employeeOptions}
            placeholder={t("choose_evaluator")}
          />
        </div>

        {/* From Date */}
        <DateInput
          label={t("from_date")}
          value={evaluationFrom}
          onChange={(e) => setEvaluationFrom(e.target.value)}
        />

        {/* To Date */}
        <DateInput
          label={t("to_date")}
          value={evaluationTo}
          onChange={(e) => setEvaluationTo(e.target.value)}
        />

      <div>
  <NumberInput
    label={t("score")}
    name="score"
    value={score}
    onChange={(e) => setScore(e.target.value)}
    placeholder={t("score")}
    min={0}
    max={100}
  />
  <p className="text-sm text-gray-500 mt-1" style={{fontSize:"12px"}}>
    {t("score_hint") || "القيمة يجب أن تكون بين 0 و 100"}
  </p>
</div>

        

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("add")}
          </AddingButton>
                    <CancelButton onClick={() => navigate("/app/employee-evaluation")} >{t('cancel')}</CancelButton>

        </div>
      </form>
    </SectionBox>
  );
};

export default AddEmployeeEvaluation;
