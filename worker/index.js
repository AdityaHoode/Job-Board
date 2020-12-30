const CronJob = require("cron").CronJob;
const fetchJobs = require("./tasks/fetch_github");
const job = new CronJob(
  "* * * * *",
  fetchJobs,
  null,
  true,
  "America/Los_Angeles"
);
job.start();
