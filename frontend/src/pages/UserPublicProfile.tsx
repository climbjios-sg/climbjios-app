import { useState, useEffect } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Box } from '@mui/material';
// @types
import { User } from '../@types/user';
// components
import Iconify from '../components/Iconify';
import {
  ProfilePhoto,
  ProfileAbout,
  ProfileSocialInfo,
  ProfileMap,
} from '../sections/@dashboard/user/profile';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MAPBOX_API, SUPPORT_EMAIL } from '../config';
// @ts-ignore
import FileSaver from 'file-saver';
import useAuth from '../hooks/useAuth';
import { BE_API } from '../utils/api';
import authorizedAxios from '../utils/authorizedAxios';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../routes/paths';
import Page from '../components/Page';

export default function UserPublicProfile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isSaving, setIsSaving] = useState(false);
  const [whereWeMet, setWhereWeMet] = useState('');
  const [whereWeMetLatitude, setWhereWeMetLatitude] = useState('');
  const [whereWeMetLongitude, setWhereWeMetLongitude] = useState('');
  const [searchParams] = useSearchParams();
  const profile = {
    avatarUrl: searchParams.get('avatarUrl') || '',
    email: searchParams.get('email') || '',
    name: searchParams.get('name') || '',
    company: searchParams.get('company') || '',
    role: searchParams.get('role') || '',
    phoneNumber: searchParams.get('phoneNumber') || '',
    linkedin: searchParams.get('linkedin') || '',
    telegram: searchParams.get('telegram') || '',
  } as User;

  // @ts-ignore
  const getBase64FromUrl = async (url): Promise<string> => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result?.toString();
        if (base64data) {
          // Remove base64 format identifiers
          resolve(base64data.split(',')[1]);
        } else {
          resolve('');
        }
      };
    });
  };

  const addWhereWeMet = async (longitude: string, latitude: string) => {
    setWhereWeMetLongitude(longitude);
    setWhereWeMetLatitude(latitude);

    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API}`
    );

    if (data.features.length) {
      setWhereWeMet(data.features[0].place_name);
    }
  };

  //   const addContactVcard = async () => {
  //     const b64 = await getBase64FromUrl(profile.avatarUrl);

  //     const file = new Blob(
  //       [
  //         `BEGIN:VCARD
  // VERSION:3.0
  // N:${''};${profile.name};;;
  // FN:${profile.name}
  // ORG:${profile.company}
  // TITLE:${profile.role};
  // EMAIL;type=INTERNET;type=pref:${profile.email}
  // TEL;type=CELL;type=VOICE;type=pref:${profile.phoneNumber}

  // item1.URL:${profile.linkedin}
  // item1.X-ABLabel:LinkedIn
  // item2.URL:https://t.me/${profile.telegram}
  // item2.X-ABLabel:Telegram
  // NOTE:${
  //           whereWeMet ? `Where We Met: ${whereWeMet}. ` : ''
  //         }Scanned from the Connectly app. Make your own Connectly business card here: wwww.connectly.me
  // PHOTO;TYPE=JPEG;ENCODING=BASE64:${b64}
  // END:VCARD
  // `,
  //       ],
  //       { type: 'text/vcard;charset=utf-8' }
  //     );
  //     FileSaver.saveAs(file, `${profile.name}.vcf`, true);
  //   };

  const handleSave = async () => {
    // Add contact if user is authenticated
    // if (auth.isAuthenticated()) {
    //   setIsSaving(true);
    //   try {
    //     await authorizedAxios.post(BE_API.contacts, {
    //       name: profile.name,
    //       company: profile.company,
    //       role: profile.role,
    //       email: profile.email,
    //       phoneNumber: profile.phoneNumber,
    //       linkedInUrl: profile.linkedin,
    //       linkedInAvatarImage: profile.avatarUrl,
    //       telegramUsername: profile.telegram,
    //       meetingLocation: whereWeMet,
    //       meetingLatLong:
    //         whereWeMetLatitude && whereWeMetLongitude
    //           ? `${whereWeMetLatitude},${whereWeMetLongitude}`
    //           : '',
    //     });
    //     enqueueSnackbar('Added contact');
    //     navigate(PATH_DASHBOARD.general.app + '?tab=Contacts');
    //   } catch (err) {
    //     enqueueSnackbar(
    //       `Failed to save contact. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
    //       {
    //         variant: 'error',
    //         persist: true,
    //       }
    //     );
    //   } finally {
    //     setIsSaving(true);
    //   }
    // }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // addContactVcard();
  };

  useEffect(() => {
    auth.loginFromSession();
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        addWhereWeMet(longitude.toString(), latitude.toString());
      }, console.error);
    }
  }, []);

  return (
    <Page title={`${profile.name} | Connectly`}>
      <Box
        sx={{
          pt: 5,
          pb: 20,
          px: 2,
          flexDirection: 'row',
          justifyContent: 'center',
          display: 'flex',
          maxWidth: 500,
          margin: '0 auto',
        }}
      >
        <Stack spacing={3} sx={{ width: '100%' }}>
          <ProfilePhoto profile={profile} />
          {/* <ProfileAbout profile={profile} /> */}
          <ProfileSocialInfo profile={profile} disableLinks />
          {whereWeMet && <ProfileMap whereWeMet={whereWeMet} />}
        </Stack>
        <Box
          sx={{
            position: 'fixed',
            bottom: 48,
            right: 0,
            zIndex: 100,
            width: '100%',
            px: 3,
            height: 32,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* <LoadingButton
            loading={isSaving}
            fullWidth
            variant="contained"
            size="large"
            sx={{ borderRadius: 10, maxWidth: '380px' }}
            onClick={() => {
              handleSave();
            }}
          >
            <Iconify icon={'eva:person-add-outline'} width={24} height={24} sx={{ mr: 1 }} />
            <Typography variant="button">Save Contact</Typography>
          </LoadingButton> */}
        </Box>
      </Box>
    </Page>
  );
}
