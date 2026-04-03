# API guide

This document describes HTTP APIs exposed by the Django backend. Unless noted, all JSON bodies use `Content-Type: application/json`.

**Base URL:** use your server origin (for local dev, often `http://127.0.0.1:8000`). Paths below are relative to that origin.

**Authentication:** Spot endpoints require a JWT. Send:

```http
Authorization: Bearer <access_token>
```

Tokens are obtained via the JWT endpoints under `/api/jwt/` (see below). The API uses `rest_framework_simplejwt` with `Bearer` tokens (`AUTH_HEADER_TYPES`).

---

## Authentication and users (Djoser + Simple JWT)

These routes are mounted at `/api/` from `djoser.urls` and `djoser.urls.jwt`.

### JWT

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/jwt/create/` | Obtain access and refresh tokens. |
| `POST` | `/api/jwt/refresh/` | Obtain a new access token using a refresh token. |
| `POST` | `/api/jwt/verify/` | Verify that a token is valid. |

**Create (login) — request body**

Typical fields (username-based Django user; confirm field names match your user model):

```json
{
  "username": "alice",
  "password": "secret"
}
```

**Create — success response (200)**

```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

**Refresh — request body**

```json
{
  "refresh": "<refresh_token>"
}
```

**Refresh — success response (200)**

```json
{
  "access": "<new_access_token>"
}
```

**Verify — request body**

```json
{
  "token": "<access_or_refresh_token>"
}
```

Access token lifetime is configured in `SIMPLE_JWT` (currently 60 minutes); refresh token lifetime is 1 day.

### Users (Djoser)

Djoser registers additional `/api/users/...` routes (registration, current user, password reset flows, etc.). This project sets `USER_CREATE_PASSWORD_RETYPE: True`, so user creation expects `password` and `re_password` in the payload.

Exact paths and payloads match your installed Djoser version; see [Djoser documentation](https://djoser.readthedocs.io/) for the full list.

**Example: current user**

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/api/users/me/` | JWT |

Response shape follows Djoser’s `UserSerializer` (fields such as `id`, `username`, `email` when present on the model).

---

## Spot API (`/api/spot/`)

All spot routes require `IsAuthenticated` and only expose data for the logged-in user.

### Holdings

Backed by `HoldingViewSet` (full CRUD on the user’s holdings).

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/spot/holdings/` | List holdings for the current user (ordered by `created_at` descending). |
| `POST` | `/api/spot/holdings/` | Create a holding; the view also creates an initial **buy** record (see below). |
| `GET` | `/api/spot/holdings/{id}/` | Retrieve one holding. |
| `PUT` | `/api/spot/holdings/{id}/` | Full update. |
| `PATCH` | `/api/spot/holdings/{id}/` | Partial update. |
| `DELETE` | `/api/spot/holdings/{id}/` | Delete holding. |
| `GET` | `/api/spot/holdings/{id}/records/` | List all records for that holding (newest `date` first). |

**Holding JSON object** (list/retrieve/update responses use `HoldingSerializer`)

| Field | Type | Notes |
|-------|------|--------|
| `id` | integer | Read-only. |
| `symbol` | string | Max length 32; unique per user. |
| `name` | string | Max length 255. |
| `avg_price` | string (decimal) | JSON decimals are serialized as strings. |
| `balance` | string (decimal) | Same as above. |
| `created_at` | string (datetime) | ISO 8601; read-only. |
| `deleted` | boolean | Read-only in serializer (still present in payload). |

**Create holding — request body** (`HoldingCreateSerializer`)

Only these fields are accepted; `user` is set from the JWT user.

```json
{
  "symbol": "BTC",
  "name": "Bitcoin",
  "avg_price": "50000.00",
  "balance": "0.5"
}
```

**Create holding — success response (201)**

Returns the created holding in the same shape as **Holding JSON object**. The view persists the holding (with `user` from the JWT), then creates an initial `Record` with `type` `buy`, `amount` = submitted `balance`, `price` = submitted `avg_price`, and `date` = current server time. That row is not included in the holding response; use `GET .../holdings/{id}/records/` to see it.

`HoldingCreateSerializer` only validates input; it does not write the initial record itself.

**Update holding — request body**

Same fields as the holding object except read-only fields (`id`, `created_at`, `deleted`).

---

### Records

Backed by `RecordViewSet` (create only; listing for a holding is on `GET .../holdings/{id}/records/`).

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/spot/records/` | Add a record and update the parent holding’s `balance` and (where applicable) `avg_price` (see **Record side effects**). |

**Concurrency:** the holding row is loaded with `select_for_update()` inside a transaction before applying logic and saving `balance` / `avg_price`.

**Record JSON object** (`RecordSerializer`)

| Field | Type | Notes |
|-------|------|--------|
| `id` | integer | Read-only after create. |
| `holding` | integer | Primary key of the holding. |
| `date` | string (datetime) | ISO 8601. |
| `type` | string | One of: `buy`, `sell`, `rewards`. |
| `amount` | string (decimal) | |
| `price` | string (decimal) | |

**Create record — request body example**

```json
{
  "holding": 1,
  "date": "2026-04-03T12:00:00Z",
  "type": "buy",
  "amount": "0.1",
  "price": "51000.00"
}
```

**Create record — success response (201)**

Returns the created record in the **Record JSON object** shape. The linked holding’s stored `balance` and `avg_price` are updated on the server to match the new trade (same rules as **Record side effects**).

If `holding` refers to another user’s holding, the server responds with **403 Forbidden** (`PermissionDenied`).

#### Record side effects (`apply_record_to_holding`)

Domain logic runs **before** the `Record` row is inserted. All amounts must be **positive** (`amount` > 0). Unsupported `type` values are rejected.

| `type` | Effect on holding |
|--------|-------------------|
| `buy` | `balance` increases by `amount`. New `avg_price` is weighted average cost: `(old_balance × old_avg + amount × price) / (old_balance + amount)`. |
| `sell` | `balance` decreases by `amount`; `avg_price` unchanged. **Validation:** `amount` must not exceed current `balance`. |
| `rewards` | `balance` increases by `amount`. New `avg_price` dilutes cost basis at zero marginal cost: `(old_balance × old_avg) / (old_balance + amount)`. |

If validation fails (e.g. sell larger than balance, non-positive amount), the API responds with **400 Bad Request** and a DRF validation payload (field keys from `ValidationError.message_dict`, or `non_field_errors`).

**Note:** `PUT` / `PATCH` on `/api/spot/holdings/{id}/` update the holding document directly and do **not** run this record logic or append history rows—only `POST /api/spot/records/` does.

---

## Error responses

Behavior follows Django REST framework defaults:

- **400 Bad Request** — serializer validation or record business rules (e.g. sell amount above balance, non-positive `amount`); often `{"field_name": ["message", ...], ...}` or `non_field_errors`.
- **401 Unauthorized** — missing or invalid JWT on protected routes.
- **403 Forbidden** — authenticated but not allowed (e.g. record on another user’s holding).
- **404 Not Found** — object not in the current user’s queryset (e.g. wrong holding id).

---

## Admin

| Method | Path | Description |
|--------|------|-------------|
| *browser* | `/admin/` | Django admin (session auth, not JWT). |
