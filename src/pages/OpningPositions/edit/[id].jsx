import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionBox from '../../../components/ui/containers/SectionBox';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import TextInput from '../../../components/reusable_components/TextInput';
import TextAreaInput from '../../../components/reusable_components/TextAreaInput';
import ToggleInput from '../../../components/reusable_components/ToggleInput';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { t } from 'i18next';

import {
  useGetAllDepartmentsQuery
} from '../../../api/DepartmentsApi';
import {
  useGetAllPositionsQuery
} from '../../../api/positionsApi';
import {
  useGetOpeningPositionByIdQuery,
  useUpdateOpeningPositionMutation
} from '../../../api/OpningPositionsApi';

const EditOpeningPosition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: positionData } = useGetOpeningPositionByIdQuery(id);
  const [updatePosition, { isLoading }] = useUpdateOpeningPositionMutation();
  const { data: departmentData } = useGetAllDepartmentsQuery({ id: 0 });
  const { data: positionsData } = useGetAllPositionsQuery({ id: 0 });

  const departmentOptions = departmentData?.body?.data?.map(d => ({ value: d.id, label: d.name })) || [];
  const positionOptions = positionsData?.body?.data?.map(p => ({ value: p.id, label: p.name })) || [];

  const [formData, setFormData] = useState({
    position_id: '',
    department_id: '',
    number_of_vacancies: '',
    description: '',
    is_published: 1,
  });

  useEffect(() => {
    if (positionData?.body) {
      const { position, department, number_of_vacancies, description, is_published } = positionData.body;
      setFormData({
        position_id: position?.[0] || '',
        department_id: department?.id || '',
        number_of_vacancies: number_of_vacancies || '',
        description: description || '',
        is_published: is_published,
      });
    }
  }, [positionData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToUpload = new FormData();
    formDataToUpload.append('position_id', formData.position_id);
    formDataToUpload.append('department_id', formData.department_id);
    formDataToUpload.append('number_of_vacancies', formData.number_of_vacancies);
    formDataToUpload.append('description', formData.description);
    formDataToUpload.append('is_published', formData.is_published);

    try {
      const res = await updatePosition({ id, formData: formDataToUpload });

      toast.success(res?.data?.message || t('updated_successfully'));
      console.log(res);
      
      navigate('/app/opening-positions');
    } catch (error) {
      toast.error(error?.data?.message || t('something_went_wrong'));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">{t('edit_opening_position')}</h2>
          <ToggleInput
            label={t('status')}
            name="is_published"
            checked={formData.is_published === 1}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-md mb-3 block">{t('position')}</label>
            <Select
              options={positionOptions}
              value={positionOptions.find((opt) => opt.value === formData.position_id)}
              onChange={(selected) => setFormData((prev) => ({ ...prev, position_id: selected.value }))}
              placeholder={t('select_position')}
            />
          </div>

          <div>
            <label className="label-md mb-3 block">{t('department')}</label>
            <Select
              options={departmentOptions}
              value={departmentOptions.find((opt) => opt.value === formData.department_id)}
              onChange={(selected) => setFormData((prev) => ({ ...prev, department_id: selected.value }))}
              placeholder={t('select_department')}
            />
          </div>

          <TextInput
            label={t('number_of_vacancies')}
            name="number_of_vacancies"
            type="number"
            value={formData.number_of_vacancies}
            onChange={handleChange}
          />
        </div>

        <TextAreaInput
          label={t('description')}
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <div className="col-span-2 flex justify-end gap-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('updating') : t('update')}
          </AddingButton>
          <CancelButton
            variant="primary"
            type="button"
            onClick={() => navigate('/app/opening-positions')}
          >
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditOpeningPosition;
