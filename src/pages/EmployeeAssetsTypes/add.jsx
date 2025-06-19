import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import TextInput from "../../components/reusable_components/TextInput";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useGetAllbranchesQuery } from "../../api/Branches";
import { useCreateEmployeeAssetTypeMutation } from "../../api/EmployeeAssetTypesApi";

const AddEmployeeAssetType = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [branchId, setBranchId] = useState(null);

  const { data: branchesData } = useGetAllbranchesQuery({ id: 0 });
  const branchOptions = branchesData?.body?.data?.map((b) => ({
    value: b.id,
    label: b.name,
  })) || [];

  const [createAssetType, { isLoading }] = useCreateEmployeeAssetTypeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr  || !descAr || !branchId) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    try {
      const payload = {
        "name[ar]": nameAr,
        "name[en]": nameAr,
        "description[ar]": descAr,
        "description[en]": descAr,
        branch_id: branchId.value,
      };

      const res = await createAssetType(payload).unwrap();
      toast.success(res?.message || t("created_successfully"));
      navigate("/app/asset-types");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("add_asset_type")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <TextInput
          label={t("name")}
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
        />
       
        <TextInput
          label={t("description")}
          value={descAr}
          onChange={(e) => setDescAr(e.target.value)}
        />
    
        <div className="col-span-2">
          <label className="block mb-2 text-gray-900 label-md">{t("branch")}</label>
          <Select
            value={branchId}
            onChange={setBranchId}
            options={branchOptions}
            placeholder={t("choose_branch")}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("add")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-asset-types")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddEmployeeAssetType;
