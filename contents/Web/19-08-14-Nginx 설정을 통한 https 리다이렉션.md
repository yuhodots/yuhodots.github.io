---
title: "Nginx 설정을 통한 https 리다이렉션"
date: "2019-08-14"
template: "post"
draft: false
path: "/server/19-08-14/"
description: "이전 포스팅에서는 SSL 인증을 받고 이를 도메인에 연결한 뒤 node.js 내 app.js에서 http 접속을 강제로 https로 리다이렉션 하는 방법에 대해 알아보았습니다. 이번에는 nginx에서 https 리다이렉션을 구현하는 방법에 대해서 알아보도록 하겠습니다."
category: "Server"
thumbnail: "nginx"
---

이전 포스팅에서는 SSL 인증을 받고 이를 도메인에 연결한 뒤 node.js 내 app.js에서 http 접속을 강제로 https로 리다이렉션 하는 방법에 대해 알아보았습니다. 이번에는 node.js가 아니라, nginx에서 https 리다이렉션을 구현하는 방법에 대해서 알아보도록 하겠습니다. 본 포스팅은 아래의 조건을 충족한 분들을 위한 포스팅입니다. 

1. SSL인증서를 발급 받았음
2. AWS ELB를 이용해 인증서를 웹 사이트 도메인에 적용하였음
3. Node.js의 프록시 서버로 Nginx를 사용하고 있음

### HTTPS redirection

 Classic Load Balancer는 아래의 X-Forwarded 헤더를 지원합니다. 저는 이 중 X-Forwarded-Proto 헤더를 이용하겠습니다.

- X-Forwarded-For : HTTP 또는 HTTPS 로드 밸런서를 사용할 때 클라이언트의 IP를 식별하는데 도움을 줌
- X-Forwarded-Proto : 클라이언트가 로드 밸런서 연결에 사용한 프로토콜(HTTP 또는 HTTPS)을 식별하는데 도움을 줌
- X-Forwarded-Port : 클라이언트가 로드 밸런서 연결에 사용한 대상 포트를 식별하는 데 도움을 줍니다.

 HTTPS redirection을 위해서는 nginx 환경설정 파일을 수정해야 합니다. nginx 환경설정은 /etc/nginx/ 디렉토리의 **nginx.conf**  파일이나, /etc/nginx/sites-enabled 디렉토리의 **default** 파일을 수정하면 됩니다. (저의 경우에는 /etc/nginx/sites-enabled 디렉토리의 **default** 파일을 수정하였습니다.)

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

 AWS에서는 Nginx 뿐만 아니라, Apache, IIS 서버에 대한 [HTTPS redirection 방법](https://aws.amazon.com/ko/premiumsupport/knowledge-center/redirect-http-https-elb/)에 대해 친절하게 설명 해 주고 있습니다. 저 또한 이 링크를 참고하였습니다.

 위의 코드에서 우리가 주목할 것은 if문 밖에 없습니다. if문 내 `($http_x_forwarded_proto = 'http')` 조건은 **클라이언트가 HTTP로 연결**을 시도하였다는 의미입니다. 이 경우에는 `return 301 https://...` 명령이 실행되면서 **클라이언트의 연결을 HTTPS 로 redirection** 합니다. 

` return 301 https://$host$request_uri` 를 상세히 살펴보면 아래와 같습니다.

- 301: HTTP 응답 상태 코드 301은 영구적인 URL 리다이렉션을 의미합니다. 
- $host: 서버의 도메인 주소를 의미합니다.
- $request_uri: 클라이언트가 요청한 url를 의미합니다.

 if문 두 줄을 nginx 환경설정에 추가함으로써 손 쉽게 HTTPS redirection을 구현 할 수 있었습니다.