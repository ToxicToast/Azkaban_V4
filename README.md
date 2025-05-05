<div align="center">
<img src="https://github.com/ToxicToast/Azkaban_V4/raw/main/assets/text_logo.png" alt="Toaster"/>
</div>

<div align="center">

[![Node Version](https://img.shields.io/static/v1?label=Node&message=23.4.0&color=purple&style=for-the-badge)](https://nodejs.org)
[![npm Version](https://img.shields.io/static/v1?label=npm&message=11.0.0&color=purple&style=for-the-badge)](https://nodejs.org)
[![Typescript Version](https://img.shields.io/static/v1?label=Typescript&message=5.7.3&color=purple&style=for-the-badge)](https://typescriptlang.org)
[![NX Version](https://img.shields.io/static/v1?label=NX&message=20.4.5&color=purple&style=for-the-badge)](https://nx.dev)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/version/ToxicToast/Azkaban_V4?style=for-the-badge&label=VERSION&color=purple)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/ToxicToast/Azkaban_V4?style=for-the-badge&label=COMMITS&color=purple)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/ToxicToast/Azkaban_V4?style=for-the-badge&label=LAST%20COMMIT&color=purple)

</div>

> **Warning:**
> This project is a Work in Progress and is not yet ready for real world usage

## Introduction

Azkaban is a complete Rewrite of my Microservices at Home.

## Planned Services

**FoodFolio**

- Category
- Company
- Location
- Type
- Size
- Item
- Item Variant
- Item Detail
- Warehouse
- Shoppinglist

**Twitch**

- Api Service
- Bot Service
- Viewer Service
- Messages Service
- Streams Service
- Channel Service

**Warcraft**

- Api Service
- Guild Service

**Co-Working**

- Task Service

**UI**

- Admin UI
- Foodfolio UI
- CoWorking UI

## In Development

- Warcraft Service
- Blog UI
- Ascend Guild UI

## Deployed Services

**Gateway**

- [API Gateway](https://api.toxictoast.de/)
- Azkaban Alerts
- [Azkaban Users](https://api.toxictoast.de/api/v1/azkaban/users)
- [Azkaban SSE](https://sse.toxictoast.de/api/v1/sse)
- Warcraft Api
- [Warcraft Characters](https://api.toxictoast.de/api/v1/warcraft/character)
- [Warcraft Guild](https://api.toxictoast.de/api/v1/warcraft/guild)
- Warcraft Cronjobs

**UI**

- [Blog UI](https://www.toxictoast.de/)
- [Ascend Guild UI](https://www.ascend-guild.de/)

## Infrastructure

- Docker (Containerization)
- Kubernetes (Orchestration)
- Traefik (Reverse Proxy)
- Kafka (Message Broker)
- Postgres (Database)
- NestJS (Backend Framework)
- Redis (Cache)
- ReactJS (UI)
- Redux-Toolkit (State Management)
- API Alerts (Alerting)
- OpenTelemetry (Tracing)
- SigNoz (Tracing - Visually)

## Gateway

> **Info:**
> The Gateway is the entry point for all requests to the services. It is responsible for routing requests to the correct service and publishes the correct Topic to the Message Broker.

## Alerting

> **Info:**
> Great Service for Alerting. It is used to monitor the API Post Requests which will notify me on my mobile that something new was created or a specific event occured. (Event Driven Architecture)

- [API Alerts](https://apialerts.com/)

## SSE

> **Info:**
> To have some sort of Realtime Communication between the Services, the SSE Service is used to publish Events to the UI. Since i don't want to use Websockets (and I don't need some sort of bidirectional communication), I've decided to use Server Sent Events.
