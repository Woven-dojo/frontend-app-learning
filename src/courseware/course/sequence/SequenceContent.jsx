import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import PageLoading from '../../../generic/PageLoading';
import { useModel } from '../../../generic/model-store';

import messages from './messages';
import Unit from './Unit';

const ContentLock = React.lazy(() => import('./content-lock'));

function SequenceContent({
  gated,
  intl,
  courseId,
  sequenceId,
  unitId,
  unitLoadedHandler,
  notificationTrayVisible,
  /** [MM-P2P] Experiment */
  mmp2p,
}) {
  const unit = useModel('units', unitId);
  const sequence = useModel('sequences', sequenceId);

  // Go back to the top of the page whenever the unit or sequence changes.
  useEffect(() => {
    global.scrollTo(0, 0);
  }, [sequenceId, unitId]);

  if (gated) {
    return (
      <Suspense
        fallback={(
          <PageLoading
            srMessage={intl.formatMessage(messages['learn.loading.content.lock'])}
          />
        )}
      >
        <ContentLock
          courseId={courseId}
          sequenceTitle={sequence.title}
          prereqSectionName={sequence.gatedContent.prereqSectionName}
          prereqId={sequence.gatedContent.prereqId}
        />
      </Suspense>
    );
  }

  if (!unitId || !unit) {
    return (
      <div>
        {intl.formatMessage(messages['learn.sequence.no.content'])}
      </div>
    );
  }

  return (
    <Unit
      courseId={courseId}
      format={sequence.format}
      key={unitId}
      id={unitId}
      onLoaded={unitLoadedHandler}
      notificationTrayVisible={notificationTrayVisible}
      /** [MM-P2P] Experiment */
      mmp2p={mmp2p}
    />
  );
}

SequenceContent.propTypes = {
  gated: PropTypes.bool.isRequired,
  courseId: PropTypes.string.isRequired,
  sequenceId: PropTypes.string.isRequired,
  unitId: PropTypes.string,
  unitLoadedHandler: PropTypes.func.isRequired,
  notificationTrayVisible: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  /** [MM-P2P] Experiment */
  mmp2p: PropTypes.shape({
    flyover: PropTypes.shape({
      isVisible: PropTypes.bool.isRequired,
    }),
    meta: PropTypes.shape({
      showLock: PropTypes.bool,
    }),
    state: PropTypes.shape({
      isEnabled: PropTypes.bool.isRequired,
    }),
  }),
};

SequenceContent.defaultProps = {
  unitId: null,
  /** [MM-P2P] Experiment */
  mmp2p: {
    flyover: { isVisible: false },
    meta: { showLock: false },
    state: { isEnabled: false },
  },
};

export default injectIntl(SequenceContent);
