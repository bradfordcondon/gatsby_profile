
# Yarn 1 & 3

I'd like to have two builds on the same box, one using `node 14` and `yarn 1`, and one using `node 16` and `yarn 3`.  Previously `nvm` made it relatively easy to manage many different version builds on the same machine.  However, i was surprised to find that even after switching back to yarn v1, it was following several `yarn 3` conventions.

The hangup is the same reason for my upgrading: `gitlab` self hosted private package registry https://docs.gitlab.com/ee/user/packages/npm_registry/.  Yarn 3 does some great things in terms of improving private registry access, namely by allowing you to simply define the remotes in a `yarn-rc.yml` file.
