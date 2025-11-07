---
title: "Random Topics in Infrastructure"
date: "2025-11-05"
template: "post"
draft: false
path: "/cheatsheet/25-11-05/"
description: "Dev 인프라 관련 공부한 내용을 아래에 기록합니다. Talos Linux: Kubernetes 실행을 위해 설계된 현대적이고, immutable 하고, 미니멀한 OS. API 기반 관리: 가장 큰 특징. SSH 접속이나 쉘을 제공하지 않음. 모든 설정과 관리는 `talosctl` CLI를 통한 gRPC API로 이루어짐. Immutable: OS 자체가 읽기 전용 파일 시스템(SquashFS)에서..."
category: "Cheat Sheet"
---

> Dev 인프라 관련 공부한 내용을 아래에 기록합니다.

### K8S Cluster

- Talos Linux: Kubernetes 실행을 위해 설계된 현대적이고, immutable 하고, 미니멀한 OS
    - **API 기반 관리**: 가장 큰 특징. **SSH 접속이나 쉘을 제공하지 않음**. 모든 설정과 관리는 `talosctl` CLI를 통한 gRPC API로 이루어짐
    - **Immutable**: OS 자체가 **읽기 전용** 파일 시스템(SquashFS)에서 메모리로 로드되어 실행. 이는 설정 변경으로 인한 오류를 방지하고 예측 가능한 상태를 보장
    - **Stateless**: 노드 자체가 상태를 거의 갖지 않아, 노드에 문제가 생기면 간단히 종료하고 새 노드를 시작해 클러스터에 쉽게 join 시킬 수 있음
    - 공격 표면을 줄이기 위해, 불필요한 패키지나 서비스가 전혀 포함되지 않음
    - 일반 노드(e.g., Ubuntu)는 SSH로 접속해 `kubelet` 설정을 수정하지만, Talos는 선언적인 YAML 설정 파일을 API로 'push'하여 클러스터 전체를 원자적(atomic)으로 업그레이드하거나 변경

### Networking

- Ingress: 클러스터 외부에서 내부 서비스로 들어오는 HTTP/S 트래픽을 관리하는 API 객체. L7 로드 밸런서 역할을 하며, 호스트명이나 경로 기반 라우팅을 제공 (e.g., Nginx Ingress Controller, Traefik)
    - L7 로드밸런서란?: OSI 7계층(애플리케이션)에서 작동하며, HTTP/S 트래픽의 내용(URL, 헤더 등)을 보고 요청을 분배하는 지능형 라우터(`example.com/api`는 A서버로, `example.com/images`는 B서버로 분배 가능)

- Egress: 클러스터 내부에서 외부로 나가는 트래픽을 제어. 주로 보안을 목적으로, 특정 Pod이 허용된 외부 IP나 도메인으로만 통신하도록 제한하는 데 사용 (e.g., Calico/Cilium의 Network Policy)

- ExternalDNS: Ingress나 Service 리소스가 생성될 때, 해당 리소스의 외부 IP를 감지해 AWS Route 53, Google Cloud DNS 등 외부 DNS 프로바이더에 자동으로 DNS 레코드(A, CNAME 등)를 생성/업데이트ㅂ
    - A (Address) 레코드: 도메인 이름(e.g., `google.com`)을 IP 주소(e.g., `172.217.14.228`)로 직접 매핑
    - CNAME (Canonical Name): 도메인 이름(e.g., `www.example.com`)을 다른 도메인 이름(e.g., `example.com`)으로 매핑하는 별칭

- CoreDNS: Kubernetes의 기본 클러스터 내부 DNS 서버. `my-service.my-namespace.svc.cluster.local` 같은 서비스 이름을 내부 IP(ClusterIP)로 변환해주는 서비스 디스커버리 역할 수행

- Tailscale: Zero-config VPN 솔루션. 복잡한 방화벽 설정 없이도, 여러 환경(클라우드, 온프레미스)에 분산된 K8s 클러스터 간의 안전한 비공개 네트워크(Mesh)를 구성하거나 개발자가 클러스터 API 서버에 안전하게 접근할 때 유용

- iptables: 리눅스에서 네트워크 트래픽(패킷)의 라우팅, 필터링, NAT(주소 변환) 등을 제어하는 방화벽 및 패킷 필터링 도구

