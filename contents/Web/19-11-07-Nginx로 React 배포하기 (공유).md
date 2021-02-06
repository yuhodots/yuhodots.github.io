---
title: "Nginx로 React 배포하기 (공유)"
date: "2019-11-07"
template: "post"
draft: false
path: "/server/19-11-07/"
description: "저는 현재 프론트엔드 라이브러리로 React를 사용하고 있으며, 웹 서버로는 Nginx를 사용하고 있습니다. 이번에 이를 서비스하기 위해 Nginx로 React를 배포하는 방법에 대해 찾아보다가 발견한 좋은 포스팅을 아래에 링크로 공유합니다. "
category: "Server"
thumbnail: "nginx"
---

저는 현재 프론트엔드 라이브러리로 React를 사용하고 있으며, 웹 서버로는 Nginx를 사용하고 있습니다. 아직은 서버 컴퓨터에서 작성한 코드를 서비스하지 않은 상태였는데, 이번에 이를 서비스하기 위해 Nginx로 React를 배포하는 방법에 대해 찾아보았고 이와 관련하여 잘 포스팅 된 내용들을 아래에 링크로 공유합니다. 

- https://codechacha.com/ko/deploy-react-with-nginx/

- https://blog.naver.com/PostView.nhn?blogId=dilrong&logNo=221497936351

 npm run build를 통해 React 앱을 빌드하고, 이후 nginx의 config 파일을 수정하는 과정에 대해 설명해주셨습니다.