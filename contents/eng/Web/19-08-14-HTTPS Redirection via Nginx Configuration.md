---
title: "HTTPS Redirection via Nginx Configuration"
date: "2019-08-14"
template: "post"
draft: false
path: "/server/19-08-14/"
description: "In the previous post, we learned how to obtain SSL certification, connect it to a domain, and force HTTP to redirect to HTTPS within app.js in Node.js. This time, we will explore how to implement HTTPS redirection in Nginx instead."
category: "BackEnd"
thumbnail: "nginx"
---

In the previous post, we learned how to obtain SSL certification, connect it to a domain, and force HTTP to redirect to HTTPS within app.js in Node.js. This time, instead of Node.js, we will explore how to implement HTTPS redirection in Nginx. This post is intended for those who meet the following prerequisites:

1. You have obtained an SSL certificate
2. You have applied the certificate to your website domain using AWS ELB
3. You are using Nginx as a proxy server for Node.js

### HTTPS redirection

The Classic Load Balancer supports the following X-Forwarded headers. I will use the X-Forwarded-Proto header among these.

- X-Forwarded-For: Helps identify the client's IP when using an HTTP or HTTPS load balancer
- X-Forwarded-Proto: Helps identify the protocol (HTTP or HTTPS) that the client used to connect to the load balancer
- X-Forwarded-Port: Helps identify the destination port that the client used to connect to the load balancer

For HTTPS redirection, you need to modify the Nginx configuration file. You can edit the Nginx configuration by modifying the **nginx.conf** file in the /etc/nginx/ directory, or the **default** file in the /etc/nginx/sites-enabled directory. (In my case, I modified the **default** file in the /etc/nginx/sites-enabled directory.)

```sh
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    if ($http_x_forwarded_proto = 'http'){
        return 301 https://$host$request_uri;
    }
    ...
}
```

AWS kindly provides documentation on [HTTPS redirection methods](https://aws.amazon.com/ko/premiumsupport/knowledge-center/redirect-http-https-elb/) not only for Nginx but also for Apache and IIS servers. I referenced this link as well.

In the code above, the only thing we need to focus on is the if statement. The condition `($http_x_forwarded_proto = 'http')` in the if statement means that **the client attempted to connect via HTTP**. In this case, the `return 301 https://...` command executes, **redirecting the client's connection to HTTPS**.

Let's examine `return 301 https://$host$request_uri` in detail:

- 301: HTTP response status code 301 indicates a permanent URL redirect.
- $host: Refers to the server's domain address.
- $request_uri: Refers to the URL requested by the client.

By adding just two lines for the if statement to the Nginx configuration, we were able to easily implement HTTPS redirection.
