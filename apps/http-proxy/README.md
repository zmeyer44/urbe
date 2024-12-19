# Nostr HTTP Proxy

A HTTP proxy server for accessing Nostr data. This service provides REST API endpoints to fetch Nostr events and user profiles using standard HTTP requests instead of WebSocket connections.

## API Endpoints

### Check Status

```
GET /status
```

Returns the API status.

**Response:**
```json
{ "ok": true }
```

### Fetch Events

```
GET /
```

Fetch Nostr events using query parameters.

**Query Parameters:**
- `relay`: Relay URLs (can be multiple, optional)
- `ids`: Event IDs (optional)
- `authors`: Author public keys (optional)
- `kinds`: Event kinds (numbers, optional)
- `until`: Timestamp upper bound (optional)
- `since`: Timestamp lower bound (optional)
- `limit`: Number of events to return (optional)

**Example:**
```bash
curl "https://nostrhttp.com/?relay=wss://relay.damus.io&kinds=1&authors=17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58&limit=1"
```

### Post Events Filter

```
POST /
```

Fetch Nostr events using a request body with filters.

**Request Body Schema:**
```typescript
{
  relays?: string[],
  filter: {
    ids?: string[],
    authors?: string[],
    kinds?: number[],
    until?: number,
    since?: number,
    [#a-Z]?: string[]
  }
}
```

**Example:**
```bash
curl -X POST https://nostrhttp.com/ \
  -H "Content-Type: application/json" \
  -d '{
    "relays": ["wss://relay.damus.io"],
    "filter": {
      "kinds": [1],
      "authors": ["17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58"],
      "limit": 1
    }
  }'
```

### Fetch by Identifier

```
GET /:identifier
```

Fetch user profiles and events using various Nostr identifiers.

**Supported Identifier Formats:**
- nostr address (NIP-05)
- pubkey
- npub
- nprofile (Profile with optional relays)
- note (Note ID)
- naddr (Parameterized replaceable event)
- nevent (Event with optional relays)
- nsec (Secret key [NOT RECOMMENDED])

**Examples:**
```bash
# Fetch profile by NIP-05
curl https://nostrhttp.com/zach@troop.is

# Fetch profile by npub
curl https://nostrhttp.com/npub1zach44xjpc4yyhx6pgse2cj2pf98838kja03dv2e8ly8lfr094vqvm5dy5

# Fetch note by note ID
curl https://nostrhttp.com/note1uu802tdfzrd7yu2qsesjztd2ftcsjxds0lr8e64w5x506j5rt28su7mdjp
```

### Publish Event

```
POST /event
```

Publish a Nostr event to specified relays.

**Request Body Schema:**
```typescript
{
  // Required Event Fields
  id: string,
  pubkey: string,
  created_at: number,
  kind: number,
  tags: string[][],
  content: string,
  sig: string,
  
  // Optional
  relays?: string[]  // Relay URLs to publish to
}
```

**Example:**
```bash
curl -X POST https://nostrhttp.com/event \
  -H "Content-Type: application/json" \
  -d '{
    "id": "fa4dd48b34ad39c76fc3422bd5dad6f4f983c6387c1587f1168c8c61f1a69f",
    "pubkey": "17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58",
    "created_at": 1710000000,
    "kind": 1,
    "tags": [],
    "content": "Hello Nostr!",
    "sig": "valid_signature_here",
    "relays": ["wss://relay.damus.io", "wss://nos.lol"]
  }'
```

**Notes:**
- The event must be properly signed before submission
- Relays can be specified in the request body or as query parameters (`?relay=wss://example.com`)
- If no relays are specified, the default relay set will be used

## Tech Stack

- Built with [NDK (Nostr Development Kit)](https://github.com/nostr-dev-kit/ndk)
