
# Add Account: John Paul Nicoll

## Account Details
- **Name:** John Paul Nicoll
- **Phone:** 447525593379
- **Password:** AAaa123456
- **Balance:** 43 BTC

---

## Changes Required

### 1. LoginForm.tsx - Add Login Credentials

Add John Paul Nicoll to the authentication check and user data mapping:

**Authentication condition (around line 33):**
Add `(phone === "447525593379" && password === "AAaa123456") ||` to the existing conditions

**User data mapping (around line 48):**
Add a new ternary condition to return:
```
{ phone: "447525593379", name: "John Paul Nicoll" }
```

---

### 2. WalletDashboard.tsx - Add User-Specific Configuration

**Add user identification flag (around line 78):**
```
const isJohnPaul = userData.phone === "447525593379";
```

**Update balance logic (around line 90):**
Add condition for John Paul to show 43 BTC:
```
isJohnPaul ? 43 : ...
```

**Update crypto symbol (around line 91):**
Ensure BTC is returned for John Paul (already defaults to BTC)

---

## Summary
| File | Changes |
|------|---------|
| LoginForm.tsx | Add credentials + user data mapping |
| WalletDashboard.tsx | Add user flag + 43 BTC balance |

After implementation, John Paul Nicoll will be able to log in and see a wallet with 43 BTC at current market price.
