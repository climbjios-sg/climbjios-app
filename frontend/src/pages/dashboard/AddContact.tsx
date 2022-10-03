// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useEffect, useMemo, useState } from 'react';
// // @mui
// import { Box, Card, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
// // @types
// // import { Contact } from '../../@types/user';
// // components
// import { FormProvider, RHFTextField } from '../../components/hook-form';
// import { useForm } from 'react-hook-form';
// import { LoadingButton } from '@mui/lab';
// import { MAPBOX_API, SUPPORT_EMAIL } from '../../config';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';

// interface FormValuesProps extends Omit<Contact, 'avatarUrl'> {}

// type AddContactProps = {
//   contactData?: Contact;
//   onSubmit: (data: FormValuesProps) => Promise<void>;
// };

// export default function AddContact({ contactData, onSubmit }: AddContactProps) {
//   const md = useMediaQuery('(min-width:600px)');
//   const { enqueueSnackbar } = useSnackbar();
//   const [isLocationInferred, setIsLocationInferred] = useState(false);
//   const defaultValues = useMemo(
//     () => ({
//       whereWeMet: '',
//       whereWeMetLongitude: '',
//       whereWeMetLatitude: '',
//       name: contactData?.name || '',
//       company: contactData?.company || '',
//       role: contactData?.role || '',
//       email: contactData?.email || '',
//       phoneNumber: contactData?.phoneNumber || '',
//       linkedin: contactData?.linkedin || '',
//       telegram: contactData?.telegram || '',
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [contactData]
//   );

//   const NewContactSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     company: Yup.string().required('Company is required'),
//     role: Yup.string().required('Role is required'),
//   });

//   const methods = useForm<FormValuesProps>({
//     resolver: yupResolver(NewContactSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const submitForm = async (data: FormValuesProps) => {
//     try {
//       await onSubmit(data);
//       reset();
//       enqueueSnackbar('Added contact');
//     } catch (error) {
//       enqueueSnackbar(
//         `Failed to save contact. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
//         {
//           variant: 'error',
//           persist: true,
//         }
//       );
//       console.error(error);
//     }
//   };

//   const setWhereWeMet = async (longitude: string, latitude: string) => {
//     setValue('whereWeMetLongitude', longitude);
//     setValue('whereWeMetLatitude', latitude);

//     const { data } = await axios.get(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API}`
//     );

//     if (data.features.length) {
//       setValue('whereWeMet', data.features[0].place_name);
//       setIsLocationInferred(true);
//     }
//   };

//   useEffect(() => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { longitude, latitude } = position.coords;
//         setWhereWeMet(longitude.toString(), latitude.toString());
//       }, console.error);
//     }
//   }, []);

//   return (
//     <Box sx={{ pt: 5, pb: md ? 80 : 20 }}>
//       <FormProvider
//         methods={methods}
//         onSubmit={handleSubmit(submitForm, () => {
//           enqueueSnackbar('Missing Name! Name is required for you identify your friend 😉', {
//             variant: 'error',
//           });
//           window.scrollTo(0, 0);
//         })}
//       >
//         <Grid container spacing={3} justifyContent="center">
//           <Grid item xs={12} md={8}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ mb: 3 }}
//             >
//               <Typography variant="h4">Add Contact</Typography>
//             </Stack>
//             <Card sx={{ p: 2 }}>
//               <Box
//                 sx={{
//                   display: 'grid',
//                   columnGap: 2,
//                   rowGap: 3,
//                   gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
//                 }}
//               >
//                 <RHFTextField name="name" label="Name (Required)" />
//                 <RHFTextField name="company" label="Company (Required)" />
//                 <RHFTextField name="role" label="Role (Required)" />
//                 <RHFTextField name="email" label="Email" />
//                 <RHFTextField name="phoneNumber" label="Phone Number" />
//                 <RHFTextField
//                   name="whereWeMet"
//                   label="Where We Met"
//                   helperText={
//                     isLocationInferred && 'Automatically inferred from your current location'
//                   }
//                 />
//                 <RHFTextField
//                   name="linkedin"
//                   label="Linkedin URL"
//                   helperText="e.g. https://linkedin.com/in/rizhaow"
//                 />
//                 <RHFTextField name="telegram" label="Telegram Handle" helperText="e.g. rizhaow" />
//               </Box>

//               <Stack alignItems="flex-end" sx={{ my: 4 }}>
//                 <LoadingButton
//                   sx={{ height: 50 }}
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   loading={isSubmitting}
//                 >
//                   Done
//                 </LoadingButton>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </FormProvider>
//     </Box>
//   );
// }
export default function AddContact() {
  return (<></>);
}