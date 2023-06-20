#!/bin/bash
COLOR_DEFAULT='\033[0m'
COLOR_RED='\033[31;5m'
COLOR_GREEN='\033[32m'
COLOR_YELLOW='\033[33m'
BLINK='\033[5m'

echo ""
echo ""
echo ""
# Get current branch name
CURRENT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
# Check current status d
if [ -z "`git status --porcelain`" ]
    then
        # Proceed to next step
        echo "============================="
        echo "Deploy to:"
        echo "============================="
        echo "1: Fuse Dev"
        echo "2: Fuse Sanity"
        echo "3: Fuse RC"
        echo ""
        echo "Others or Empty to cancel!"
        echo "-----------------------------"
        echo ""
        printf "Select: "
        read ENV
        if [[ $ENV -eq 1 ]]
            then
                ENV_LABEL="Fuse Dev"
                TARGET_BRANCH="fuse-dev"
        elif [[ $ENV -eq 2 ]]
            then
                ENV_LABEL="Fuse Sanity"
                TARGET_BRANCH="fuse-sanity"
        elif [[ $ENV -eq 3 ]]
            then
                ENV_LABEL="Fuse RC"
                TARGET_BRANCH="fuse-rc"
        else
            ENV_LABEL="Canceled"
            TARGET_BRANCH=""
        fi

        echo ""
        echo ""
        
        if [[ $TARGET_BRANCH != "" ]]
            then
                if [[ $TARGET_BRANCH == "fuse-sanity" ]]
                then
                    if [[ $CURRENT_BRANCH != "sprint" ]]
                    then
                        IS_PASS=0
                        EXPECTED_BRANCH="sprint"
                    fi
                elif [[ $TARGET_BRANCH == "fuse-rc" ]]
                then
                    if [[ $CURRENT_BRANCH != "fuse-sanity" ]]
                    then
                        IS_PASS=0
                        EXPECTED_BRANCH="fuse-sanity"
                    fi
                else
                    IS_PASS=1
                fi

                if [[ $IS_PASS == 0 ]]
                then
                    echo -e "${COLOR_RED}Warning!${COLOR_DEFAULT}"
                    echo "==========================================================================="
                    printf ">> Release must use ${COLOR_YELLOW}${EXPECTED_BRANCH}${COLOR_DEFAULT} branch, your current branch is ${COLOR_YELLOW}$CURRENT_BRANCH${COLOR_DEFAULT}!"
                else
                    echo -e ">> Release on ${COLOR_YELLOW}$ENV_LABEL${COLOR_DEFAULT}"
                    echo "Processing..."
                    echo ""

                    IS_SUCCESS=0
                    if [[ $TARGET_BRANCH == "fuse-dev" ]]
                    then
                        # Check local branch, if exist then delete it
                        # if [ `git branch --list $TARGET_BRANCH` ]
                        # then
                            git branch -D $TARGET_BRANCH
                        # fi

                        # Check remote branch, if exist then delete it
                        # if [ `git branch --list origin $TARGET_BRANCH` ]
                        # then
                            git push origin --delete $TARGET_BRANCH
                        # fi

                        # Create fresh branch from current branch
                        git checkout -b $TARGET_BRANCH
                        git push origin $TARGET_BRANCH

                        # Back to current branch
                        git checkout $CURRENT_BRANCH

                        IS_SUCCESS=1
                    else
                        # Check local branch
                        if [ ! `git branch --list $TARGET_BRANCH` ]
                        then
                            # Create if not exist
                            git checkout -b $TARGET_BRANCH `origin/$TARGET_BRANCH`
                        else
                            # Change
                            git checkout $TARGET_BRANCH
                        fi

                        # Update it
                        git fetch origin $TARGET_BRANCH

                        # Merge the codes
                        git merge --ff-only $CURRENT_BRANCH

                        # Check conflicts
                        CONFLICTS=$(git ls-files -u | wc -l)
                        if [ "$CONFLICTS" -gt 0 ]
                        then
                            echo -e "${COLOR_RED}Warning!${COLOR_DEFAULT}"
                            echo "There is a merge conflict. Aborting..."
                            git merge --abort
                            IS_SUCCESS=0
                            # exit 1
                        else
                            # No conflict
                            git push origin $TARGET_BRANCH
                            IS_SUCCESS=1
                        fi
                    fi

                    if [[ $IS_SUCCESS == 1 ]]
                    then
                        echo ""
                        echo ""
                        echo -e "${COLOR_GREEN}Success!${COLOR_DEFAULT}"
                        echo "==========================================================================="
                        echo -e ">> Release on ${COLOR_YELLOW}$ENV_LABEL${COLOR_DEFAULT} with ${COLOR_YELLOW}$CURRENT_BRANCH${COLOR_DEFAULT} branch is Success"
                        printf ">> Your release will be available on server soon!"
                    else
                        echo -e "${COLOR_RED}Warning!${COLOR_DEFAULT}"
                        echo "==========================================================================="
                        printf ">> Release with ${COLOR_YELLOW}$CURRENT_BRANCH${COLOR_DEFAULT} branch is Failed!" 
                    fi
                fi
                
        else
            echo -e "${COLOR_RED}Warning!${COLOR_DEFAULT}"
            echo "==========================================================================="
            printf ">> Release with ${COLOR_YELLOW}$CURRENT_BRANCH${COLOR_DEFAULT} branch is Canceled!"
        fi
else
    echo -e "${BLINK}${COLOR_RED}Warning!${COLOR_DEFAULT}"
    echo "==========================================================================="
    echo -e ">> Please push your latest update on ${COLOR_YELLOW}$CURRENT_BRANCH${COLOR_DEFAULT} branch to remote repository"
    printf ">> Release is Canceled!"
fi

read END
echo ""
echo ""