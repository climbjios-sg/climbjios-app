// @mui
import { Button, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import notionGif from '../../assets/how_to_duplicate_notion.gif';

// ----------------------------------------------------------------------

const NOTION_TEMPLATE_URL =
  'https://azeemvasanwala.notion.site/Connectly-Template-193ae7e6ffc8458d9f1359417c1d4a1c';

export default function OnboardingNotionStepOne() {
  return (
    <Page title="Onboarding: Duplicate Notion Template">
      <Container sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: 550 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ my: 1 }}>
            Click the button at the bottom and duplicate the Connectly Notion template into your
            Notion account.
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
            Come back to Connectly when you are done 😉
          </Typography>
          <img src={notionGif} alt="How to clone notion template tutorial" />
          <Typography variant="subtitle2" gutterBottom sx={{ my: 2, mb: 1, maxHeight: 500 }}>
            Ready to go? Click the button below 👇
          </Typography>
          {/* GIF */}
          <Button
            sx={{ mt: 2, mb: 10 }}
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            // Redirects back to current url with notion token
            href={NOTION_TEMPLATE_URL}
          >
            <Typography variant="button">Go to Notion Template</Typography>
          </Button>
        </div>
      </Container>
    </Page>
  );
}
