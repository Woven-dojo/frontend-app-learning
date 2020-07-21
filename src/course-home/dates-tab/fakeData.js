// Sample data helpful when developing, to see a variety of configurations.
// This set of data is not realistic (mix of having access and not), but it
// is intended to demonstrate many UI results.
// To use, have getDatesTabData in api.js return the result of this call instead:
/*
import fakeDatesData from '../dates-tab/fakeData';
export async function getDatesTabData(courseId, version) {
  if (tab === 'dates') { return camelCaseObject(fakeDatesData()); }
  ...
}
*/

export default function fakeDatesData() {
  return JSON.parse(`
{
  "course_date_blocks": [
    {
      "date": "2020-05-01T17:59:41Z",
      "date_type": "course-start-date",
      "description": "",
      "learner_has_access": true,
      "link": "",
      "title": "Course Starts",
      "extra_info": null
    },
    {
      "complete": true,
      "date": "2020-05-04T02:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "title": "Multi Badges Completed",
      "extra_info": null
    },
    {
      "date": "2020-05-05T02:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "title": "Multi Badges Past Due",
      "extra_info": null
    },
    {
      "date": "2020-05-27T02:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "Both Past Due 1",
      "extra_info": null
    },
    {
      "date": "2020-05-27T02:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "Both Past Due 2",
      "extra_info": null
    },
    {
      "complete": true,
      "date": "2020-05-28T08:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "One Completed/Due 1",
      "extra_info": null
    },
    {
      "date": "2020-05-28T08:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "One Completed/Due 2",
      "extra_info": null
    },
    {
      "complete": true,
      "date": "2020-05-29T08:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "Both Completed 1",
      "extra_info": null
    },
    {
      "complete": true,
      "date": "2020-05-29T08:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "Both Completed 2",
      "extra_info": null
    },
    {
      "date": "2020-06-16T17:59:40.942669Z",
      "date_type": "verified-upgrade-deadline",
      "description": "Don't miss the opportunity to highlight your new knowledge and skills by earning a verified certificate.",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "Upgrade to Verified Certificate",
      "extra_info": null
    },
    {
      "date": "2030-08-17T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": false,
      "link": "https://example.com/",
      "title": "One Verified 1",
      "extra_info": null
    },
    {
      "date": "2030-08-17T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "One Verified 2",
      "extra_info": null
    },
    {
      "date": "2030-08-17T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "ORA Verified 2",
      "extra_info": "ORA Dates are set by the instructor, and can't be changed"
    },
    {
      "date": "2030-08-18T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": false,
      "link": "https://example.com/",
      "title": "Both Verified 1",
      "extra_info": null
    },
    {
      "date": "2030-08-18T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": false,
      "link": "https://example.com/",
      "title": "Both Verified 2",
      "extra_info": null
    },
    {
      "date": "2030-08-19T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "title": "One Unreleased 1"
    },
    {
      "date": "2030-08-19T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "link": "https://example.com/",
      "title": "One Unreleased 2",
      "extra_info": null
    },
    {
      "date": "2030-08-20T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "title": "Both Unreleased 1",
      "extra_info": null
    },
    {
      "date": "2030-08-20T05:59:40.942669Z",
      "date_type": "assignment-due-date",
      "description": "",
      "learner_has_access": true,
      "title": "Both Unreleased 2",
      "extra_info": null
    },
    {
      "date": "2030-08-23T00:00:00Z",
      "date_type": "course-end-date",
      "description": "",
      "learner_has_access": true,
      "link": "",
      "title": "Course Ends",
      "extra_info": null
    },
    {
      "date": "2030-09-01T00:00:00Z",
      "date_type": "verification-deadline-date",
      "description": "You must successfully complete verification before this date to qualify for a Verified Certificate.",
      "learner_has_access": false,
      "link": "https://example.com/",
      "title": "Verification Deadline",
      "extra_info": null
    }
  ],
  "display_reset_dates_text": false,
  "learner_is_verified": false,
  "user_timezone": "America/New_York",
  "verified_upgrade_link": "https://example.com/"
}
  `);
}