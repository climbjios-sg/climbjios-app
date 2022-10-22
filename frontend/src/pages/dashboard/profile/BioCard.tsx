// @mui
import { Card, Grid, List, ListItem, Typography } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
// types
import { User } from 'src/@types/user';
//
import { formatHeightReach, formatHighestBoulderingGrade, formatHighestLeadAndTopRopeGrade } from 'src/utils/formatString';

interface BioProps {
  data: User;
}

export default function BioCard({ data }: BioProps ) {
  return (
    <Card sx={{ textAlign: 'left', px: 3, pb: 3 }}>
      <Typography variant="h4" sx={{ mt: 3 }}>
        {"Bio"}
      </Typography>

      <Typography variant="body1" sx={{ my: 2 }}>
        {data.bio || "I love to climb 👊 I have been climbing for a good 5 years. Join me!"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Iconify icon='game-icons:body-height' height={15} width={15} color='blue' />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1">
            {data.height && data.reach
              ? formatHeightReach(data.height, data.reach)
              : "178cm (Height) | +5cm (Reach)"}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Iconify icon='icon-park:certificate' height={15} width={15} />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1">
            {data.sncsCertification || "SCNS Level 2"}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Iconify icon='fluent-emoji-flat:rock' height={15} width={15} />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1">
            {data.highestBoulderingGrade && data.highestBoulderingGrade.name
              ? formatHighestBoulderingGrade(data.highestBoulderingGrade.name)
              : "Bouldering v7"}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Iconify icon='fluent-emoji:man-climbing-medium-light' height={15} width={15} />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1">
            {data.highestLeadClimbingGrade && data.highestTopRopeGrade.name
              ? formatHighestLeadAndTopRopeGrade(data.highestLeadClimbingGrade, data.highestTopRopeGrade.name)
              : "Lead 7A | Top Rope 7b"}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Iconify icon='bi:house-heart-fill' height={15} width={15} color='#CC6CC2' />
        </Grid>
        <Grid item xs={11}>
          <List sx={{ p: 0 }}>
            {data.favouriteGyms && data.favouriteGyms.length > 0
              ? data.favouriteGyms.map((gym) => (
              <ListItem key={gym.id} sx={{ p: 0 }}>
                <Typography variant="body1">
                  {gym.name}
                </Typography>
              </ListItem>
            ))
            : <ListItem sx={{ p: 0 }}>
                <Typography variant="body1">
                  No favourite gyms
                </Typography>
              </ListItem>
            }
          </List>
        </Grid>
      </Grid>
    </Card>
  );
}