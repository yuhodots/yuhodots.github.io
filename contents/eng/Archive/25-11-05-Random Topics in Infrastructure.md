---
title: "Random Topics in Infrastructure"
date: "2025-11-05"
template: "post"
draft: false
path: "/cheatsheet/25-11-05/"
description: "Notes on various dev infrastructure topics I've studied. Talos Linux: A modern, immutable, and minimal OS designed for running Kubernetes. API-based management: The standout feature. No SSH access or shell provided. All configuration and management is done via gRPC API through the `talosctl` CLI. Immutable: The OS itself runs from a read-only file system (SquashFS) loaded into memory..."
category: "Cheat Sheet"
---

> Notes on various dev infrastructure topics I've studied.

### K8S Cluster

- Talos Linux: A modern, immutable, and minimal OS designed for running Kubernetes
    - **API-based management**: The standout feature. **No SSH access or shell provided**. All configuration and management is done via gRPC API through the `talosctl` CLI.
    - **Immutable**: The OS itself runs from a **read-only** file system (SquashFS) loaded into memory. This prevents errors from configuration changes and ensures a predictable state.
    - **Stateless**: Nodes themselves hold almost no state, so if a node has issues, you can simply terminate it and start a new one to easily join it to the cluster.
    - No unnecessary packages or services are included, reducing the attack surface.
    - Regular nodes (e.g., Ubuntu) require SSH access to modify `kubelet` settings, but Talos 'pushes' declarative YAML configuration files via API to atomically upgrade or change the entire cluster.

### Networking

- Ingress: An API object that manages HTTP/S traffic coming from outside the cluster to internal services. Acts as an L7 load balancer, providing hostname or path-based routing (e.g., Nginx Ingress Controller, Traefik)
    - What is an L7 load balancer?: Operates at OSI Layer 7 (Application), an intelligent router that inspects HTTP/S traffic content (URL, headers, etc.) and distributes requests accordingly (e.g., `example.com/api` goes to server A, `example.com/images` goes to server B)

- Egress: Controls traffic going from inside the cluster to the outside. Primarily used for security purposes, restricting specific Pods to communicate only with allowed external IPs or domains (e.g., Calico/Cilium Network Policy)

- ExternalDNS: When Ingress or Service resources are created, it detects the external IP of that resource and automatically creates/updates DNS records (A, CNAME, etc.) in external DNS providers like AWS Route 53 or Google Cloud DNS.
    - A (Address) Record: Directly maps a domain name (e.g., `google.com`) to an IP address (e.g., `172.217.14.228`)
    - CNAME (Canonical Name): Maps a domain name (e.g., `www.example.com`) as an alias to another domain name (e.g., `example.com`)

- CoreDNS: The default internal DNS server for Kubernetes clusters. Performs service discovery by resolving service names like `my-service.my-namespace.svc.cluster.local` to internal IPs (ClusterIP).

- Tailscale: A zero-config VPN solution. Useful for building secure private networks (mesh) between K8s clusters distributed across multiple environments (cloud, on-premises) without complex firewall configurations, or for developers to securely access cluster API servers.

- iptables: A Linux firewall and packet filtering tool that controls network traffic (packet) routing, filtering, NAT (address translation), and more.

- **Subnet**: A network divided into smaller, more manageable segments.

    - In K8S, the actual network is subdivided into Pod IP ranges (CIDR), Service IP ranges (CIDR), node IPs, etc.
    - A 32-bit number that distinguishes the "network area" from the "host (individual device) area" in an IP address.

- **CIDR (Classless Inter-Domain Routing)**: A shorthand notation that combines an IP address and subnet mask into one expression.

    - For example, in `192.168.0.0/16`, the `/16` means the first 16 bits are used for the network portion.

    - `/24` -> 255.255.255.0 (256 IPs, e.g., 192.168.1.0~192.168.1.255) -> The first 24 bits (255.255.255.) are 'network', and the last 8 bits (.0~.255) are 'host'
    - `/16` -> 255.255.0.0 (65,536 IPs, e.g., 192.168.0.0~192.168.255.255)

- Private Network & Public Network

    - Private: IP ranges not directly exposed to the internet. (e.g., 10.0.0.0/8, 192.168.0.0/16)
    - Public: Public IPs directly exposed to the internet.
    - In K8S, most Pods and Nodes operate in private networks, connecting to the public network through Ingress or LoadBalancer only when external service exposure is needed.

##### Container Network Interface (CNI)

A standard specification that defines how container runtimes attach network interfaces and assign IPs to Pods.

