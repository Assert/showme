Step by step guide from forking to pull request

## Part 1 - Create a fork

Find a project on GitHub you want to contribute to

**Step 1. Fork the project**

To fork this project, click the "Fork" button in the GitHub.com repository.

**Step 2. Clone your fork**

You now have a fork, but it only exists on GitHub. To be able to work on the project, you will need to clone it to your local machine.

`$ git clone https://github.com/OrgUserName/ProjectName.git`

`# Clones your fork of the repository into the current directory in terminal`

**Step 3. Configure remotes**

When a repository is cloned, it has a default remote called origin that points to your fork on GitHub, not the original repository it was forked from. To keep track of the original repository, you need to add another remote named **_upstream_**.

`$ cd ProjectName`

`# Changes the active directory in the prompt to the newly forked ProjectName directory`

`$ git remote add upstream https://github.com/OrgUserName/ProjectName.git`

`# Assigns the original repository to a remote called "upstream"`

## Part 2

You now have a fork and you are ready to select a issue to fix.

**Step 1 Select an issue to fix**

Many projects use GitHub to track issues. Lets say you selected issue #123.

**Step 2 Branch out**

`$ git checkout -b 123-issue-name master `

`# This creates a branch to isolate your modifications`

**Step 3 Code**

Work on fixing the problem.
Follow the style-guide if the project has one and add tests to your code
Keep your changes as small as you can. Focus just on fixing the issue you selected.

**Step 4 Commit your changes**

You should commit often, and add descriptive comments like this:

> (#123) - A short main description

> Followed by further explanation when needed.

`$ git add path/file.js`

`# Add the files you want to commit`

`$ git commit -m "(#123) - A short description of what you changed"`

`# Commit with your message`

**Step 5 Rebase your branch**

To make the integration of your branch simpler you should get that last changes made to the original remote project. Then merge them into your branch solving any conflicts there might be. Here are two ways of doing this:

`$ git fetch upstream`

`# Fetches any new changes from the original repository and makes a local branch called "upstream/master"`

`$ git merge upstream/master  `

`# Merges any changes fetched into your working branch`

Your branch is now ready. Bug is fixed and you have updated with the new changes from the remote repository.

## Part 3

**Step 1 Push to your fork**

You need to push your commits to your fork on GitHub, so that GitHub has your last changes when you send the pull request.

`# Push to your forks branch `

`$ git push origin 123-issue-name `

**Step 2 Open a Pull-Request**

Go to GitHub and your fork of the project. Find your branch (Issue-name). Don't create a pull request from your master. We keep our changes in branches to we don't mix in other modifications into the pull request.

* Switch to your branch
* Click the Compare & review button

**Step 3 Pull Request message**

You must say what issue your pull request is for. Please specify the ID of the issue that the request is for.

> "Fix for issue: #123-issue-name"

You also should give a brief description of the work you have done.

> "I fixed the login problem, and added a login service for Twitter".

**Step 4 Send the pull request**

* Press the green button 'Send pull request'.

**If not accepted**

If your pull request is not accepted, you will have gotten a comment. You must decide if you need to start over, or if you can continue on that branch. You can add new commits, or redo your branch completely.

* Make the changes to your code

`$ git add path/file.js`

`# Add the files you want to commit`

`$ git commit -m "(#123) - A short description of what you changed"`

`# Commit with your message`

When you have made all the changes you want, you can push (update GitHubs version of) the branch and it will automatically update the pull-request for you.

`# Push to your forks branch `

`$ git push origin 123-issue-name `

**If closed**

If your contribution is not needed for some reason. It might be that someone else has made a fix then the pull request will be closed.
You can then delete your branch (see below).

**If accepted**

Once accepted, you can safely delete that branch on your fork.
The GitHub GUI will propose for you to delete your branch in your pull-request page, if not that is how you do it:

`$ git checkout master`

`$ git branch -d 123-issue-name`

`# Delete the local branch`

`$ git push --prune origin`

`# This will delete all remote branches that do not exist locally`

**Update your remote master**

`$ git fetch upstream`

`# Fetches any new changes from the original repository and makes a local branch called "upstream/master"`

`$ git merge upstream/master  `

`# Merges any changes fetched into your working branch (now master)`

`# Push to your forks master all that last changes`

`$ git push origin master `