import React, { useMemo } from 'react';
import { useAlert } from '../../generic/user-messages';
import { useModel } from '../../generic/model-store';

const CourseStartAlert = React.lazy(() => import('./CourseStartAlert'));
const CourseStartMasqueradeBanner = React.lazy(() => import('./CourseStartMasqueradeBanner'));

function isStartDateInFuture(courseId) {
  const {
    start,
  } = useModel('courseHomeMeta', courseId); // eslint-disable-line react-hooks/rules-of-hooks

  const today = new Date();
  const startDate = new Date(start);
  return startDate > today;
}

function useCourseStartAlert(courseId) {
  const {
    isEnrolled,
  } = useModel('courseHomeMeta', courseId);

  const isVisible = isEnrolled && isStartDateInFuture(courseId);

  useAlert(isVisible, {
    code: 'clientCourseStartAlert',
    payload: useMemo(() => ({ courseId }), [courseId]),
    topic: 'outline-course-alerts',
  });

  return {
    clientCourseStartAlert: CourseStartAlert,
  };
}

export function useCourseStartMasqueradeBanner(courseId, tab) {
  const {
    isMasquerading,
  } = useModel('courseHomeMeta', courseId);

  const isVisible = isMasquerading && tab === 'progress' && isStartDateInFuture(courseId);

  useAlert(isVisible, {
    code: 'clientCourseStartMasqueradeBanner',
    payload: useMemo(() => ({ courseId }), [courseId]),
    topic: 'instructor-toolbar-alerts',
  });

  return {
    clientCourseStartMasqueradeBanner: CourseStartMasqueradeBanner,
  };
}

export default useCourseStartAlert;
