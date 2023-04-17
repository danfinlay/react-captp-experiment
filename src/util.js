import { useState, useEffect, useCallback } from 'react';
import { subscribeEach, observeIteration, makeSubscriptionKit } from '@agoric/notifier';

// supports both "subscription" and "subscriber" APIs

export const useAsync = (asyncFn, dependees) => {
  const memoizedAsync = useCallback(asyncFn, dependees);
  const [ value, setValue ] = useState();
  const [ error, setError ] = useState();

  useEffect(() => {
    memoizedAsync()
    .then((value) => {
      setValue(value);
    })
    .catch((reason) => {
      setError(reason);
    });
  }, [memoizedAsync]);

  return [value, error];
}

export const useAgoricSubscription = (subscription) => {
  const [ value, setLocalValue ] = useState();

  useEffect(() => {
    // allow the subscription to be set later
    if (!subscription) {
      return;
    }
    // adapt to remote subscription of unknown type (notifier, subscription)
    const {
      publication: adapterPublication,
      subscription: adapterSubscription
    } = makeSubscriptionKit();
    observeIteration(subscription, adapterPublication)
    .catch((_reason) => {
      // ignore error from writing to finished adapterPublication
    });

    (async () => {
      for await (const name of adapterSubscription) {
        setLocalValue(name);
      }
    })();

    // cleanup subscription
    return () => {
      adapterPublication.finish();
    }
  }, [subscription]);

  return value;
}

export const useAgoricSubscriber = (subscriber) => {
  const [ value, setValue ] = useState();

  useEffect(() => {
    // allow the subscriber to be set later
    if (!subscriber) {
      return;
    }
    // update local value on every update
    let stop = false;
    (async () => {
      for await (const name of subscribeEach(subscriber)) {
        if (stop) {
          return;
        }
        setValue(name);
      }
    })();
    // cleanup subscriber
    return () => {
      stop = true;
    }
  }, [subscriber]);

  return value;
}

export const useAgoricSubscriptionGetter = (subscriptionGetter, dependees) => {
  const [ sub, subError ] = useAsync(
    subscriptionGetter,
    dependees,
  );
  const name = useAgoricSubscription(sub);
  return [name, subError];
}

export const useAgoricSubscriberGetter = (subscriberGetter, dependees) => {
  const [ sub, subError ] = useAsync(
    subscriberGetter,
    dependees,
  );
  const name = useAgoricSubscriber(sub);
  return [name, subError];
}
