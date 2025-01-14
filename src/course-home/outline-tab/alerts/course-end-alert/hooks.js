/* eslint-disable import/prefer-default-export */
import React, { useMemo } from 'react';
import { useAlert } from '../../../../generic/user-messages';
import { useModel } from '../../../../generic/model-store';

const CourseEndAlert = React.lazy(() => import('./CourseEndAlert'));

// period of time (in ms) before end of course during which we alert
const WARNING_PERIOD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export function useCourseEndAlert(courseId) {
  const {
    isEnrolled,
  } = useModel('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks,
    },
    userTimezone,
  } = useModel('outline', courseId);

  const endBlock = courseDateBlocks.find(b => b.dateType === 'course-end-date');
  const endDate = endBlock ? new Date(endBlock.date) : null;
  const delta = endBlock ? endDate - new Date() : 0;
  const isVisible = isEnrolled && endBlock && delta > 0 && delta < WARNING_PERIOD_MS;
  const description = endBlock && endBlock.description;
  const endDateParam = endBlock && endBlock.date;

  useAlert(isVisible, {
    code: 'clientCourseEndAlert',
    payload: useMemo(
      () => ({ description, endDate: endDateParam, userTimezone }),
      [description, endDateParam, userTimezone],
    ),
    topic: 'outline-course-alerts',
  });

  return {
    clientCourseEndAlert: CourseEndAlert,
  };
}
