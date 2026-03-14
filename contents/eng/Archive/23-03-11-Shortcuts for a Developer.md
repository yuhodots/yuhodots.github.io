---
title: "Shortcuts for a Developer"
date: "2023-03-11"
template: "post"
draft: false
path: "/cheatsheet/23-03-11/"
description: "Notes on handy features of tools frequently used by developers, from IDE keyboard shortcuts to vim, shell, and tmux. Also covers useful collaboration features and conventions. Well-written blog posts and resources are shared via links. Content is continuously updated as I learn new things."
category: "Cheat Sheet"
---

> Notes on handy features of tools frequently used by developers, from IDE keyboard shortcuts to vim, shell, and tmux. Also covers useful collaboration features and conventions. Well-written blog posts and resources are shared via links. Content is continuously updated as I learn new things.

### Pycharm

- `Cmd B`: Declaration or usage search. The most useful shortcut in my opinion.
- `Cmd -`: Collapse an expanded section of code
- `Cmd +`: Expand a collapsed section of code
- Structure (`Cmd 7`): A feature to quickly get an overview of the file structure
- `Shift Shift`: Search everywhere
- `Cmd E`: Recently used files
- `Option Enter`: View PyCharm's suggestions
- Sometimes during debugging, stepping into internal libraries may not work properly. In most cases, deleting the .idea folder to clear the cache resolves this.
- Pycharm remote debugging in a docker container: [Setting up a debugging environment with Docker in PyCharm](https://seongwoopark.github.io/2017-06-02-study-pycharm_interpreter/)

### VSCode

- `Cmd Shift P`: Open the command palette
- `Cmd Shift D`: Open debugging tab
- `Cmd Shift E`: Open the project tab
- `Cmd Option up/down`: Multiple cursors
- `Cmd D`: Multiple selection
- `Cmd P`: Search file by name
- `Cmd P + @`: Search within a file more conveniently than `Cmd F`
- `Cmd Shift .`: Similar functionality to `Cmd P + @`
- `Cmd G`: Go to line number
- `Cmd L`: Highlight line
- `Cmd /`: Comment
- `Cmd N`: Open a new file
- `Option up/down`: Move a line
- `Cmd >`: View VSCode's suggestions
- `Shift Option F`: Auto-formatting

##### Debugging

- Debugging options can be configured through the launch.json file
- `name`: Name of the debugging configuration
- `type`: Debugger type
- `request`: launch or attach
- `cwd`: Project working directory
- `program`: Run a script
- `args`: Command line arguments
- `env`: Environment variables
- `console`: Type of console to use
- `justMyCode`: When set to false, allows stepping into internal libraries as well

```
# Example code
{
    "version": "0.2.0",
    "configurations": [

        {
            "name": "debugging option 1",
            "type": "python",
            "request": "launch",
            "cwd":"${workspaceFolder}/project_dir",
            "program": "${workspaceFolder}/project_dir/main.py",
            "args": [
                "--config", "configs/base.yaml",
                "--mode", "train",
            ],
            "env": {
                "CUDA_VISIBLE_DEVICES": "0, 1, 2",
            },
            "console": "integratedTerminal",
            "justMyCode": false
        },

    ]
}
```

##### Extensions

- Image: image preview, python image preview
- Formatter: black formatter, ...
- Debug: Python Test Explorer

### Vim

- [Vim cheat sheet](https://vim.rtorr.com/lang/ko)
- `dd`: Cut a line
- `j`, `k`: Move cursor one line at a time

### iTerm2

- To apply plugins, add the plugin name to `plugins=()` in the `.zshrc` file
  - zsh-syntax-highlighting
    ``` sh
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    ```
  - zsh-autosuggestions
    ``` sh
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```
  - autojump: `brew install autojump`
- There is a built-in plugin called dotenv. When using this plugin, you can set environment variables in the `~/.env` file without needing to write `export`.

### Linux

- [LeCoupa / awesome-cheatsheets](https://github.com/LeCoupa/awesome-cheatsheets/blob/master/languages/bash.sh)
- `env`: Set and view (when no value is provided) global variables
- `<< 'TEXT'` `'TEXT'`: Bash multiline comment. Write content between the two delimiters.
- `pkill -f "process name"`: Kill a process at once without needing to check each PID via grep

##### Task Scheduling

- `at {time}` `Ctrl+D`: Execute a command at the specified time. The time format can be `now+{num} [minutes, hours, days]`, `HH:MM YYYY-MM-DD`, etc.
- `at -f {file_name} {time}`: Execute a file at the specified time
- `atq`: View the list of scheduled tasks
- `atrm {task_num}`: Remove a scheduled task

##### CPU Limit

- `taskset -c 0-3 python script.py`: Use only CPU cores 0-3
- `cpulimit -p "$(pgrep -f ${file_name})" -l 50`: Use only 50% CPU for running file_name

### NVIDIA

In nvidia-smi, "smi" stands for System Management Interface. See the official document [here](https://developer.download.nvidia.com/compute/DCGM/docs/nvidia-smi-367.38.pdf).

- `nvidia-smi -pl 150`: Set power limit to 150W
- `nvidia-smi -lmc 6500`: lmc stands for lock memory clock. Limit the memory clock frequency to 6500 MHz
- `nvidia-smi -lgc 0,1800`: lgc stands for lock gpu clock. Set minGpuClock=0, maxGpuClock=1800

### Network

##### SSH Tunneling

- `ssh -L local_port:remote_server:remote_port remote_username@remote_server`
- Through SSH -L tunneling, you can send requests to and receive responses from services running on a remote server from your local machine.
- For example, suppose you have configured a remote server as server1 in your ssh_config, and you have a specific API running on server1 at host 0.0.0.0 (allowing all connections), port 5000. Then, after tunneling with `ssh -L 8080:0.0.0.0:5000 server1`, you can access http://127.0.0.1:8080/ in your local web browser and send requests.

##### SSH-Agent Forwarding

```
# Before performing the steps below, you must first register your SSH public key with GitHub
ssh-add -K <Path to key file>
ssh-add --apple-use-keychain <path to key file>	# in MacOS
ssh-add -L	# check key
```

- There are two ways to use agent forwarding when connecting to a server (the latter is more convenient):

```
ssh -A <username>@<host>
```

```
# ~/.ssh/config
Host <host>
   ForwardAgent yes
```

- You can verify that ssh-agent forwarding is applied by running `ssh -T git@github.com`
- Additionally, if you register the public key in the server's .ssh/authorized_keys, you can connect without entering a password, which is very convenient

### tmux

- [Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com)
- [MohamedAlaa / tmux-cheatsheet.markdown](https://gist.github.com/MohamedAlaa/2961058)

##### Session

- `tmux`, `tmux new`, `tmux new -s session_name`: Create a session
- `tmux kill-session -t session_name`: Delete a session
- `tmux kill-session -a`: Delete all sessions except the current one
- `tmux kill-session -a -t session_name`: Delete all sessions except the specified one
- `Ctrl+b` `$`: Rename a session
- `tmux ls`, `Ctrl+b` `s`: View all sessions
- `tmux a`, `tmux a -t session_name`: Attach to a session
- `Ctrl+b` `d`: Detach from a session
- `Ctrl+b` `(`, `Ctrl+b` `)`: Navigate between sessions

##### Window

- `tmux new -s session_name -n window_name`: Create a session with specified session name and window name
- `Ctrl+b` `c`: Create a window
- `Ctrl+b` `,`: Rename a window
- `Ctrl+b` `&`: Close a window
- `Ctrl+b` `p`, `Ctrl+b` `n`, `Ctrl+b` `0~9`: Navigate between windows

##### Pane

- `Ctrl+b` `%`: Split vertically
- `Ctrl+b` `"`: Split horizontally
- `Ctrl+b` `arrow keys`, `Ctrl+b` `0~9`: Navigate between panes
- `Ctrl+b` `!`: Convert a pane to a window
- `Ctrl+b+arrow keys`: Resize a pane
- `Ctrl+b` `x`: Close a pane

### Collaboration

- Code formatter: **black, flake8, yapf, pre-commit**. If IDE integration is available, it is convenient to use it.
- Type checker: **mypy, pyright, pyre-check**. If IDE integration is available, it is convenient to use it.
- Commit convention: [angular / angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines), [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Branch naming: [Vincent Driessen, A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
- Issue and PR template: [About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- Documentation (Github wiki): https://github.com/zxing/zxing/wiki (A good example of GitHub wiki)
- GitHub action to run pre-commit: [pre-commit/action](https://github.com/pre-commit/action)

### ETC.

- SQL/NoSQL GUI tools: Beekeeper, MongoDB Compass, DBgate, NoSQLBooster...
- Obsidian: A Markdown IDE. Known for its graph view, with various plugins available for installation.
- Raycast: A productivity app for Mac
- FastAPI Quickstart: [link](https://www.freecodecamp.org/news/fastapi-quickstart/#api-methods)
