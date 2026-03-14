---
title: "Nginx Configuration"
date: "2019-07-10"
template: "post"
draft: false
path: "/server/19-07-10-2/"
description: "The configuration for how nginx operates is described in configuration files with the .conf extension. If installed via compilation, it's located at /usr/local/nginx/conf, and if installed on Ubuntu using apt-get, it's located at /etc/nginx."
category: "BackEnd"
thumbnail: "nginx"
---

> The content on nginx configuration references [materials](https://opentutorials.org/module/384/4526) from Egoing at OpenTutorials (2013).

The configuration for how nginx operates is described in configuration files with the .conf extension. If installed via compilation, it's located at /usr/local/nginx/conf, and if installed on Ubuntu using `apt-get`, it's located at /etc/nginx. Since the storage directory may vary depending on the environment, you can easily find it with the command `sudo find / -name nginx.conf`. Below are the roles of the configuration files:

- nginx.conf: Main configuration file
- fcgi.conf: FastCGI configuration file
- sites-enabled: Contains configuration files for active sites. Corresponds to Virtual Host settings in Apache (may not exist)
- sites-available: Contains configuration files for inactive sites

Let's examine the structure of the main configuration file, nginx.conf.

```shell
user www-data;
worker_processes  1;
pid /run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    server {
        listen       80;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
```

##### [1] Core Module

- **user**: nginx is divided into a master process and worker processes. The user directive allows you to specify the permissions for these worker processes. The worker processes perform the actual web server tasks.
- **worker_processes**: Indicates the number of processes that can be run.
- **pid**: The location where the master process ID information is stored.

##### [2] Events Block

The events block contains option settings for handling asynchronous network events. worker_connections refers to the number of connections a single process can handle.

##### [3] Http Block

This can be considered the root block for server and location blocks, and the values set here are inherited by sub-blocks. While multiple http blocks can be used, it's recommended to use only one for management purposes.

- **keepalive_timeout**: Specifies the duration to maintain a connection with the client. Since unnecessary connections can be maintained without any requests, it's best to reduce this to around 10 seconds or set it to a low value.
- **server_tokens off**: A feature that can hide the Nginx version. It's recommended to remove the comment to prevent security issues.
