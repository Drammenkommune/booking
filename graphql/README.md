#### Setup development environment

1. Clone this repository
2. Execute the following within the repository

```shell
npm install

# If you use direnv
echo "source devops/env/dev.sh" >> .envrc
direnv allow

# If you do not use direnv, load env variables manually
# source devops/env/dev.sh

devops/setup-env
```

#### Start development processes

```shell
devops/start
```

#### Running tests
```shell
devops/test
```
