// import { useState, useEffect } from 'react';
// @mui
import { Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// import useTabs from '../../hooks/useTabs';
// components
import Page from '../../components/Page';
// import Iconify from '../../components/Iconify';
// // sections
// import MyQR from './MyQR';
// import Contacts from './Contacts';
// import AddContact from './AddContact';
// import { Contact } from '../../@types/user';
// import authorizedAxios from '../../utils/authorizedAxios';
// import { apiContactToContact, BE_API } from '../../utils/api';
// import useLocalStorage from '../../hooks/useLocalStorage';
// import { useSearchParams } from 'react-router-dom';

// // ----------------------------------------------------------------------

// export default function MainApp() {
//   const auth = useAuth();
//   const [searchParams] = useSearchParams();
//   const { currentTab, onChangeTab, setCurrentTab } = useTabs('My QR');
//   const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', []);
//   const [loadingContacts, setLoadingContacts] = useState(false);
//   const [findContacts, setFindContacts] = useState('');

//   const handleFindContacts = (value: string) => {
//     setFindContacts(value);
//   };

//   const handleSubmitAddContact = async (data: Contact) => {
//     await authorizedAxios.post(BE_API.contacts, {
//       name: data.name,
//       company: data.company,
//       role: data.role,
//       email: data.email,
//       phoneNumber: data.phoneNumber,
//       linkedInUrl: data.linkedin,
//       telegramUsername: data.telegram,
//       meetingLocation: data.whereWeMet,
//       meetingLatLong:
//         data.whereWeMetLatitude && data.whereWeMetLongitude
//           ? `${data.whereWeMetLatitude},${data.whereWeMetLongitude}`
//           : '',
//     });
//     await fetchContacts();
//     setCurrentTab(DASHBOARD_TABS[2].value);
//   };

//   const DASHBOARD_TABS = [
//     {
//       value: 'My QR',
//       icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
//       // auth user will always not be null here
//       component: <>{auth.user && <MyQR profile={auth.user} />}</>,
//     },
//     {
//       value: 'Add Contact',
//       icon: <Iconify icon={'eva:person-add-fill'} width={20} height={20} />,
//       component: <AddContact onSubmit={handleSubmitAddContact} />,
//     },
//     {
//       value: 'Contacts',
//       icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
//       component: (
//         <Contacts
//           loading={loadingContacts}
//           onRefresh={() => {
//             handleRefresh();
//           }}
//           contacts={contacts}
//           findContacts={findContacts}
//           onFindContacts={handleFindContacts}
//         />
//       ),
//     },
//   ];

//   const handleRefresh = async () => {
//     setLoadingContacts(true);
//     await fetchContacts();
//     setLoadingContacts(false);
//   };

//   const fetchContacts = async () => {
//     const { data: beContacts } = await authorizedAxios.get(BE_API.contacts);
//     const contacts = beContacts.map(apiContactToContact);
//     setContacts(contacts);
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentTab]);

//   useEffect(() => {
//     const tab = searchParams.get('tab') || 'My QR';
//     setCurrentTab(tab);
//   }, []);

//   return (
//     <Page
//       title="Connectly - Streamline your networking. Powered by Notion."
//       sx={{ background: '#fafafa' }}
//     >
//       <Container>
//         {DASHBOARD_TABS.map((tab) => {
//           const isMatched = tab.value === currentTab;
//           return isMatched && <Box key={tab.value}>{tab.component}</Box>;
//         })}
//       </Container>
//       <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//         <BottomNavigation showLabels value={currentTab} onChange={onChangeTab}>
//           {DASHBOARD_TABS.map((tab) => (
//             <BottomNavigationAction
//               key={tab.value}
//               label={tab.value}
//               icon={tab.icon}
//               value={tab.value}
//             />
//           ))}
//         </BottomNavigation>
//       </Paper>
//     </Page>
//   );
// }

export default function MainApp() {
  const auth = useAuth();
  
  return (
    <Page
      title="ClimbJios - The social network for climbers."
      sx={{ background: '#fafafa' }}
    >
      <p>Main dashboard placeholder</p>
      <Button
        variant="outlined"
        onClick={() => {
          auth.logout();
        }}
      >
        Logout
      </Button>
    </Page>
  );
}