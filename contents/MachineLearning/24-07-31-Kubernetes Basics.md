---
title: "Kubernetes Basics"
date: "2024-07-31"
template: "post"
draft: false
path: "/Operations/24-07-31/"
description: "Kubernetes는 컨테이너 오케스트레이션 플랫폼 중 하나로 다수의 컨테이너 어플리케이션을 운영 및 관리하고, 배포하고, 확장할 수 있는 여러 자동화된 기능들을 제공하고 있습니다. 본 포스팅에서는 Kubernetes의 기본 개념과 kubectl, helm 등에 대해 기록합니다."
category: "Operations"
thumbnail: "k8s"
---

> Kubernetes는 컨테이너 오케스트레이션 플랫폼 중 하나로 다수의 컨테이너 어플리케이션을 운영 및 관리하고, 배포하고, 확장할 수 있는 여러 자동화된 기능들을 제공하고 있습니다. 본 포스팅에서는 Kubernetes의 기본 개념과 kubectl, helm 등에 대해 기록합니다..

### Kubernetes Components

쿠버네티스 클러스터를 갖기 위해 필요한 요소들은 다음과 같습니다. 

- 컨트롤 플레인 컴포넌트
  - kube-apiserver: Kubernetes API 서버로서 클러스터의 모든 요청을 처리하고 인증, 권한 부여, API 검증/설정을 담당
  - etcd: 모든 클러스터 데이터를 저장하는 고가용성 키-값 저장소로, Kubernetes의 상태를 유지
  - kube-scheduler: 새로 생성된 Pod에 적합한 노드를 선택하는 스케줄링 작업을 수행
  - kube-controller-manager: 노드, 레플리카, 엔드포인트 등의 상태를 지속적으로 관리하고 조정하는 컨트롤러들을 실행
  - cloud-controller-manager: 클러스터 자원을 관리하고 조정

- 노드 컴포넌트

  - kubelet: 각 노드에서 실행되며 Pod 및 컨테이너의 상태를 관리하고 보고

  - kube-proxy: 네트워크 프록시로서 네트워킹을 관리하고 Kubernetes 서비스 간의 통신을 처리

  - 컨테이너 런타임 (Kubernetes CRI - containerd, CRI-O...): 컨테이너를 실행하고 관리하는 소프트웨어

- 애드온

  - DNS: Kubernetes 서비스 간의 이름 해석을 제공하여 네트워킹을 간소화

  - 웹 UI (대시보드): 클러스터의 상태를 모니터링하고 관리하기 위한 사용자 인터페이스를 제공

  - 컨테이너 리소스 모니터링: 각 컨테이너의 리소스 사용량을 추적하고 모니터링

  - 클러스터-레벨 로깅: 클러스터 내의 로그 데이터를 수집하고 저장하여 문제 해결과 감사에 사용

### Kubernetes Objects

쿠버네티스 시스템에서 영속성을 가지는 오브젝트 kubernetes objects라고 말하는데, 공식 홈페이지에서는 '하나의 의도를 담은 레코드'라고 설명하고 있습니다. 

- 어떤 애플리케이션이 동작 중이고, 어느 노드에서 위치하는지 기술
- 해당 애플리케이션이 이용할 수 있는 리소스 기술
- 해당 애플리케이션의 재구동 정책, 업그레이드 정책 등 여러 정책적 요소는 어떤지 기술

##### Object spec

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

- `apiVersion`: 오브젝트를 생성에 사용되는 쿠버네티스 API 버전
- `kind`: 오브젝트 종류
- `metadata`: 클러스터 내에서 오브젝트를 구분지어 주기 위한 정보
- `spec`: 오브젝트에 대해 어떤 상태를 의도하는지에 대한 정보

##### Resources

- 워크로드 리소스

  - Pod: 하나 이상의 컨테이너를 포함하는 가장 작은 배포 단위

  - ReplicationController: 원하는 수의 Pod를 유지하도록 관리

  - ReplicaSet: 특정 수의 Pod를 유지하도록 관리

  - Deployment: 애플리케이션의 선언적 업데이트를 제공

  - StatefulSet: 고유하고 안정적인 네트워크 식별자와 스토리지의 순서를 보장하는 애플리케이션을 관리

  - DaemonSet: 모든 (또는 일부) 노드에서 실행되는 Pod를 보장

  - Job: 일회성 작업을 관리하고 완료를 보장

  - CronJob: 일정에 따라 주기적으로 작업을 수행

