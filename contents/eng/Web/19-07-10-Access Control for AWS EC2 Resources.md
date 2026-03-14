---
title: "Access Control for AWS EC2 Resources"
date: "2019-07-10"
template: "post"
draft: false
path: "/server/19-07-10/"
description: "When using an AWS EC2 instance as a server, if you're not developing alone but working on a project with a team, all team members managing the server need access to that instance."
category: "BackEnd"
thumbnail: "aws"
---

> This post is a summary of the [AWS User Guide](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/WindowsGuide/UsingIAM.html) from the official AWS website.

When using an AWS EC2 instance as a server, if you're not developing alone but working on a project with a team, all team members managing the server need access to that instance. However, when an instance is first created, a key-pair file is provided to only one user. This made me wonder how to collaborate with other team members, which led me to write this post.

> Security credentials are used to identify you with AWS services and grant you unlimited access to AWS resources such as Amazon EC2 resources. You can use the features of Amazon EC2 and AWS Identity and Access Management (IAM) to allow other users, services, and applications to use your Amazon EC2 resources without sharing your security credentials. You can use IAM to control how other users use resources in your AWS account, and you can use security groups to control access to your Amazon EC2 instances. You can allow either full or restricted use of your Amazon EC2 resources.

The official AWS documentation explains this content very well. To summarize it in my own words, we need to configure settings for three areas: **Security Groups, AMI & EBS, and IAM**.

First is the **Security Group** configuration. When launching an instance, we assign one or more security groups. Since security groups act as firewalls that control the traffic allowed to reach the instance, you need to modify the rules within the security group to allow collaborators access to the instance. (You can change an instance's security group through 'Right-click on your instance - Networking - Change Security Groups'.)

Second is the **AMI & EBS** configuration. First, here are the descriptions of both services: An Amazon Machine Image (AMI) is a template that contains a software configuration (e.g., operating system, application server, applications). After creating an AMI, you can easily create multiple instances with identical environments. Amazon Elastic Block Store (EBS) provides persistent block storage volumes for use with EC2 instances. According to Amazon, each Amazon EBS volume is automatically replicated within its availability zone, protecting you from component failure while providing high availability and durability. Access control for AMI is managed through the LaunchPermission attribute, and control over which AWS accounts can use Amazon EBS snapshots is managed through the createVolumePermission attribute.

Third is the **IAM** configuration. If you want to control the following items, check IAM:

- Create users and groups belonging to your AWS account
- Assign unique security credentials to each user in your AWS account
- Control each user's permissions to use AWS resources when performing tasks
- Share AWS resources with users from other AWS accounts
- Create rules for your AWS account and define users or services to manage those rules
- Allow permissions to use AWS resources with your enterprise's existing credentials

The source link above provides detailed procedures, but let me summarize it in my own way again.

First, go to the IAM console [link](https://console.aws.amazon.com/iam/) and click **Groups - Create New Group**. After setting the **group name** and completing the **permission settings (attaching policies)** for group users, a new group is created. Then select **Add Users** to the created group, and after going through steps like setting the access type, console password, and granting permissions, the IAM group and user creation is complete.

In my case, I set the group name to 'admin' and set the group policy to AdministratorAccess. I found a well-organized [post](https://www.44bits.io/ko/post/first_actions_for_setting_secure_account#그룹을-사용하여-권한-할당) related to this and would like to share it.
