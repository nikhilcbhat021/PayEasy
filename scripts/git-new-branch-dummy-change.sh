!#bin/bash
set -e

echo '------------------------------------------'
test_branch=24_5__ci_test

# instead of cluttering the main branch, make all necessary intermediate changes
# to the dev branch, once all bugs are cleared, raise a PR from dev_branch to main, having 
# a clean commit history (maybe we need to take more steps like rebase before pull_request)
dev_branch=dev
# ls

echo '------------------------------------------'

echo $test_branch
echo $dev_branch


curr_branch=$(git rev-parse --abbrev-ref HEAD)
all_branches=$(git branch)

echo $curr_branch , $all_branches
read name
# reset the curr branch to HEAD->main
git reset --hard origin/"$curr_branch"
git log -n 4

read name
if  [[ "$curr_branch" != "main" && "$curr_branch" != "dev" ]]; then
    git checkout main
    # git branch -D $curr_branch
fi

# delete test_branch, to reset it to HEAD->main
# dev_branch must not be deleted, as doing so would delete all 
# intermediate changes permanently.

### git branch -D $dev_branch
if [[ "$test_branch" in "$allbranches" ]]; then
    git branch -D $test_branch
fi

# create the dev branch
git checkout -b $dev_branch
git checkout -b $test_branch
echo '------------------------------------------'
# should display atleast 3 branches including main.
git branch
echo '------------------------------------------'
echo Status:-
git status

echo '------------------------------------------'

echo "# trigger ci" >> ci-dummy.md
git add ci-dummy.md
git commit -m "ci: dummy trigger"

echo Push:-

git push origin $test_branch


echo '------------------------------------------'