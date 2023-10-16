module.exports = {
  types: [
    { value: "feat", name: "feat:     a new feature" },
    { value: "fix", name: "fix:      a bug fix" },
    { value: "docs", name: "docs:     documentation only changes" },
    {
      value: "style",
      name: "style:    changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)",
    },
    {
      value: "refactor",
      name: "refactor: a code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "perf",
      name: "perf:     a code change that improves performance",
    },
    { value: "test", name: "test:     adding missing tests" },
    {
      value: "chore",
      name: "chore:    changes to the build process or auxiliary tools\n            and libraries such as documentation generation",
    },
    { value: "revert", name: "revert:   revert to a commit" },
    { value: "wip", name: "wip:      work in progress" },
  ],

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  subjectLimit: 120,
};
