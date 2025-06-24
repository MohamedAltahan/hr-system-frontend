import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOpeningPositionMutation } from '../../api/OpningPositionsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import TextInput from '../../components/reusable_components/TextInput';
import TextAreaInput from '../../components/reusable_components/TextAreaInput';
import ToggleInput from '../../components/reusable_components/ToggleInput';
import { useGetAllDepartmentsQuery } from '../../api/DepartmentsApi';
import { useGetAllPositionsQuery } from '../../api/positionsApi';
import {useGetAllJobTitlesQuery} from "../../api/jobTitlesApi";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { t } from 'i18next';

const AddOpeningPosition = ({ departments = [], positions = [] }) => {
  const navigate = useNavigate();
  const [createPosition, { isLoading }] = useCreateOpeningPositionMutation();
  const { data: departmentData } = useGetAllDepartmentsQuery({ id: 0 });
  const { data: positionsData } = useGetAllPositionsQuery({ id: 0 });
  const { data: JobTitlesData } = useGetAllJobTitlesQuery({ id: 0 });
  const [formData, setFormData] = useState({
    position_id: '',
    number_of_vacancies: '',
    description: '',
    department_id: '',
    is_published: 1,
  });
    const departmentOptions = departmentData?.body?.data?.map(d => ({ value: d.id, label: d.name })) || [];
  const positionOptions = positionsData?.body?.data?.map(p => ({ value: p.id, label: p.name })) || [];
  const JobTitlesOptions = JobTitlesData?.body?.data?.map(p => ({ value: p.id, label: p.name })) || [];

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
    formDataToUpload.append('number_of_vacancies', formData.number_of_vacancies);
    formDataToUpload.append('description', formData.description);
    formDataToUpload.append('department_id', formData.department_id);
    formDataToUpload.append('is_published', formData.is_published);

    try {
      const res = await createPosition(formDataToUpload).unwrap();
      toast.success(res?.message || t('added_successfully'));
      navigate('/app/opening-positions');
    } catch (error) {
      toast.error(error?.data?.message || t('something_went_wrong'));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <form onSubmit={handleSubmit} >
        <div style={{display:"flex",justifyContent:"space-between"}} className='mb-5'>
                  <h2 className="text-xl font-bold">{t('add_opening_position')}</h2>

             <ToggleInput
          label={t('status')}
          name="is_published"
          checked={formData.is_published === 1}
          onChange={handleChange}
        />

        </div>
        <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-md mb-3 block">{t('the_position')}</label>
          <Select
            options={JobTitlesOptions}
            onChange={(selected) => setFormData({ ...formData, position_id: selected.value })}
            placeholder={t('select_position')}
          />
        </div>

        <div>
          <label className="label-md mb-3 block">{t('department')}</label>
          <Select
           options={departmentOptions}
            onChange={(selected) => setFormData({ ...formData, department_id: selected.value })}
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
            {isLoading ? t('adding') : t('add')}
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

export default AddOpeningPosition;
