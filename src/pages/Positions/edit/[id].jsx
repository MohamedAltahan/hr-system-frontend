import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdatePositionMutation,
  useGetPositionByIdQuery,
} from "../../../api/positionsApi";
import SectionBox from "../../../components/ui/containers/SectionBox";
import TextInput from "../../../components/reusable_components/TextInput";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditPosition = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetPositionByIdQuery(Number(id));
  const [updatePosition, { isLoading: isUpdating }] = useUpdatePositionMutation();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  useEffect(() => {
    if (data?.body) {
      const name = data.body.name;
      setNameAr(name || "");
      setNameEn(name?.en || "");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr.trim()) {
      toast.error(t("all_fields_required"));
      return;
    }

    const formData = new FormData();
    formData.append("name[ar]", nameAr);
    formData.append("name[en]", nameAr); // or nameEn if you want separate

    try {
      const res = await updatePosition({ id, formData }).unwrap();
      toast.success(res?.message || t("updated_successfully"));
      navigate("/app/position");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  if (isLoading) {
    return (
      <SectionBox>
        <p>{t("loading")}...</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <SectionBox>
        <p className="text-red-500">{error?.data?.message || t("error_loading_data")}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold mb-8">{t("edit_position")}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label={t("the_position")}
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder={t("enter_position")}
        />

        {/* Optional second input for English */}
        {/* <TextInput
          label={t("position_en")}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder={t("enter_position_en")}
        /> */}

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isUpdating}>
            {t("update")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/position")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditPosition;
