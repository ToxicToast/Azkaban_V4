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

# 🪄 AZKABAN – The Arcane Microservice Platform

Welcome, Initiate.

**Azkaban** is a secure and event-driven microservice architecture inspired by the wizarding world. It guards the secrets of authentication, watches over system activity, and delivers critical messages to watchers across the realm.

## 🧱 Architecture

Below is an overview of the key services that form the Azkaban platform:

---

### 🧊 `Dementor Service`

> _"No one enters without facing the Dementor."_

Acts as the **gateway** to the Azkaban platform. It authenticates and routes incoming requests to their proper service destinations.

- Handles: HTTP routing, token forwarding, basic request validation
- Think of it as the castle gate, guarded by unsleeping watchers.

---

### 🏰 `Azkaban Service`

> _"Only the marked may stay within the prison walls."_

Manages **authentication and identity** for users, clients, and entities.

- Issues JWTs, refresh tokens
- Manages login, registration, user permissions
    > Work in Progress: This service is currently under development.

---

### 🔮 `Seer Service`

> _"The Seer watches all, and speaks only when it must."_

Serves as the real-time event oracle of the Azkaban platform. It listens to internal Kafka events and broadcasts them as Server-Sent Events (SSE) to subscribed clients.

- Handles: SSE channels, Kafka subscriptions, live event delivery

- Think of it as a prophetic watcher, whispering truths as they unfold.

---

### 📣 `Howler Service`

> _"Some messages cannot be ignored."_

A magical notification system inspired by the infamous red Howler letters.

- Sends system alerts to devices or users
- Supports push, email, or webhook-based delivery
    > Work in Progress: This service is currently under development.

---

### 🥫 `Foodfolio Service`

> _"No potion may be brewed without ingredients."_

The Azkaban pantry manages stored items, resources, or inventory.

- Designed for expansion into recipes, expiry checks, and resupply automation

> Work in Progress: This service is currently under development.

---

### 🛡️ `Warcraft Service`

> _"In the echoes of battle and glory, every name must be remembered."_

Provides data and functionality for World of Warcraft guilds and characters. From noble paladins to shady rogues, this service tracks identities, gear, progress, and affiliations within the guild’s ranks.

- Handles: character profiles, guild rosters, equipment snapshots, progression logs

- Think of it as the Tome of Kings, safeguarding the legacy of your adventurers.

> Work in Progress: This service is currently under development.

---

### ⚙️ `Warhammer Service`

> _"In the grim darkness of the far future, only the worthy are recorded."_

Manages character sheets, traits, equipment and psychological states for agents operating in the Imperium's most shadowed sectors. Designed for Warhammer 40.000 roleplaying campaigns in the Imperium Maledictum Rulebook.

- Handles: character creation, attribute tracking, corruption, equipment and notes

- Think of it as the Cogitator Vault, where the identities of sanctioned operatives are archived and updated across missions.

> Work in Progress: This service is currently under development.

---

## 🔐 Security

Azkaban enforces strict role-based access through magic-bound tokens (JWTs) and spirit-signed sessions. All services behind the `Dementor Service` are sealed and cannot be reached without passing its scrutiny.

---

## 🖋️ License

Licensed under the Ministry of Magic Regulation §42.b – _"All magical constructs must adhere to Muggle safety protocols."_

---

🕯️ _"In Azkaban, the silence is loud, and even the whispers are logged."_
