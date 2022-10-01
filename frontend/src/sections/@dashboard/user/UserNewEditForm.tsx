// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useEffect, useMemo } from 'react';
// // form
// import { useForm } from 'react-hook-form';
// // @mui
// import { LoadingButton } from '@mui/lab';
// import { Box, Card, Grid, Stack } from '@mui/material';
// // @types
// import { User } from '../../../@types/user';
// // components
// import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
// import { useSnackbar } from 'notistack';
// import { SUPPORT_EMAIL } from '../../../config';
// import useAuth from '../../../hooks/useAuth';

// // ----------------------------------------------------------------------

// interface FormValuesProps extends User {}

// type Props = {
//   isEdit: boolean;
//   onExit: () => void;
//   currentUser?: User | null;
// };

// export default function UserNewEditForm({ isEdit, currentUser, onExit }: Props) {
//   const auth = useAuth();
//   const { enqueueSnackbar } = useSnackbar();
//   const defaultValues = useMemo(
//     () => ({
//       avatarUrl: currentUser?.avatarUrl || '',
//       name: currentUser?.name || '',
//       company: currentUser?.company || '',
//       role: currentUser?.role || '',
//       email: currentUser?.email || '',
//       phoneNumber: currentUser?.phoneNumber || '',
//       linkedin: currentUser?.linkedin || 'https://linkedin.com/in/',
//       telegram: currentUser?.telegram || '',
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [currentUser]
//   );

//   const NewProfileSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     company: Yup.string().required('Company is required'),
//     role: Yup.string().required('Role is required'),
//     email: Yup.string().required('Email is required'),
//     phoneNumber: Yup.string().required('Phone number is required'),
//   });

//   const methods = useForm<FormValuesProps>({
//     resolver: yupResolver(NewProfileSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   useEffect(() => {
//     if (isEdit && currentUser) {
//       reset(defaultValues);
//     }
//     if (!isEdit) {
//       reset(defaultValues);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isEdit, currentUser]);

//   const onSubmit = async (data: FormValuesProps) => {
//     try {
//       await auth.updateProfile(data);
//       reset();
//       onExit();
//     } catch (error) {
//       enqueueSnackbar(
//         `Failed to update profile. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
//         {
//           variant: 'error',
//           persist: true,
//         }
//       );
//       console.error(error);
//       throw error;
//     }
//   };

//   return (
//     <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={3}>
//         {methods.getValues().avatarUrl && (
//           <Grid item xs={12} md={4}>
//             <Card sx={{ py: 5, px: 3 }}>
//               <Box sx={{ mb: 5 }}>
//                 <RHFUploadAvatar name="avatarUrl" maxSize={3145728} disabled />
//               </Box>
//             </Card>
//           </Grid>
//         )}

//         <Grid item xs={12} md={8}>
//           <Card sx={{ p: 2 }}>
//             <Box
//               sx={{
//                 display: 'grid',
//                 columnGap: 2,
//                 rowGap: 3,
//                 gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
//               }}
//             >
//               <RHFTextField name="name" label="Name (Required)" />
//               <RHFTextField name="company" label="Company (Required)" />
//               <RHFTextField name="role" label="Role (Required)" />
//               <RHFTextField name="email" label="Email (Required)" />
//               <RHFTextField name="phoneNumber" label="Phone Number (Required)" />
//               <RHFTextField
//                 name="linkedin"
//                 label="Linkedin URL"
//                 helperText="e.g. https://linkedin.com/in/rizhaow"
//               />
//               <RHFTextField name="telegram" label="Telegram Username" helperText="e.g. rizhaow" />
//             </Box>

//             <Stack alignItems="flex-end" sx={{ my: 4 }}>
//               <LoadingButton
//                 sx={{ height: 50 }}
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 loading={isSubmitting}
//               >
//                 {!isEdit ? 'Next' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

export default function UserNewEditForm() {
  return <></>
}