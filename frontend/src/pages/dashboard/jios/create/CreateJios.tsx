import Iconify from '../../../../components/Iconify';
import JiosForm, { JioFormValues } from '../form/JiosForm';

export default function CreateJios() {
  const handleCreate = async (data: JioFormValues) => {
    console.log(data);
  };

  return (
    <JiosForm
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
