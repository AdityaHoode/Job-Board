const fetch = require("node-fetch");
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const base_url = "https://jobs.github.com/positions.json";

async function fetchJobs() {
  let jobs = [];
  let resultCount = 1;
  let page = 0;
  while (resultCount > 0) {
    const response = await fetch(`${base_url}?page=${page}`);
    const data = await response.json();
    jobs.push(...data);
    resultCount = data.length;
    page += 1;
  }
  console.log(jobs.length);

  const jrJobs = jobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();
    if (
      jobTitle.includes("senior") ||
      job.title.includes("sr.") ||
      job.title.includes("manager") ||
      job.title.includes("architect")
    ) {
      return false;
    }
    return true;
  });
  console.log(jrJobs.length);

  const success = await setAsync("github", JSON.stringify(jrJobs));
  console.log({ success });
}

//fetchJobs();

module.exports = fetchJobs;
