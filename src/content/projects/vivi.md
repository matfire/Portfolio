---
title: Vivi
githubUrl: https://github.com/vivitek
summary: network monitoring made easy
epitech: true
image: ./images/vivi_img.webp
date: 2022-01-01
stack:
- typescript
- nestjs
- react
- graphql
- python
- docker
---

Vivi was the culmination of a 5 year masters degree program at [Epitech](https://epitech.eu). With a team of 6 other students, we managed to build a user-friendly router and centralized interface aimed toward event organizers.

## Features

- Plug and Play
- Ban devices
- Restrict authorized domains / ip addresses
- Save router configuration (banned devices and domains)
- Load configuration on another router

## The router

During the development phase the router was based on a Raspberry PI 4 with some customized tooling. The purpose of this object was to be placed at the root of a LAN (we did not support WAN and acting as a bridge between the two) and would be the one in charge of distributing IPv4 addresses and route traffic to the "real router" (or elsewhere).

![a schema representing the router](https://cdn.blog.matteogassend.com/vivi_box_schema.png)

### Services

#### Redis

Stores temporary information for all services, including the initial configuration retrieved at boot time by the [Bridge](#bridge) service.

#### RabbitMQ

Handles realtime information retrieval from the [DHCP](#dhcp) and [Pcap](#pcap) services.

#### DHCP

The DHCP handles delivering ip addresses to connected devices.

#### PCap

The PCap service runs a pcap (packet capture) service to determine where the traffic is coming from and going to the observed network and sends its findings to the bridge.

#### Bridge

The bridge service takes the information from the other services and acts as broker between the router and the central server. It sends data from the services to the server and applies what the server decides.

#### OpenVivi embedded

OpenVivi is the embedded API that allows each device to be controlled remotely from the server thanks to a secure reversed SSH tunnel.

## The Server

The server is the brain of the whole project; it collects all the information from the deployed routers, sends them to the different clients, retrieves the clients' actions and dispatches instructions accordingly. It all works from inside a Docker stack (docker compose), including a reverse proxy and ssl management using [Traefik](https://traefik.io/traefik/). The API is built using [NestJS](https://github.com/nestjs/nest) and sends data using GraphQL (HTTP and Websockets for realtime information).

### How


### Internal Services

- MongoDB: the main database provider for everything
- Prometheus: data ingester
- Grafana: dashboard for data visualization
- Traefik: HTTP Reverse Proxy

### External Services

- Pusher Beams: handle push notifications to users

## The interface

## Other Created Services

Alongside the main products we built, we realized we needed some additional internal tools.

### OpenVivi

OpenVivi is the server that handles all [OpenVivi Embedded](#openvivi-embedded) instances.

- when a router first starts, it sends a request to this server to receive a certificate and a port
- the server creates an nginx configuration to match the router's identifier and proxies its request to the port it sent back to the router
- the router, using the certificate and the port, opens a reverse ssh tunnel to the server
- now, all traffic sent to the specified domain gets directly transferred to the router

#### Why a reverse ssh tunnel

Since the router may be setup inside a protected network, the server cannot be the one initializing the connection (it may get blocked). So the router is the one sending the initial connection request that gets "hijacked" by the server to be used instead.

### GodView

The GodView was an internal tool used to see the status of all routers and users accross the whole organization. It could also be used to talk to OpenVivi's embedded instances and trigger reboots, updates etc.

### X.A.N.A

We decided to make available to our users a pregenerated list of domains we considered problematic. This list, however, is obviously not exhaustive and would have needed to get constantly updated. We decided to have an opt-in service where we would receive a noification whenever a domain name we hadn't yet categorized and could update the list, thus improving the experience for every current and future client. X.A.N.A. was basically a Discord bot that talked to a PostgreSQL database (the list I mentioned earlier)