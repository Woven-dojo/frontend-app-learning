import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { Toast } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform/config';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { Header, Footer } from '@woven-dojo/dojo-frontend-common/dist/components';
import PageLoading from '../generic/PageLoading';
import { getAccessDeniedRedirectUrl } from '../shared/access';
import { useModel } from '../generic/model-store';

import genericMessages from '../generic/messages';
import messages from './messages';
import LoadedTabPage from './LoadedTabPage';
import { setCallToActionToast } from '../course-home/data/slice';

const NoTitleHeader = () => {
  const { BASE_URL } = getConfig();
  return (
    <div className="container">
      <Header
        logoDestination={`${BASE_URL}/dashboard`}
        logoDestinationTarget="_self"
        mainMenu={[
          {
            label: 'Sign In',
            href: `${BASE_URL}/login?next=${encodeURIComponent(window.location.href)}`,
            target: '_self',
          },
        ]}
      />
    </div>
  );
};

function TabPage({ intl, ...props }) {
  const {
    activeTabSlug,
    courseId,
    courseStatus,
    metadataModel,
    unitId,
  } = props;
  const {
    toastBodyLink,
    toastBodyText,
    toastHeader,
  } = useSelector(state => state.courseHome);
  const dispatch = useDispatch();
  const {
    courseAccess,
    number,
    org,
    start,
    title,
  } = useModel(metadataModel, courseId);
  const { BASE_URL, LOGOUT_URL } = getConfig();
  const authenticatedUser = getAuthenticatedUser();

  if (courseStatus === 'loading') {
    return (
      <>
        <NoTitleHeader />
        <PageLoading
          srMessage={intl.formatMessage(messages.loading)}
        />
        <Footer left={`Copyright ${new Date().getFullYear()} Dojo. All rights reserved`} />
      </>
    );
  }

  if (courseStatus === 'denied') {
    const redirectUrl = getAccessDeniedRedirectUrl(courseId, activeTabSlug, courseAccess, start, unitId);
    if (redirectUrl) {
      return (<Redirect to={redirectUrl} />);
    }
  }

  // Either a success state or a denied state that wasn't redirected above (some tabs handle denied states themselves,
  // like the outline tab handling unenrolled learners)
  if (courseStatus === 'loaded' || courseStatus === 'denied') {
    return (
      <>
        <Toast
          action={toastBodyText ? {
            label: toastBodyText,
            href: toastBodyLink,
          } : null}
          closeLabel={intl.formatMessage(genericMessages.close)}
          onClose={() => dispatch(setCallToActionToast({ header: '', link: null, link_text: null }))}
          show={!!toastHeader}
        >
          {toastHeader}
        </Toast>
        <div className="container">
          {authenticatedUser ? (
            <Header
              logoDestination={`${BASE_URL}/dashboard`}
              logoDestinationTarget="_self"
              username={authenticatedUser.username}
              title={`${org} ${number}`}
              subtitle={title}
              userMenu={[
                {
                  label: 'Dashboard',
                  href: `${BASE_URL}/dashboard`,
                },
                {
                  label: 'Profile',
                  href: `${BASE_URL}/u/${authenticatedUser.username}`,
                },
                {
                  label: 'Account',
                  href: `${BASE_URL}/account/settings`,
                },
                {
                  label: 'Logout',
                  href: LOGOUT_URL,
                },
              ]}
            />
          ) : (
            <Header
              logoDestination={`${BASE_URL}/dashboard`}
              logoDestinationTarget="_self"
              title={`${org} ${number}`}
              subtitle={title}
              mainMenu={[
                {
                  label: 'Sign In',
                  href: `${BASE_URL}/login?next=${encodeURIComponent(window.location.href)}`,
                  target: '_self',
                },
              ]}
            />
          )}
        </div>
        <LoadedTabPage {...props} />
        <Footer left={`Copyright ${new Date().getFullYear()} Dojo. All rights reserved`} />
      </>
    );
  }

  // courseStatus 'failed' and any other unexpected course status.
  return (
    <>
      <NoTitleHeader />
      <p className="text-center py-5 mx-auto" style={{ maxWidth: '30em' }}>
        {intl.formatMessage(messages.failure)}
      </p>
      <Footer left={`Copyright ${new Date().getFullYear()} Dojo. All rights reserved`} />
    </>
  );
}

TabPage.defaultProps = {
  courseId: null,
  unitId: null,
};

TabPage.propTypes = {
  activeTabSlug: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  courseId: PropTypes.string,
  courseStatus: PropTypes.string.isRequired,
  metadataModel: PropTypes.string.isRequired,
  unitId: PropTypes.string,
};

export default injectIntl(TabPage);
