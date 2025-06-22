import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePositionMutation } from "../../api/positionsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import TextInput from "../../components/reusable_components/TextInput";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddPosition = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const [createPosition, { isLoading }] = useCreatePositionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr.trim()) {
      toast.error(t("all_fields_required"));
      return;
    }

    const formData = new FormData();
    formData.append("name[ar]", nameAr);
    formData.append("name[en]", nameAr); // or nameEn if you want separate input

    try {
      const res = await createPosition(formData).unwrap();
      toast.success(res?.message || t("created_successfully"));
      navigate("/app/position");
    } catch (error) {
      toast.error(error?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t("add_position")}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label={t("the_position")}
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder={t("enter_position")}
        />

        {/* Optional second input if needed */}
        {/* <TextInput
          label={t("position_en")}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder={t("enter_position_en")}
        /> */}

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {t("add")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/position")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddPosition;