- 네트워킹 리소스

  - Service: Pod 간의 네트워크 접속을 관리

  - Ingress: 외부 HTTP 및 HTTPS 트래픽을 클러스터 내의 서비스로 라우팅

  - NetworkPolicy: Pod의 네트워크 트래픽을 제어

- 구성 리소스

  - ConfigMap: 애플리케이션 설정 데이터를 저장하고 관리

  - Secret: 민감한 데이터(예: 비밀번호, 토큰, 키)를 저장하고 관리

- 권한 부여 리소스

  - ServiceAccount: Pod에 권한을 부여하기 위한 사용자 계정

  - Role: 네임스페이스 내 리소스에 대한 권한을 정의

  - ClusterRole: 클러스터 전체에 걸쳐 리소스에 대한 권한을 정의

  - RoleBinding: 네임스페이스 내의 사용자/그룹에 역할을 부여

  - ClusterRoleBinding: 클러스터 전체의 사용자/그룹에 역할을 부여

- 정책 리소스

  - PodSecurityPolicy: Pod 보안 정책을 정의하여 Pod의 보안 설정을 제어
  - ResourceQuota: 네임스페이스 내에서 리소스 사용량을 제한

  - LimitRange: 네임스페이스 내의 리소스 사용량을 제한하고 요청과 한계를 정의

- 클러스터 관리 리소스

  - Namespace: 논리적으로 클러스터 리소스를 그룹화

  - Node: 클러스터 내의 단일 노드를 나타냄

  - PersistentVolume (PV): 클러스터 내의 스토리지 리소스를 나타냄

  - PersistentVolumeClaim (PVC): 사용자와 Pod가 사용할 스토리지를 요청

  - StorageClass: 스토리지 제공자의 스토리지 설정을 정의

  - VolumeAttachment: 외부 스토리지 시스템의 볼륨을 클러스터의 노드에 연결

- 기타

  - HorizontalPodAutoscaler: 애플리케이션의 부하에 따라 Pod의 수를 자동으로 조정

  - VerticalPodAutoscaler: Pod의 리소스 요청을 자동으로 조정

  - PodDisruptionBudget: 클러스터 관리 중에 서비스 가용성을 보장하기 위한 최소 Pod 수를 정의

  - CustomResourceDefinition (CRD): 사용자 정의 리소스를 정의하여 Kubernetes API를 확장

### Kubectl

