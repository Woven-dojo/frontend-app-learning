import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform/config';

import { Header } from '@woven-dojo/dojo-frontend-ui';
import PageLoading from '../../generic/PageLoading';
import { unsubscribeFromCourseGoal } from '../data/api';

import messages from './messages';
import ResultPage from './ResultPage';

function GoalUnsubscribe({ intl }) {
  const { token } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { BASE_URL } = getConfig();

  // We don't need to bother with redux for this simple page. We're not sharing state with other pages at all.
  useEffect(() => {
    unsubscribeFromCourseGoal(token)
      .then(
        (result) => {
          setIsLoading(false);
          setData(result.data);
        },
        () => {
          setIsLoading(false);
          setError(true);
        },
      );// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // deps=[] to only run once

  return (
    <>
      <Header logoDestination={`${BASE_URL}/dashboard`} logoDestinationTarget="_self" />
      <main id="main-content" className="container my-5 text-center">
        {isLoading && (
          <PageLoading srMessage={`${intl.formatMessage(messages.loading)}`} />
        )}
        {!isLoading && (
          <ResultPage error={error} courseTitle={data.courseTitle} />
        )}
      </main>
    </>
  );
}

GoalUnsubscribe.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(GoalUnsubscribe);
