// import { MouseEventHandler, useState, useEffect } from 'react';
// // @mui
// import {
//   Box,
//   Grid,
//   Card,
//   Avatar,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Stack,
//   Button,
//   useMediaQuery,
// } from '@mui/material';
// // @types
// import { Contact } from '../../@types/user';
// // components
// import Iconify from '../../components/Iconify';
// import InputStyle from '../../components/InputStyle';
// import SearchNotFound from '../../components/SearchNotFound';
// import {
//   ProfileAbout,
//   ProfileSocialInfo,
//   ProfilePhoto,
//   ProfileMap,
// } from '../../sections/@dashboard/user/profile';

// // ----------------------------------------------------------------------

// type Props = {
//   contacts: Contact[];
//   onRefresh: () => void;
//   findContacts: string;
//   onFindContacts: (value: string) => void;
//   loading: boolean;
// };

// export default function Contacts({
//   contacts,
//   findContacts,
//   onFindContacts,
//   onRefresh,
//   loading,
// }: Props) {
//   const md = useMediaQuery('(min-width:600px)');
//   const [scrollY, setScrollY] = useState(0);
//   const [displayFullContact, setDisplayFullContact] = useState<Contact | null>(null);
//   const friendFiltered = applyFilter(contacts, findContacts);

//   const isNotFound = friendFiltered.length === 0;

//   if (displayFullContact) {
//     return (
//       <Grid container justifyContent={'center'} sx={{ background: 'white', pb: md ? 80 : 20 }}>
//         <Grid item xs={12} md={8}>
//           <ContactDetails
//             profile={displayFullContact}
//             onExit={() => {
//               setDisplayFullContact(null);
//               window.scrollTo(0, scrollY);
//             }}
//           />
//         </Grid>
//       </Grid>
//     );
//   }

//   return (
//     <Box sx={{ pt: 5, pb: 80 }}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Typography variant="h4" sx={{ mb: 3 }}>
//           Contacts
//         </Typography>
//         <Button
//           sx={{
//             height: 32,
//           }}
//           variant="outlined"
//           onClick={() => {
//             onRefresh();
//           }}
//         >
//           Refresh
//         </Button>
//       </div>
//       <InputStyle
//         value={findContacts}
//         onChange={(event) => onFindContacts(event.target.value)}
//         placeholder="Search Contacts..."
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Iconify
//                 icon={'eva:search-fill'}
//                 sx={{ color: 'text.disabled', width: 20, height: 20 }}
//               />
//             </InputAdornment>
//           ),
//         }}
//         sx={{ mb: 5, width: '100%' }}
//       />

//       {loading ? (
//         <Box flexDirection={'row'} justifyContent="center">
//           <Typography variant="body1" textAlign="center">
//             Loading...
//           </Typography>
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           {friendFiltered.map((friend) => (
//             <Grid key={friend.id} item xs={12} md={4}>
//               <ContactCard
//                 profile={friend}
//                 onClick={() => {
//                   setScrollY(window.scrollY);
//                   setDisplayFullContact(friend);
//                 }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {isNotFound && (
//         <Box sx={{ mt: 5 }}>
//           <SearchNotFound searchQuery={findContacts} />
//         </Box>
//       )}
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// type ContactCardProps = {
//   profile: Contact;
//   onClick: MouseEventHandler<HTMLDivElement>;
// };

// function ContactCard({ profile, onClick }: ContactCardProps) {
//   const { name, role, company, avatarUrl } = profile;

//   return (
//     <Card sx={{ display: 'flex', alignItems: 'center', p: 3, cursor: 'pointer' }} onClick={onClick}>
//       <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />

//       <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
//         <Typography variant="subtitle2" noWrap>
//           {name}
//         </Typography>

//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Iconify
//             icon={'eva:briefcase-outline'}
//             sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
//           />
//           <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//             <span>{role}</span>
//             <span> at </span>
//             <span>{company}</span>
//           </Typography>
//         </Box>
//       </Box>
//     </Card>
//   );
// }

// // ----------------------------------------------------------------------

// type ContactDetailsProps = {
//   profile: Contact;
//   onExit: () => void;
// };

// function ContactDetails({ profile, onExit }: ContactDetailsProps) {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <Grid container spacing={3} sx={{ pb: 20, pt: 3, background: 'white' }}>
//       <Grid item xs={12} md={12} spacing={3}>
//         <Stack spacing={3}>
//           <Stack direction="row-reverse">
//             <IconButton onClick={onExit}>
//               <Iconify icon={'eva:close-outline'} width={24} height={24} />
//             </IconButton>
//           </Stack>
//           <ProfilePhoto profile={profile} />
//           <Stack spacing={3} justifyContent="center" direction="row">
//             <Button
//               variant="outlined"
//               sx={{ flexShrink: 0, borderColor: 'black' }}
//               href={profile.notionUrl}
//             >
//               <Iconify icon={'cib:notion'} width={18} height={18} sx={{ mx: 1 }} />
//               <Typography variant="button">View in Notion</Typography>
//             </Button>
//           </Stack>
//           <ProfileAbout profile={profile} />
//           <ProfileSocialInfo profile={profile} />
//           {profile.whereWeMet && <ProfileMap whereWeMet={profile.whereWeMet} />}
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// }

// // ----------------------------------------------------------------------

// function applyFilter(array: Contact[], query: string) {
//   if (query) {
//     return array.filter((friend) => friend.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }

//   return array;
// }


export default function Contacts() {
  return (
    <></>
  );
}