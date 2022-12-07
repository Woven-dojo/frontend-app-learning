import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { Col, Row } from '@edx/paragon';
import {
  Timeline, Header, Footer, Grades,
} from '@woven-dojo/dojo-frontend-common';
import { Module } from '@woven-dojo/dojo-frontend-common/dist/components/ui/Module/Module';
import { Progress } from '@woven-dojo/dojo-frontend-common/dist/components/ui/Progress/Progress';
import { StickyCta } from '@woven-dojo/dojo-frontend-common/dist/components/ui/StickyCta/StickyCta';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useModel } from '../../generic/model-store';
import { fetchOutlineTab } from '../data';
import LmsHtmlFragment from '../outline-tab/LmsHtmlFragment';
import WelcomeMessage from '../outline-tab/widgets/WelcomeMessage';

function DojoHome() {
  const { BASE_URL, LOGOUT_URL } = getConfig;
  const authenticatedUser = getAuthenticatedUser();
  const { courseId: courseIdFromUrl } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    // The courseId from the URL is the course we WANT to load.
    dispatch(fetchOutlineTab(courseIdFromUrl));
    // dispatch(fetchProgressTab(courseIdFromUrl));
  }, [dispatch, courseIdFromUrl]);

  const {
    courseId,
    // courseStatus,
  } = useSelector(state => state.courseHome);

  const {
    org,
    number,
    title,
  } = useModel('courseHomeMeta', courseId);

  const {
    courseBlocks,
    handoutsHtml,
    welcomeMessageHtml,
  } = useModel('outline', courseId);

  const {
    completionSummary,
  } = useModel('progress', courseId);

  const {
    completeCount,
    incompleteCount,
    // lockedCount,
  } = completionSummary ?? {};

  console.log(completeCount, incompleteCount, completionSummary);

  const {
    courses,
    sections,
    sequences,
  } = courseBlocks ?? {};

  // console.log(courses);

  // const rootCourseId = courses && Object.keys(courses)[0];

  console.log(courseId, org, number, title);
  // const data = [
  //   {
  //     title: 'Introduction',
  //     subSections: [
  //       {
  //         title: 'Demo Course Overview',
  //         description: '3 min',
  //         link: 'https://google.com',
  //         complete: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Introduction second',
  //     subSections: [
  //       {
  //         title: 'Demo Course Overview',
  //         description: '3 min',
  //         link: 'https://google.com',
  //         complete: true,
  //       },
  //       {
  //         title: 'Something else',
  //         description: '3 min',
  //         link: 'https://google.com',
  //         complete: false,
  //       },
  //     ],
  //   },
  // ];

  const importantDates = [
    {
      title: '',
      subSections: [
        {
          title: 'Tue, Feb 5,2023',
          description: 'Course start',
          complete: true,
        },
        {
          title: 'Tue, Feb 12,2023',
          description: 'Course ends',
        },
      ],
    },
  ];

  const rootCourseId = courses && Object.keys(courses)[0];

  const newData = !rootCourseId ? [] : courses[rootCourseId].sectionIds.map(sectionId => {
    const section = sections[sectionId];
    const subSections = section.sequenceIds.map(sequenceId => {
      const sequence = sequences[sequenceId];
      return ({
        title: sequence.title,
        description: sequence.description,
        link: sequence.legacyWebUrl,
      });
    });
    return ({
      title: section.title,
      subSections,
    });
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <div className="container-lg py-6" style={{ maxWidth: 1178, flex: 1 }}>
        {!!welcomeMessageHtml && <WelcomeMessage courseId={courseId} />}
        <Row>
          <Col xs={8} className="">
            <h2 className="mb-4.5 h2">{title}</h2>
            <StickyCta cta={{ label: 'Start course', onClick: () => { } }}>
              <strong>Next lesson:</strong> Homework - Question Styles (8 Questions)
            </StickyCta>
            <div className="mt-4.5">
              <Module>
                {rootCourseId && (
                <Timeline
                  type="courseOutline"
                  data={newData}
                />
                )}
              </Module>
            </div>
          </Col>
          <Col xs={4}>
            <h4 className="mb-4.5">Course tools</h4>
            <div className="mb-4.5">
              <Module title="Course handouts">
                <Progress steps={completeCount + incompleteCount} completedSteps={completeCount} />
              </Module>
            </div>
            <div className="mb-4.5">
              <Module title="Grades">
                <Grades {...{
                  currentValue: 5,
                  currentTitle: 'Your current grade',
                  passingValue: 50,
                  passingTitle: 'Passing grade',
                  description: 'A weighted grade of 50% is required to pass in this course',
                  buttonTitle: 'More information',
                  onClick: () => {},
                }}
                />
              </Module>
            </div>
            {handoutsHtml && (
              <div className="mb-4.5">
                <Module title="Course handouts">
                  <LmsHtmlFragment
                    html={handoutsHtml}
                    title="Course handouts"
                  />
                </Module>
              </div>
            )}
            <div className="mb-4.5">
              <Module title="Important dates">
                <Timeline type="importantDates" data={importantDates} />
              </Module>
            </div>
          </Col>
        </Row>
      </div>

      <Footer left={`Copyright ${new Date().getFullYear()} Dojo. All rights reserved`} />
    </div>
  );
}

export default DojoHome;
