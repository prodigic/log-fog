'use strict';

//TODO: check repo folder does not exist/
const REPO_NAME = 'fogger';
const GITHUB_ID = 'prodigic';
const DAY = 1000 * 60 * 60 * 24;

const exec = require('child_process').exec;
const messages = require('./messages.js').messages;

let command = [];
let days = Array(15 + 1).join('0').split('');

function commiterator(d, count) {
  let nextIndex = 0;
  let currentMillisecs = (d || Date.now());
  let oldest = currentMillisecs - DAY;

  return {

    hasMore:   () => count > -1,

    remaining: () => count - nextIndex,

    next: function() {
      count--;
      let currentDate = new Date(currentMillisecs);

      if (currentDate.getDay() === 0) {
        currentDate = new Date(currentMillisecs - DAY);
      }
      let gitDate = currentDate.toISOString().substr(0,10) + 'T12:00:00';

      currentMillisecs = currentMillisecs - (DAY * Math.random() * 3);

      return this.hasMore() ?
        {value: gitDate, done: false} :
        {done: true};

    }
  };
}

let commits = commiterator(Date.now(),150);

command.push(`git clone git@github.com:${GITHUB_ID}/${REPO_NAME}.git`);
command.push(`cd ${REPO_NAME}`);

while (commits.remaining()) {
  let timestamp = commits.next().value;
  let cmd = `GIT_AUTHOR_DATE=${timestamp} GIT_COMMITTER_DATE=${timestamp} git commit --allow-empty -m "${messages[messages.length * Math.random() | 0]}"`;
  command.push(cmd);
}

command.push('git pull');
command.push('git push -u origin master');

console.log(command.join('\n'));
