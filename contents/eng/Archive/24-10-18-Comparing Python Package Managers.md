---
title: "Comparing Python Package Managers: pip, poetry, and uv"
date: "2024-10-18"
template: "post"
draft: false
path: "/cheatsheet/24-10-18/"
description: "Package management is essential in Python development environments. While pip and poetry are the most well-known, projects using uv have been steadily increasing recently. In this post, we will compare the key features and pros and cons of each tool. pip is the oldest and most widely used Python package installation tool..."
category: "Cheat Sheet"
thumbnail: "python"
---

> Package management is essential in Python development environments. While pip and poetry are the most well-known, projects using uv have been steadily increasing recently. In this post, we will compare the key features, advantages, and disadvantages of each tool.

### pip

pip is the oldest and most widely used Python package installation tool. It has established itself as the standard tool for downloading and installing packages from the Python Package Index (PyPI) and is used by default in most Python projects. When quickly writing Python code or running small experiments, pip is typically the go-to choice.

It has the following advantages:

- Simple to use: You can easily install packages with the `pip install package-name` command.
- Wide compatibility: It can be used with most Python projects and is supported across various Python versions and platforms.
- Rapid update cycle: Closely integrated with the Python Package Index (PyPI), it allows for quick package management and updates.

However, it has the following disadvantages:

- Difficult complex project management: Managing package version conflicts in large-scale projects can be challenging.
- No lockfile support: Unlike tools such as Poetry, pip does not generate lockfiles by default, which can make dependency management inconvenient.

The following commands enable basic usage:

- `pip install package-name`: Install a package
- `pip freeze > requirements.txt`: Save the list of currently installed packages to a file
- `pip uninstall package-name`: Remove a package

### poetry

poetry is a Python package management tool developed with the goal of making dependency management and package distribution easier. It helps efficiently manage package dependencies and project configurations that were lacking in pip and pip-tools.

Because it has the following advantages, many medium-to-large Python projects use poetry:

- pyproject.toml-based: poetry uses the `pyproject.toml` file to manage project settings and dependencies.
- Dependency resolution and lockfile generation: poetry provides powerful dependency resolution features, and the `poetry.lock` file prevents version conflicts.
- Package distribution support: It provides integrated management from project creation to package distribution.

However, the following disadvantages still exist:

- Slower performance: Package installation and dependency resolution speeds can be somewhat slow.
- Complex configuration: It is more useful for medium-to-large projects than small ones, and initial setup can be somewhat complex.

The following commands enable basic usage:

- `poetry install`: Install dependencies
- `poetry add package-name`: Add a package
- `poetry update`: Update dependencies

### uv

uv is a new Python package manager written in Rust. It is one of the tools developed by Astral, the creators of the Python linter ruff, with a particular focus on performance. It is designed to replace the workflows of pip and pip-tools, providing a fast and reliable package management experience.

Because of the following strong advantages, many projects are migrating from poetry to uv. A notable example is FastAPI, a Python Web Framework, which has transitioned to a uv-based project.

- Fast performance based on Rust: uv shows 8-10x faster performance compared to pip, and 80-115x faster with warm cache.
- Modular design: Various features such as package installation, dependency resolution, and virtual environment creation can be used flexibly.
- Unified management tool: A single binary that can replace pip, pip-tools, and virtualenv, and even provides the ability to install Python itself. Being easily substitutable in existing pip environments is another advantage.
- Additional features: Supports various dependency resolution strategies, dependency resolution based on target Python versions, and dependency override capabilities.

The following disadvantages exist:

- Immature features: It does not yet fully replace all features of Poetry or pip.
- Compatibility issues with existing projects: Some legacy features may not be supported.

The following commands enable basic usage:

- `uv pip install`: Install packages
- `uv pip compile`: Resolve dependencies and generate a lockfile
- `uv pip sync`: Synchronize virtual environment

##### Quick Start

Let's create a simple Python project with uv and test it.

First, install uv.

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Create a project and try using ruff, a Python linter.

```shell
uv init example
cd example
uv add ruff	# Install ruff package
uv run ruff check	# Run ruff package
```

You can also install various Python versions and switch between them quickly.

```shell
uv python install 3.10	# Install Python
uv python install pypy@3.10	# Install PyPy
uv python pin pypy@3.10 # Change the current project's Python version to 3.10
uv run hello.py	# Run an example file
```

More commands such as uv sync, lock, build, and publish can be found [here](https://docs.astral.sh/uv/getting-started/features/#the-pip-interface).

### References

- [uv: Python packaging in Rust](https://astral.sh/blog/uv)
- https://docs.astral.sh/uv/#highlights
- https://docs.astral.sh/uv/getting-started/features/#the-pip-interface