Kubernetes API를 사용하여 쿠버네티스 클러스터의 컨트롤 플레인과 통신하기 위한 커맨드라인 툴을 kubectl 이라고 합니다. kubectl 관련 *[명령어](https://kubernetes.io/ko/docs/reference/kubectl/#명령어), [지원 리소스 타입](https://kubernetes.io/ko/docs/reference/kubectl/#리소스-타입), [출력 설정](https://kubernetes.io/ko/docs/reference/kubectl/#출력-옵션)* 등에 대한 더 자세한 설명은 공식 홈페이지에 기술되어 있습니다. 

```
kubectl [command] [TYPE] [NAME] [flags]
```

- `command`: 수행할 작업을 지정

  - `get`: 리소스 조회
  - `create`: 새로운 리소스 생성
  - `apply`: YAML 파일을 이용해 리소스를 생성 또는 업데이트
  - `delete`: 리소스 삭제
  - `describe`: 리소스의 상세 정보를 표시
  - `edit`: 리소스 편집
  - `logs`: 특정 Pod의 로그 조회

- `TYPE`: 리소스 타입을 지정. 리소스 유형은 단수형과 복수형을 모두 사용할 수 있음

  - `pod`, `pods`, `deployment`, `deployments`, `service`, `services`, `node`, `nodes`, `configmap`, etc.

- `NAME`: 작업할 리소스의 유형을 지정. 이름 생략시, 해당 리소스 유형의 모든 인스턴스를 대상으로 명령 적용

  - 리소스가 모두 동일한 타입인 경우: `TYPE1 name1 name2 name<#>`: `kubectl get pod example-pod1 example-pod2`
  - 여러 리소스 타입을 개별적으로 지정하고 싶은 경우: `TYPE1/name1 TYPE1/name2 TYPE2/name3 TYPE<#>/name<#>`: `kubectl get pod/example-pod1 replicationcontroller/example-rc1`

  - 하나 이상의 파일로 리소스를 지정하려는 경우: `-f file1 -f file2 -f file<#>`

- `flags`: 선택적 플래그

  - `-s` 또는 `--server`: 쿠버네티스 API 서버의 주소와 포트를 지정
  - `-n` 또는 `--namespace`: 명령을 실행할 네임스페이스를 지정
  - `-o` 또는 `--output`: 출력 형식을 지정 (`-o yaml`, `-o json`, `-o wide`)
  - `--kubeconfig`: 특정 kubeconfig 파일을 사용하도록 지정
  - `--context`: 명령을 실행할 kubeconfig 컨텍스트를 지정

### YAML

- 데이터 표현: 데이터는 key, value 형태로 표현됨
- Indentation: 기본적으로는 2칸을 권장(helm에서는 2칸만 지원)하며 4칸도 가능
- Boolean: true, false 뿐만 아니라 yes, no도 지원
- List: 하이픈('-')으로 표현
  - dict와 list를 abbrviate 형태로 표현도 가능함 
  - e.g., `martin: {name: Martin D'vloper, job: Developer, skill: Elite}`
  - e.g., `fruits: ['Apple', 'Orange', 'Strawberry', 'Mango']`


- Multiline string
  - `|`: 블록 내 줄바꿈 문자를 유지
  - `>`: 블록 내 줄바꿈 문자를 스페이스로 변환
  - `|-`: 마지막 줄바꿈을 제외하고 인식
- `---`: 문서의 시작 (optional)
- `...`: 문서의 끝 (optional)

### Helm

Helm chart는 Kubernetes 애플리케이션을 정의하는 템플릿화된 YAML 파일들의 모음입니다. 하나의 chart는 애플리케이션을 배포하는 데 필요한 모든 Kubernetes 리소스를 포함하고 있습니다. 기본적인 구조는 다음과 같습니다.

- Chart.yaml: chart에 대한 메타데이터(이름, 버전, 설명 등)를 포함하는 파일
- values.yaml: chart에서 사용되는 기본값들을 정의하는 파일
- templates/: 실제 Kubernetes 리소스를 정의하는 템플릿 파일들이 위치한 디렉토리

values는 chart의 '템플릿 파일'들에 전달되는 변수 값들을 정의합니다. 기본값은 `values.yaml` 파일에 정의되며, 사용자 정의 값은 설치 시 `--values` 또는 `-f` 플래그를 사용하여 추가할 수 있습니다. values 파일을 통해 동일한 chart를 다양한 환경에서 재사용할 수 있습니다(가장 쉬운 예로는 dev, prod 분리)

```yaml
# values.yaml
replicaCount: 2
image:
  repository: nginx
  tag: stable
```

Template은 Kubernetes 리소스 정의를 동적이고 유연하게 만들기 위해 사용하는 템플릿 파일입니다. 정의된 변수들은 values 파일에서 정의된 값들로 치환되며, 이를 통해 Kubernetes 매니페스트를 동적으로 생성할 수 있습니다.

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-deployment
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: nginx
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

결과적으로, 전체적인 동작은 다음과 같습니다.

1. Helm chart는 Kubernetes 애플리케이션을 배포하는 데 필요한 모든 리소스 정의를 포함합니다.
2. values 파일을 통해 애플리케이션 배포에 사용할 값들을 설정합니다. 
3. template 파일은 values 파일의 값들을 사용하여 Kubernetes 리소스 매니페스트를 동적으로 생성합니다.
4. 최종적으로 Helm은 템플릿을 렌더링하여 완전한 Kubernetes 매니페스트 파일을 생성하고 이를 클러스터에 적용합니다. 미리 적용될 값을 확인해보기 위해서는 `--dry-run` 옵션을 사용해볼 수 있습니다 (`helm install NAME . --dry-run --values=values.yaml`).

다양한 helm 커맨드들은 공식 사이트의 [cheat sheet](https://helm.sh/docs/intro/cheatsheet/) 항목에서 확인 가능합니다.

### Local Development

![img](../img/24-07-31-1.png)

도커 데스크탑의 설정에서 k8s 항목에 들어간 뒤, 'Enable Kubernetes'을 클릭하면 로컬 환경에 k8s 클러스터를 구축할 수 있습니다. 그럼 자동으로 k8s config인 `~/.kube/config`에 docker-desktop이라는 이름의 cluster가 추가된 것을 확인할 수 있습니다. 만약 'Show system containers' 버튼을 누르셨다면, 도커 데스크탑의 container 목록에서 k8s의 시스템 컨테이너(kube-apiserver, etcd, kube-scheduler, kube-controller-manager...)들이 추가된 것 또한 확인할 수 있습니다. 

### References

- https://kubernetes.io/ko/docs/home/
- https://helm.sh/ko/docs/
- https://www.json2yaml.com/
- https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html
