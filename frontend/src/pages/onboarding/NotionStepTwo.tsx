// import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
// @mui
import { Button, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// // sections
// import Iconify from '../../components/Iconify';
// import { useEffect } from 'react';
// import authorizedAxios from '../../utils/authorizedAxios';
// import { BE_API } from '../../utils/api';
// import { useSnackbar } from 'notistack';
// import { SUPPORT_EMAIL } from '../../config';
// import notionGif from '../../assets/how_connect_notion.gif';
// import LoadingScreen from '../../components/LoadingScreen';
// import { PATH_DASHBOARD } from '../../routes/paths';
// import useAuth from '../../hooks/useAuth';

// // ----------------------------------------------------------------------

// export default function OnboardingNotionStepTwo() {
//   const auth = useAuth();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const notionToken = searchParams.get('code');
//   const { enqueueSnackbar } = useSnackbar();
//   const navigate = useNavigate();

//   const authorizeNotion = async () => {
//     try {
//       await authorizedAxios.post(BE_API.auth.notion, { oAuthToken: notionToken });
//       await auth.refetchUser();
//       navigate(PATH_DASHBOARD.general.jios);
//     } catch (err) {
//       enqueueSnackbar(
//         `Failed to authenticate Notion page. Please try again. If it still fails, email support ${SUPPORT_EMAIL} 🧒.`,
//         {
//           variant: 'error',
//           persist: true,
//         }
//       );
//       console.error(`notionToken: ${notionToken}`, err);
//       // Navigate back to current page without search params for Notion re-authentication to work
//       navigate(location.pathname);
//     }
//   };

//   // Post the notion code to api endpoint
//   useEffect(() => {
//     if (notionToken) {
//       authorizeNotion();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [notionToken]);

//   if (notionToken) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Page title="Onboarding: Choose Notion Page">
//       <Container sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <div style={{ maxWidth: 550 }}>
//           <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
//             Click the button at the bottom and choose the Notion Page: <em>Connectly - Template</em>
//           </Typography>
//           <img src={notionGif} alt="How to connect notion" />
//           <Button
//             fullWidth
//             size="large"
//             color="primary"
//             variant="contained"
//             // Redirects back to current url with notion token
//             href={`https://api.notion.com/v1/oauth/authorize?client_id=8973ec7b-702c-430a-b93e-1c95dda41ed9&redirect_uri=${window.location.href}&response_type=code&owner=user`}
//             sx={{ mt: 3, mb: 10 }}
//           >
//             <Typography variant="button">Choose Notion Page</Typography>
//           </Button>
//         </div>
//       </Container>
//     </Page>
//   );
// }

export default function OnboardingNotionStepTwo() {
  return (
    <Page title="Onboarding: Choose Notion Page">
      <Typography>Here is Notion Onboarding step two.</Typography>
    </Page>
  );
}