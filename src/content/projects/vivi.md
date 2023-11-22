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

### GodView

### X.A.N.A

### OpenVivi