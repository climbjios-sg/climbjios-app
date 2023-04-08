import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';

const useTallyUserResearchPopup = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return () =>
    enqueueSnackbar('Hey, we need your help to serve you better!', {
      variant: 'info',
      persist: true,
      action: (key) => (
        <>
          {/* ‹button data-tally-open="3xrNNk" data-tally-emoji-text="N data-tally-emoji-animation="wave" ›Click me</button> */}
          <Button
            // href="https://tally.so#tally-open-3xrNNk&tally-emoji-text=👋&tally-emoji-animation=wave"
            data-tally-open="3xrNNk"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            Let's go!
          </Button>
          <Button
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            Later
          </Button>
        </>
      ),
    });
};

export default useTallyUserResearchPopup;