- Flannel: One of the simplest CNIs. Builds VXLAN-based overlay networks; easy to configure but basic in functionality.
- Calico: Known for high-performance networking and powerful Network Policy. Supports both overlay (VXLAN) and non-overlay (BGP) modes.
    - VXLAN: A virtual network technology that encapsulates data and sends it through tunnels over a physical network (L3). This allows Kubernetes Pods to communicate as if they were in the same room even when spread across different servers, and overcomes the scalability limits of VLANs (16 million).
    - BGP: The core routing protocol of the internet. A set of rules for exchanging information about "the best route to a given IP address" between large autonomous systems (AS, large-scale networks like ISPs). In Calico, this is applied to datacenter internal networks to optimize Pod-to-Pod routing without overlay.

- Weave: Provides overlay networking along with network encryption and built-in DNS.
- Cilium: A modern CNI based on eBPF (extended Berkeley Packet Filter).
    - Uses eBPF to handle networking, load balancing, and security policies directly in the Linux kernel. Much faster and more efficient than traditional `iptables`-based CNIs.
    - Can implement L7 traffic visibility, encryption, and advanced network policies using eBPF alone, without sidecar proxies (e.g., Envoy).
    - Synergy with Talos: Talos aims for a minimal OS managed via API, and Cilium's eBPF approach leverages modern kernel capabilities while reducing dependency on complex userspace configurations like `iptables`, aligning well with Talos's minimalist philosophy.

### Autoscaling

##### Pod Autoscaling

- Metrics Server: An addon that collects basic resource metrics such as CPU and memory usage from Kubelet for nodes and Pods, and provides them through the Kubernetes Metrics API.
- HPA (Horizontal Pod Autoscaler): Automatically scales the number of Pod replicas up or down based on metrics provided by the Metrics Server (e.g., CPU usage exceeding 80%).

##### Node Autoscaling

- Cluster Autoscaler (CA): **Detects Pods that cannot be scheduled and are in Pending state** due to insufficient resources.
    - Scale Out: When it determines that new nodes are needed to accommodate Pending Pods, it adjusts the desired size of the cloud provider's **Auto Scaling Group (ASG)** or **MachineSet** to add nodes.
    - Scale In: When it detects nodes with low utilization for a certain period, it **drains the Pods on that node to other locations and removes the node from the ASG**.
- Karpenter: Like CA, **detects Pods in Pending state**.
    - Scale Out: **Does not rely on ASGs**; instead, it **directly provisions nodes through cloud APIs** that precisely meet the resource requirements (CPU, memory, GPU, architecture, etc.) of Pending Pods.
    - Scale In: Consolidates or terminates nodes based on node utilization or TTL (Time to Live).
- Advantages of Karpenter:
    1. Speed: Scale-out is much faster since it creates nodes directly without going through ASGs.
    2. Flexibility/Efficiency: Dynamically selects various instance types (Spot, On-Demand) to create nodes that are a 'perfect fit' for `Pending` Pods, resulting in high resource efficiency. (CA only uses instance types from pre-defined ASGs)
    3. Simplicity: Instead of pre-defining multiple node pools (ASGs), a single Karpenter `Provisioner` configuration can flexibly manage everything.

### NVIDIA Device

- NVIDIA Device Plugin: The official plugin that enables Kubernetes to recognize and schedule NVIDIA GPUs. **Runs as a DaemonSet on each GPU node**. It operates in the following order:
    1. Detects GPUs installed on the node
    2. Monitors GPU status
    3. Registers `nvidia.com/gpu` as an Extended Resource with Kubelet
    4. When a Pod requests a GPU with `resources: limits: { nvidia.com/gpu: 1 }`, Kubelet calls the plugin to mount the necessary GPU device and driver volumes to the container

- NVLink: A high-speed P2P (Point-to-Point) interconnect technology between NVIDIA GPUs, or between GPUs and CPUs.
    - Provides much higher bandwidth than traditional PCIe bus (e.g., hundreds of GB/s), enabling GPUs to access each other's memory very quickly.
      - PCIe bus: A standard data pathway (interface) for connecting high-performance devices like graphics cards, SSDs, and network cards to the computer motherboard (CPU) at very high speeds.
    - In distributed training of large models (e.g., LLMs), the speed of data (weights, gradients) synchronization between GPUs determines overall speed, and NVLink significantly alleviates this communication bottleneck.

- MIG (Multi-Instance GPU): A feature of the latest NVIDIA GPUs (A100, H100, etc.) that partitions a single physical GPU into multiple isolated GPU instances.
    - Instead of `nvidia.com/gpu: 1`, you can allocate smaller GPU slices like `nvidia.com/mig-1g.10gb: 1` to Pods.
    - Very useful for maximizing resource utilization by running multiple small inference workloads simultaneously on a single GPU.

- GPUDirect RDMA: A technology that allows GPU memory and network cards to exchange data directly without going through the CPU. Dramatically reduces inter-node communication latency in distributed deep learning environments.
