import Iconify from '../../../../components/Iconify';
import JiosForm, { JioFormValues } from '../form/JiosForm';

export default function EditJios() {
  const handleEdit = async (data: JioFormValues) => {
    console.log(data);
  };

  return (
    <JiosForm
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:edit-outline'} width={24} height={24} />}
    />
  );
}
