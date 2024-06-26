import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchSubscription, postSubscription, deleteSubscription } from "../api/NewsAPI";
import { NewsContext } from "../components/provider/NewsProvider";
import { useNavigation } from '../components/provider/NavigationProvider';
import { MENU_STATES, VIEW_STATES } from '../constants';
import useSubscribeStore from './useSubscribeStore';

const SNACK_BAR_DURATION = 5000;

const useSubscription = () => {
  const queryClient = useQueryClient();
  const { setMenuSelected, setViewSelected } = useNavigation();
  const [, setNewsState] = useContext(NewsContext);
  const { setShowSnackBar, setShowAlert } = useSubscribeStore();

  const { data: subscription } = useQuery("subscription", fetchSubscription, {
    onSuccess: (data) => {
      setNewsState((prevState) => ({ ...prevState, subscription: data }));
    },
  });

  const postSubscriptionMutation = useMutation(postSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries("subscription");
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
        setMenuSelected(MENU_STATES.subscribedPress);
        setViewSelected(VIEW_STATES.list);
      }, SNACK_BAR_DURATION);
    }
  });

  const deleteSubscriptionMutation = useMutation(deleteSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries("subscription");
      setShowAlert(false);
    }
  });

  return { subscription, postSubscriptionMutation, deleteSubscriptionMutation };
};

export default useSubscription;