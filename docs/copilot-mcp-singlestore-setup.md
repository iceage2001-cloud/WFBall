# Copilot, MCP, and SingleStore: a simple setup guide

This guide explains the general connection flow. It is not a record of settings verified on a particular laptop: this repository does not contain the laptop's Copilot or MCP configuration.

## How the pieces connect

```text
You → GitHub Copilot in your editor → MCP server → VM/network → SingleStore
```

- **Copilot** is the assistant you use in your editor.
- **MCP** is a standard way for the assistant to use tools provided by another service.
- **The MCP server** provides approved database actions and connects to SingleStore.
- **The VM** hosts the database or provides the network route to it.
- **SingleStore** is the database that stores and returns data.

Copilot does not normally connect directly to the database. The MCP server handles the database connection and returns results through the tools it exposes.

## What needs to be configured

1. **Copilot and editor:** Sign in to GitHub Copilot in an editor that supports MCP servers.
2. **MCP server:** Install or run the MCP server that supports SingleStore, and configure the editor to start or reach it. The exact steps depend on the chosen server and editor.
3. **Network access:** Make sure the laptop or MCP server can reach the VM. This may require an approved VPN, SSH tunnel, firewall rule, or network allowlist.
4. **Database connection:** Give the MCP server the SingleStore host, port, database name, username, and required TLS settings.
5. **Credentials:** Supply the password or token through an approved secret store or environment variable—not in source code, chat, or a committed configuration file.
6. **Permissions:** Use a database account with only the access needed for the task. Enable write actions only when they are explicitly required and approved.

## Basic checks

- Confirm that the VM is reachable from the machine running the MCP server.
- Confirm that the MCP server starts and reports a successful database connection.
- In the editor, confirm that the MCP server and its approved tools are available to Copilot.
- Try a safe, read-only query against a non-sensitive table.
- If it fails, check network access, host/port, TLS settings, credentials, and database permissions. Do not paste secrets into logs or chat.

## Keep in mind

The MCP configuration format and exact commands vary by editor and MCP server. Use that server's documentation and your organization's approved access process. Do not assume this guide reflects a specific laptop setup unless you verify each setting.
