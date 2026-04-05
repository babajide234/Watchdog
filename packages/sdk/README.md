# react-watchdog-sdk 🐕

Lightweight React error monitoring SDK for [React Watchdog](https://github.com/watchdog/watchdog).

## Installation

```bash
npm install react-watchdog-sdk
# or
pnpm add react-watchdog-sdk
# or
yarn add react-watchdog-sdk
```

## Quick Start

Initialize the monitor at the very beginning of your application entry point (e.g., `src/main.tsx` or `src/index.tsx`):

```tsx
import { initMonitor } from "react-watchdog-sdk";

initMonitor({
  endpoint: "https://your-watchdog-api.com/errors",
  projectId: "my-awesome-app",
});
```

## Features

- ⚡ **Lightweight**: Zero dependencies and tiny bundle size (< 2kb gzip).
- 🛠 **Automatic Tracking**: Captures runtime JavaScript errors and unhandled promise rejections.
- 🧩 **First-class TypeScript**: Fully typed for a great developer experience.
- 📡 **Reliable Ingestion**: Uses `navigator.sendBeacon` for reliable delivery during page unloads.

## API Reference

### `initMonitor(config: WatchdogConfig)`

Initializes the error monitor with the provided configuration.

| Option | Type | Description |
| :--- | :--- | :--- |
| `endpoint` | `string` | The URL of your Watchdog API errors endpoint. |
| `projectId` | `string` | Unique identifier for your project. |
| `disabled` | `boolean` | (Optional) Whether to disable the monitor entirely. |

### `captureError(error: Error | string)`

Manually captures an error or message and sends it to the API.

### `destroyMonitor()`

Stops the monitor and removes all global error listeners.

## License

MIT © [React Watchdog Team](https://github.com/watchdog/watchdog)