- **서브넷(subnet)**: 네트워크를 작고 관리하기 쉬운 여러 개로 나눈 것.

    - K8S에서는 Pod의 IP 대역(CIDR), Service의 IP 대역(CIDR), 노드의 IP 등으로 실제 네트워크가 세분화됨
    - IP 주소에서 "네트워크 영역"과 "호스트(개별 기기) 영역"을 구분해 주는 숫자(32비트)

- **CIDR(Classless Inter-Domain Routing)**: IP 주소와 서브넷 마스크를 축약해서 하나로 표기하는 방법

    - 예를 들어, `192.168.0.0/16`에서 `/16`은 앞에서 16비트를 네트워크로 쓰겠다는 뜻

    - `/24` → 255.255.255.0 (256개 IP, 예: 192.168.1.0~192.168.1.255) → 앞 24비트(255.255.255.)는 '네트워크', 마지막 8비트(.0~.255)가 '호스트'
    - `/16` → 255.255.0.0 (65,536개 IP, 예: 192.168.0.0~192.168.255.255)

- 사설망(Private Network) & 퍼블릭망(Public Network)

    - 사설망(Private): 인터넷에 직접 노출되지 않는 IP 대역. (예: 10.0.0.0/8, 192.168.0.0/16)
    - 퍼블릭망(Public): 인터넷에 직접 노출되는 공인 IP
    - K8S에서는 대부분 Pod, Node가 사설망에서 동작하고, 외부 서비스 공개가 필요할 때만 Ingress나 LoadBalancer를 통해 Public망에 연결

##### Container Network Interface (CNI)

Container runtime이 Pod에 네트워크 인터페이스를 연결하고 IP를 할당하는 방법을 정의하는 표준 규격

- Flannel: 가장 단순한 CNI 중 하나. VXLAN 기반 오버레이 네트워크를 구성하며 설정이 쉽지만 기능은 기본적
- Calico: 고성능 네트워킹과 강력한 Network Policy가 특징. 오버레이(VXLAN) 모드와 비-오버레이(BGP) 모드를 모두 지원
    - VXLAN: 물리적 네트워크(L3) 위에 데이터를 캡슐화하여 터널로 보내는 가상 네트워크 기술. 이를 통해 쿠버네티스 Pod들이 서로 다른 서버에 흩어져 있어도 마치 같은 방에 있는 것처럼 통신할 수 있으며, VLAN의 확장성 한계(1,600만 개)를 극복
    - BGP: 인터넷의 핵심 라우팅 프로토콜로, 거대한 자율 시스템(AS, ISP 같은 대규모 네트워크) 간에 "어떤 IP 주소로 가는 가장 좋은 경로가 무엇인지" 서로 정보를 교환하는 규칙. Calico에서는 이를 데이터센터 내부 네트워크에 적용해 오버레이 없이 Pod 간 라우팅을 효율화

- Weave: 오버레이 네트워크와 함께 네트워크 암호화, 내장 DNS 등을 제공
- Cilium: eBPF(extended Berkeley Packet Filter)를 기반으로 하는 현대적인 CNI
    - eBPF를 사용해 Linux 커널에서 직접 네트워킹, 로드 밸런싱, 보안 정책을 처리. 기존 `iptables` 기반 CNI보다 훨씬 빠르고 효율적
    - Sidecar 프록시(e.g., Envoy) 없이도 L7 트래픽 가시성, 암호화, 고급 네트워크 정책을 eBPF만으로 구현가능
    - Talos와의 시너지: Talos는 최소한의 OS를 지향하고 API로 관리되는데, Cilium의 eBPF 접근 방식은 커널의 현대적 기능을 활용하며 `iptables` 등 복잡한 유저스페이스 설정 의존성을 줄여주어, Talos의 미니멀한 철학과 잘 맞음

### Autoscaling

##### Pod Autoscaling

- Metrics Server: Kubelet에서 수집한 노드 및 Pod의 CPU, 메모리 사용량 등 기본 리소스 메트릭을 수집하여 Kubernetes Metrics API를 통해 제공하는 애드온
- HPA (Horizontal Pod Autoscaler): Metrics Server가 제공하는 메트릭(e.g., CPU 사용률 80% 초과)을 기반으로 Pod의 개수(Replicas)를 자동으로 늘리거나 줄임

