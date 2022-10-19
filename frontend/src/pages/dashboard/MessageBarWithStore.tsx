import MessageBar from '../../components/MessageBar';
import { useDispatch, useSelector } from '../../store';
import { closeMessageBar } from '../../store/reducers/messageBar';

export default function MessageBarWithStore() {
  const dispatch = useDispatch();
  const { show, icon, message, enableCloseButton, loading } = useSelector(
    (state) => state.messageBar
  );

  const handleClose = () => {
    dispatch(closeMessageBar());
  };

  return (
    <MessageBar
      show={show}
      icon={icon}
      message={message}
      loading={loading}
      onClose={enableCloseButton ? handleClose : undefined}
    />
  );
}
