import axios from 'axios';
import { exec } from 'child_process';

let previousTimestamp: string | null = null;

export async function verifyTolgeeActivity() {
  try {
    // Fetch the latest project activity from the Tolgee API
    const { data } = await axios.get(
      `${process.env.TOLGEE_API_URL}/v2/projects/${process.env.TOLGEE_PROJECT_ID}/activity`,
      {
        headers: {
          'Accept': 'application/hal+json',
          'X-API-Key': process.env.TOLGEE_API_KEY,
        },
        params: {
          sort: 'timestamp,desc',
          size: 1,  // Get only the most recent activity
        },
      }
    );

    // Extract the activities from the response data
    const activitiesList = data._embedded.activities;

    if (activitiesList?.length > 0) {
      const mostRecentActivity = activitiesList[0];
      const currentTimestamp = mostRecentActivity.timestamp;

      // If there is no previous timestamp or the current timestamp has changed, update translations
      if (!previousTimestamp || currentTimestamp !== previousTimestamp) {
        previousTimestamp = currentTimestamp;

        // Run the locale update command
        exec('npm run locale:update', (err, stdout, stderr) => {
          if (err) {
            console.error(`Failed to run update: ${err.message}`);
            return;
          }
          if (stderr) {
            console.error(`Update error: ${stderr}`);
            return;
          }
          console.log(`Localization updated successfully: ${stdout}`);
        });
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error occurred: ${err.message}`);
    } else {
      console.error('Unexpected error');
    }
  }
}
