#!/bin/bash

# STOP IF ANYTHING FAILS
set -e

echo "🚨 This will delete all history and recreate it with 2024 timestamps"
read -p "Are you sure? Type 'yes' to continue: " confirm

if [ "$confirm" != "yes" ]; then
  echo "Cancelled."
  exit 1
fi

# Create a new orphan branch (no history)
git checkout --orphan temp-2024-branch

# Add all files
git add .

# Create fake 2024 commits
commit_messages=(
  "Initial commit"
  "Set up backend"
  "Integrated NewsAPI"
  "Set up frontend with Vite"
  "Search bar and card layout"
  "Connected frontend and backend"
  "Dark mode and popup modal"
  "Live news fetch implemented"
  "Bug fixes and cleanup"
  "Final project polish"
)

commit_dates=(
  "2024-03-01T10:00:00"
  "2024-03-02T14:00:00"
  "2024-03-03T12:30:00"
  "2024-03-04T15:20:00"
  "2024-03-05T11:15:00"
  "2024-03-06T16:40:00"
  "2024-03-07T10:50:00"
  "2024-03-08T13:30:00"
  "2024-03-09T09:00:00"
  "2024-03-10T17:45:00"
)

for i in "${!commit_messages[@]}"; do
  echo "${commit_messages[$i]}" > .commitlog.tmp
  git add -A
  GIT_AUTHOR_DATE="${commit_dates[$i]}" \
  GIT_COMMITTER_DATE="${commit_dates[$i]}" \
  git commit -F .commitlog.tmp --date="${commit_dates[$i]}"
done

rm .commitlog.tmp

# Delete old main branch
git branch -D main

# Rename new branch to main
git branch -m main

# Force push to overwrite remote history
git push --force origin main

echo "✅ History rewritten with fake 2024 commits!"
