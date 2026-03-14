---
title: "Linux Basic Commands"
date: "2020-10-08"
template: "post"
draft: false
path: "/cheatsheet/20-10-08/"
description: "Our lab uses Ubuntu 18.04 OS as a machine learning workstation, and I'm compiling frequently used commands for server management and day-to-day work below. I keep adding new content whenever I learn something new or find something worth sharing."
category: "Cheat Sheet"
thumbnail: "linux"
---

Our lab uses Ubuntu 18.04 OS as a machine learning workstation, and I'm compiling frequently used commands for server management and day-to-day work below. I keep adding new content whenever I learn something new or find something worth sharing.

### Running Programs

##### Background and Daemon Execution

- *`nohup command &`*
- Meaning of nohup: nohup stands for "no hang up" and is used to run a process as a daemon. When run as a daemon, the program will not terminate even if you log out of the server and the session ends.
- Meaning of &: Runs the process in the background. It executes out of the user's sight, but the program will terminate if the session ends.
- Check running jobs: *`jobs -l`*

##### Standard Output

- By default, the output log is written to a nohup.out file in the current directory.
- View entire output: *`cat nohup.out`*
- View only the last 10 lines: *`tail -f nohup.out`*
- Write standard output in real time (Python): *`nohup python -u filename.py &`*
- By default, output is not sent immediately—it accumulates in a buffer before being transmitted. In Python, the -u option allows output to be sent individually, so you can view output in real time when using this option.
- Write standard output to a file other than nohup.out: *`nohup command > filename.out &`*
- Write standard output and standard error to separate files: *`nohup command 1 > filename_output.out 2 > filename_error.err &`*

##### Processes

- Check process ID: *`ps -ef | grep filename`*
- Kill a process: *`kill -9 processID`* (option 9 for force kill, option 15 for graceful termination)

### File Management

##### Basic Commands

- Go to previous directory: *`cd -`*
- Go to home directory: *`cd`* (or *`cd ~`*)
- List files in a directory: *`ls foldername`* (if no folder is specified, the current location is shown)
- The -a option for ls shows hidden files, and the -l option shows detailed information.
- Move a file or directory: *`mv filename destination`*
- Rename a file: *`mv filename newfilename`*
- Batch rename files: *`rename filename newfilename target`*
- Delete a file: *`rm filename`* (-f option for force delete, use * to delete all files)
- Delete a directory: *`rm -r foldername`* (or *`rmdir`*)

##### grep

- Find files containing specific content within a folder: *`grep content folder`*
- The -h option suppresses filename output, -o prints only matching parts, -l prints only filenames.
- For more options, refer to the blog post by yanghamzzi (linked in References below).
- The grep command can be flexibly used with regular expressions.

##### File Compression

- Extract tar archive: *`tar -xvf filename.tar`*
- Create tar archive: *`tar -cvf filename.tar foldername`*
- Extract tar.gz archive: *`tar -zxvf filename.tar`*
- Create tar.gz archive: *`tar -zcvf filename.tar foldername`*
- Extract gz file: *`gzip -d filename.gz`*
- Create gz file: *`gzip filename`*
- For tar options, refer to nota's story blog post (linked in References below).

##### SFTP (SSH File Transfer Protocol)

- Connect to a remote server via SFTP: *`sftp userid@serverip`*
- Before performing file transfer operations, make sure you know your current local computer's location.
- Local commands can be used by prepending the letter 'l' (e.g., cd becomes *`lcd`*, ls becomes *`lls`*).
- Download a file from the server: *`get filename`* (for multiple files, use *`mget`*)
- Upload a file to the server: *put filename* (for multiple files, use mput)

### Account Management

- View all accounts: *`cat /etc/passwd`*
- View accounts registered with useradd: *`grep /bin/bash /etc/passwd`*
- View accounts with sudo privileges: *`grep '^sudo:.\*$' /etc/group | cut -d: -f4`*
- Create an account: *`sudo useradd -m -s /bin/bash accountname`* (the -m option automatically creates a home directory)
- Set a password for the created account: *`sudo passwd accountname`*
- Delete an account: *`userdel accountname`* (the -r option also deletes the home directory)
- Check users currently logged into the system: *`w`*

### Checking Logs

- View command history: *`history`* (path: ~/.bash_history)
- View login logs: *`lastlog`* (path: /usr/bin/lastlog)
- View login and reboot logs: *`last`* (path: /usr/bin/last)
- Directory where log files are stored: /var/log

### Server Access

##### SSH Key Registration

1. Generate a key: Run `ssh-keygen -t rsa` on your local machine (this means the key type is rsa).
2. Verify key generation: Check whether the .ssh/id\_rsa.pub file has been created on your local machine, and copy its contents.
3. Register the key: Create a .ssh/authorized\_keys file on the server, paste the rsa key value you copied from your local machine into the authorized\_keys file, and save it.
4. To register multiple keys in the .ssh/authorized\_keys file, use line breaks.

##### SSH Config Setup

- By saving the 'server connection name / IP address / username / port / key' values in the .ssh/config file on your local machine, you can connect to the server simply by entering the 'server connection name.' See the example below for usage.

```
# vim ~/.ssh/config
Host servername
	HostName 10.20.12.123
	User username
	Port 50100
	IdentityFile ~/.ssh/id_rsa
```

### Miscellaneous

- When you forget to prepend sudo to a command: *`sudo !!`*
- Reuse the most recently used argument: *`command !$`*
- Copy and paste: Ctrl+Shift+C, Ctrl+Shift+V
- Neatly display full system information: *`screenfetch`*

### Reference

- [Mr.Lin Blog - Easy Explanation of nohup and & (Background) Command Usage](http://joonyon.tistory.com/98) ('Running Programs' section)
- [yanghamzzi's World - Text Filter Commands 1 (String Pattern Search grep Options, Regular Expressions)](https://jhnyang.tistory.com/67) ('File Management' section)
- [nota's story - Linux tar, gz Compression and Extraction](https://nota.tistory.com/53) ('File Management' section)
- [15 Essential Linux Command Line Tips and Tricks](https://medium.com/better-programming/15-essential-linux-command-line-tips-and-tricks-95e2bfa2890f) ('Miscellaneous' section)
- [https://shaeod.tistory.com - [Linux Command] lastlog - View Access Logs](https://shaeod.tistory.com/734) ('Checking Logs' section)
