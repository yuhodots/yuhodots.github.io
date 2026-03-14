---
title: "Packaging Python Projects"
date: "2023-09-16"
template: "post"
draft: false
path: "/cheatsheet/23-09-16/"
description: "Brief notes on Poetry usage and pyproject.toml authoring for Python project packaging. In the past, creating packages involved using setuptools to write package info in setup.py and registering on PyPI, but recently the trend has shifted to using pyproject.toml."
category: "Cheat Sheet"
thumbnail: "python"
---

> Brief notes on Poetry usage and pyproject.toml authoring for Python project packaging.

- In the past, creating Python packages involved using setuptools to write package information in `setup.py` and `setup.cfg`, then registering the package on PyPI via tools like twine. Recently, however, the trend has largely shifted to packaging using `pyproject.toml`.
- You can find various explanations and examples in the [awesome-pyproject](https://github.com/carlosperate/awesome-pyproject) repository.

### Poetry

- Poetry is a tool that helps with Python dependency management and packaging. See the [official documentation](https://python-poetry.org/docs/) for details.
- Since it manages dependencies through `.toml` and `.lock` files, it eliminates the hassle of manually setting up a virtual environment for each project as with traditional pip.
- `curl -sSL https://install.python-poetry.org | python3`: Installation
- `poetry new ${project_name}`: Create a project (or use `poetry init`)
- `poetry add ${package_name}`: Add a dependency
- `poetry remove ${package_name}`: Remove a dependency
- `poetry install`: Install dependencies from poetry.lock
- `poetry check`: Check validity of pyproject.toml
- `poetry update`: Update dependencies. Same as `rm poetry.lock` + `poetry install`
- `poetry build`: Build the source and wheels archives (e.g., **tarball, wheel**)
- `poetry publish`: Publish to PyPI (need to run `poetry build` first)
- `poetry env use /full/path/to/python`: Tell Poetry which Python version to use for the current project (for switching between environments)

### pyproject.toml

- Below is an example `.toml` file provided by the Poetry repository:

```toml
[tool.poetry]
name = "my-package"
version = "0.1.0"
description = "The description of the package"

license = "MIT"

authors = [
    "NAME <name@gmail.com>"
]

repository = "https://github.com/python-poetry/poetry"
homepage = "https://python-poetry.org"

# README file(s) are used as the package description
readme = ["README.md", "LICENSE"]

# Keywords (translated to tags on the package index)
keywords = ["packaging", "poetry"]

[tool.poetry.dependencies]
# Compatible Python versions
python = ">=3.8"
# Standard dependency with semver constraints
aiohttp = "^3.8.1"
# Dependency with extras
requests = { version = "^2.28", extras = ["security"] }
# Version-specific dependencies with prereleases allowed
tomli = { version = "^2.0.1", python = "<3.11", allow-prereleases = true }
# Git dependencies
cleo = { git = "https://github.com/python-poetry/cleo.git", branch = "master" }
# Optional dependencies (installed by extras)
pendulum = { version = "^2.1.2", optional = true }

# Dependency groups are supported for organizing your dependencies
[tool.poetry.group.dev.dependencies]
pytest = "^7.1.2"
pytest-cov = "^3.0"

# ...and can be installed only when explicitly requested
[tool.poetry.group.docs]
optional = true
[tool.poetry.group.docs.dependencies]
Sphinx = "^5.1.1"

# Python-style entrypoints and scripts are easily expressed
[tool.poetry.scripts]
my-script = "my_package:main"
```

- `[tool.poetry]`: You can package a specific folder via `{package_name} = [{ include = "{package path}" },]`
- `[tool.poetry.dependencies]`: Lists packages with dependencies. Packages can be added with `poetry add`.
  - You can also manage sub-packages separately like this: `some_api = { path = "some_directory/some_api", optional = true }`
- `[tool.poetry.group.{group name}.dependencies]`: Dependencies can be organized into groups.
  - If set to `optional = true`, they can be installed with `poetry install --with {group name}`

```toml
[tool.poetry.group.{group name}]
optional = true
```

- `[tool.poetry.extras]`: You can install specific modules with `poetry install --extras "{module name}"` or `pip install ".[module name]"`, or install all extras with `poetry install --all-extras`.

- `[build-system]`: Defines the required build system.

- `[tool.poetry.scripts]`: Entrypoints for running packages directly from the terminal with specific commands after installation.

### Installing Packages

- Installation with pip: Methods include git+https, https, git+ssh, etc. The format is `pip install git+https://...`
- Installation with git clone

```sh
git clone https://github.com/author_name/repo_path
cd repo_path
pip install -e .	# –editable option, install all
# or you can use `poetry install --all-extras` if the package use poetry
```

- Installation with pyproject.toml

```toml
[tool.poetry.dependencies]
{package_name} = {git = "ssh://git@github.com/{author}/{package_name}.git", tag = "{tag or version}", extras = ["{extra_name}"]}
```

- Installation of sub-directory: (1) Set `optional = true` in the dependencies, (2) declare it in extras, then (3) install with `poetry install --extras "{module name}"` or `pip install ".[module name]"`

- When Dockerizing, there is not much difference -- just download via pip or Poetry. If you have a private repo configured, refer to [this method](https://stackoverflow.com/questions/55929417/how-to-securely-git-clone-pip-install-a-private-repository-into-my-docker-image).
