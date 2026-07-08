# Hanzo Integration

## Principle

Hanzo should not live inside Shakti, and Shakti should not depend on Hanzo directly.

## Intended Shape

```text
Hanzo Core
Legacy Intelligence Vault
Vault Engine
Client Implementations
```

Shakti is the first implementation of the reusable Vault Engine pattern, not the engine itself.

## Future Use

The same engine should be reusable for:

- Shakti
- Major AI Mindset
- Howling MUNE
- Wild
- Ultimate Contour
- Future clients
