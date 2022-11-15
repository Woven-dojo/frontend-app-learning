import React, { useMemo } from 'react';
import { useAlert } from '../../generic/user-messages';
import { useModel } from '../../generic/model-store';

const AccessExpirationAlert = React.lazy(() => import('./AccessExpirationAlert'));
const AccessExpirationMasqueradeBanner = React.lazy(() => import('./AccessExpirationMasqueradeBanner'));

function useAccessExpirationAlert(accessExpiration, courseId, org, userTimezone, topic, analyticsPageName) {
  const isVisible = accessExpiration && !accessExpiration.masqueradingExpiredCourse; // If it exists, show it.

  useAlert(isVisible, {
    code: 'clientAccessExpirationAlert',
    payload: useMemo(
      () => ({
        accessExpiration,
        courseId,
        org,
        userTimezone,
        analyticsPageName,
      }),
      [accessExpiration, courseId, org, userTimezone, analyticsPageName],
    ),
    topic,
  });

  return { clientAccessExpirationAlert: AccessExpirationAlert };
}

export function useAccessExpirationMasqueradeBanner(courseId, tab) {
  const {
    userTimezone,
  } = useModel('courseHomeMeta', courseId);
  const {
    accessExpiration,
  } = useModel(tab, courseId);

  const isVisible = accessExpiration && accessExpiration.masqueradingExpiredCourse;
  const expirationDate = accessExpiration && accessExpiration.expirationDate;

  useAlert(isVisible, {
    code: 'clientAccessExpirationMasqueradeBanner',
    payload: useMemo(() => ({ expirationDate, userTimezone }), [expirationDate, userTimezone]),
    topic: 'instructor-toolbar-alerts',
  });

  return { clientAccessExpirationMasqueradeBanner: AccessExpirationMasqueradeBanner };
}

export default useAccessExpirationAlert;
