
//TODO: check repo folder does not exist/
const REPO_NAME = "log-fog";
const GITHUB_ID = "prodigic";
const DAY = 1000 * 60 * 60 * 24;

// const exec = require('child_process').exec;
const { messages } = require("./messages.js");

let command = [];
// let days = Array(15 + 1).join('0').split('');

function commiterator({ dateUntil, commitCount = 250, weeks = 1 }) {
  let nextIndex = 0;
  let currentMillisecs = dateUntil || Date.now();
  let cutOffDate = new Date().getTime() - weeks * 7 * 24 * 60 * 60 * 1000;

  return {
    hasMore: () => commitCount > -1 && cutOffDate < currentMillisecs,
    remaining: () => cutOffDate < currentMillisecs ? commitCount - nextIndex : 0,

    next: function() {
      const FINISHED = { done: true };
      --commitCount;
      let currentDate = new Date(currentMillisecs);

      if (currentDate.getDay() === 0) {
        currentDate = new Date(currentMillisecs - DAY);
      }
      let gitDate = currentDate.toISOString(); //.substr(0,10) + 'T12:00:00';

      currentMillisecs = currentMillisecs - DAY * Math.random();

      return this.hasMore() ? { value: gitDate, done: false } : FINISHED;
    }
  };
}

let commits = commiterator({
  dateUntil: Date.now(),
  weeks: 7
});

command.push(`git clone git@github.com:${GITHUB_ID}/${REPO_NAME}.git`);
command.push(`cd ${REPO_NAME}`);

let cmd="";
while (commits.remaining()) {
  let timestamp = commits.next().value;
  cmd = `GIT_AUTHOR_DATE=${timestamp} GIT_COMMITTER_DATE=${timestamp} git commit --allow-empty -m "${
    messages[(messages.length * Math.random()) | 0]
  }"`;
  command.push(cmd);
}

command.push("git pull");
command.push("git push -u origin master");

console.log(command.join("\n"));

console.log(Array.from(commiterator({})));
