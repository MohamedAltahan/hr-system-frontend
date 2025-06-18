import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateJobTitleMutation } from "../../api/jobTitlesApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import TextInput from "../../components/reusable_components/TextInput";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddJobTitle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const [createJobTitle, { isLoading }] = useCreateJobTitleMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr.trim() ) {
      toast.error(t("all_fields_required"));
      return;
    }

    try {
      const res = await createJobTitle({
        name: {
          ar: nameAr,
          en: nameAr,
        },
      }).unwrap();

      toast.success(res?.message || t("created_successfully"));
      navigate("/app/job-titles");
    } catch (error) {
      toast.error(error?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t("add_job_title")}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label={t("job_title")}
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder={t("enter_job_title")}
        />

       

        <div className="col-span-2 flex justify-end gap-4 mt-4">
         <AddingButton type="submit" disabled={isLoading}>
            {t("add")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/job-titles")} type="button">
            {t("cancel")}
          </CancelButton>
          
        </div>
      </form>
    </SectionBox>
  );
};

export default AddJobTitle;