##### Node Autoscaling

- Cluster Autoscaler (CA): 리소스 부족으로 스케줄링되지 못하고 **Pending 상태인 Pod을 감지**
    - 스케일 아웃: Pending Pod을 수용할 새 노드가 필요하다고 판단되면, 클라우드 프로바이더의 **Auto Scaling Group (ASG)** 또는 **MachineSet의 desired 크기를 조절**하여 노드를 추가
    - 스케일 인: 특정 시간 동안 사용률이 낮은 노드를 감지하면, 해당 **노드의 Pod을 다른 곳으로 옮기고(Drain) 노드를 ASG에서 제거**
- Karpenter: CA와 마찬가지로 **Pending 상태의 Pod**을 감지
    - 스케일 아웃: **ASG에 의존하지 않고**, Pending Pod이 요구하는 리소스(CPU, 메모리, GPU, 아키텍처 등)를 정확히 충족하는 노드를 클라우드 **API를 통해 직접 프로비저닝**
    - 스케일 인: 노드 사용률이나 수명(TTL)을 기반으로 노드를 통합(Consolidation)하거나 종료
- Karpenter의 장점
    1.  속도: ASG를 거치지 않고 직접 노드를 생성하므로 스케일 아웃 속도가 훨씬 빠름
    2.  유연성/효율성: 다양한 인스턴스 타입(Spot, On-Demand)을 동적으로 선택해 `Pending` Pod에 '딱 맞는' 노드를 생성하므로 리소스 효율성이 높음. (CA는 미리 정의된 ASG의 인스턴스 타입만 사용)
    3.  단순함: 여러 종류의 노드 풀(ASG)을 미리 정의할 필요 없이, Karpenter의 `Provisioner` 설정 하나로 유연하게 관리 가능

### NVIDIA Device

- NVIDIA Device Plugin: Kubernetes가 NVIDIA GPU를 인식하고 스케줄링하도록 해주는 공식 플러그인. **각 GPU 노드에서 DaemonSet**으로 실행. 아래의 순서로 동작함
    1. 노드에 장착된 GPU를 감지
    2. GPU 상태를 모니터링
    3. `nvidia.com/gpu`라는 Extended Resource를 Kubelet에 등록
    4. Pod이 `resources: limits: { nvidia.com/gpu: 1 }`처럼 GPU를 요청하면, Kubelet이 플러그인을 호출해 필요한 GPU 디바이스와 드라이버 볼륨을 컨테이너에 마운트
    
- NVLink: NVIDIA GPU 간, 또는 GPU와 CPU 간의 고속 P2P(Point-to-Point) 상호연결 기술
    - 기존 PCIe 버스보다 훨씬 높은 대역폭(e.g., 수백 GB/s)을 제공하여 GPU들이 서로의 메모리에 매우 빠르게 접근할 수 있게 함
      - PCIe 버스: 그래픽카드, SSD, 네트워크 카드 같은 고성능 장치들을 컴퓨터 메인보드(CPU)에 매우 빠른 속도로 연결하기 위한 표준 데이터 통로(인터페이스)
    - 대규모 모델(e.g., LLM)을 분산 학습시킬 때, GPU 간 데이터(가중치, 그래디언트) 동기화 속도가 전체 속도를 좌우하는데 NVLink는 이 통신 병목 현상을 크게 완화.
    
- MIG (Multi-Instance GPU): 최신 NVIDIA GPU(A100, H100 등)의 기능으로, 하나의 물리적 GPU를 여러 개의 격리된 GPU 인스턴스로 분할
    - `nvidia.com/gpu: 1`이 아닌 `nvidia.com/mig-1g.10gb: 1`처럼 더 작은 GPU 조각을 Pod에 할당할 수 있음
    - 여러 개의 작은 추론(Inference) 워크로드를 하나의 GPU에서 동시에 실행하여 리소스 활용률을 극대화하는 데 매우 유용

- GPUDirect RDMA: GPU 메모리와 네트워크 카드가 CPU를 거치지 않고 직접 데이터를 주고받게 하는 기술. 분산 딥러닝 환경에서 노드 간 통신 레이턴시를 획기적으로 줄임

