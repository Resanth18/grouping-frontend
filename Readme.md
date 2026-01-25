# Frontend Authentication Portal (React)

This document explains **everything we did in the frontend**, **why we did it**, and **what would break if we didn’t do it**, written for a **complete beginner**.

This project is **not copy‑paste based**. Each step explains the *thinking process* behind the code.

---

## Project Goal

To build a **production‑style authentication frontend** that connects to a Spring Boot + AWS Cognito backend and provides:

* Secure login
* First‑time password change
* Forgot / Reset password with OTP
* Live password validation
* Animated, user‑friendly UI
* Dashboard after successful login

---

## Tech Stack (Frontend)

* **React (Vite)** – UI framework
* **Ant Design (antd)** – Prebuilt UI components
* **React Router DOM** – Page navigation
* **Axios** – API calls to backend
* **react‑hot‑toast** – Toast notifications
* **CSS** – Custom styling and animations

---

## Project Structure (Frontend)

```
src/
│
├── api/
│   └── authApi.js
│       → All backend API calls (login, forgot, reset, set new password)
│
├── components/
│   ├── PasswordMascot.jsx
│   │   → Animated mascot (eyes, emotions, reactions)
│   │
│   └── passwordMascot.css
│       → Mascot styling and animations
│
├── pages/
│   ├── Login.jsx
│   │   → User login page
│   │
│   ├── ForgotPassword.jsx
│   │   → Sends OTP to email
│   │
│   ├── ResetPassword.jsx
│   │   → OTP + new password reset
│   │
│   ├── SetNewPassword.jsx
│   │   → First‑time login password change
│   │
│   └── Dashboard.jsx
│       → Page shown after successful login
│
├── routes/
│   └── AppRoutes.jsx
│       → Defines which URL loads which page
│
├── App.jsx
│   → Main router entry point
│
├── main.jsx
│   → React root render file
│
└── index.css
    → Global styles
```

---

## Step‑by‑Step Frontend Development

---

### Step 1: Creating the React Project (Vite)

I used **Vite** instead of CRA because:

* Faster startup
* Faster hot reload
* Modern tooling

Command used:

```bash
npm create vite@latest frontend
cd frontend
npm install
npm run dev
```

At this stage, **no authentication logic** existed. I only verified that React was running correctly.

---

### Step 2: Installing Required Libraries

```bash
npm install antd axios react-router-dom react-hot-toast
```

Why these were needed:

* **antd** → To avoid writing UI from scratch
* **axios** → Cleaner API calls than fetch
* **react-router-dom** → Multiple pages without page reload
* **react-hot-toast** → User feedback for success/error

Without these:

* UI would look basic
* Navigation would reload pages
* Errors would be invisible to users

---

### Step 3: Setting Up Routing (App.jsx)

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/set-new-password" element={<SetNewPassword />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

Why routing is required:

* React is a **Single Page Application**
* URLs must map to components

Without routing:

* Only one screen possible
* No login → dashboard flow

---

## Authentication Flow (Important)

### Login Page (Login.jsx)

What happens here:

1. User enters email + password
2. Form validation happens automatically (Ant Design)
3. API call sent to backend
4. Based on response:

   * Success → Dashboard
   * NEW_PASSWORD_REQUIRED → Set New Password
   * Error → Toast message

Why we used `useState`:

```js
const [loading, setLoading] = useState(false);
```

* Prevents multiple submits
* Shows loading spinner

Without it:

* Multiple API calls
* Bad UX

---

### Why localStorage is used

```js
localStorage.setItem("userEmail", values.username);
```

Reason:

* Dashboard is a different page
* React state resets on refresh

Without localStorage:

* Username would be lost
* Greeting would break

---

## Forgot Password Flow

### ForgotPassword.jsx

Purpose:

* Accepts email
* Calls backend to send OTP
* Navigates to Reset Password page

Key idea:

```js
navigate("/reset-password", { state: { username } })
```

Why state is passed:

* OTP page needs to know which user

Without this:

* Backend cannot reset password

---

## Reset Password Page

### What happens here

1. User enters OTP
2. User enters new password
3. Client‑side validation runs
4. API call is sent only if valid

OTP validation:

```js
/^\d{6}$/
```

Why client‑side validation:

* Prevent unnecessary backend calls
* Faster feedback

Without this:

* Backend spam
* Poor UX

---

### Password Rules Logic

Rules stored as array:

```js
const rules = [ { label, test } ]
```

Why this approach:

* Clean
* Scalable
* Easy to add/remove rules

Live validation:

```js
rules.every(r => r.test(password))
```

---

## Password Mascot (UX Enhancement)

Mascot reacts to:

* Mouse movement
* Password focus
* Errors
* Success

Why this exists:

* Makes UI feel premium
* Reduces stress
* Shows live feedback visually

This is **frontend only**, no backend dependency.

---

## Dashboard Page

### Why Dashboard exists

* Confirms login success
* Shows system status
* Acts as landing page

Username logic:

```js
const email = localStorage.getItem("userEmail");
const username = email.split("@")[0];
```

Why split email:

* Cleaner greeting
* Professional UI

---

### Logout Logic

```js
localStorage.clear();
navigate("/login");
```

Why:

* Security
* Session cleanup

Without logout cleanup:

* User remains logged in

---

## What This Project Teaches You

By completing this project, you learned:

* React component structure
* useState & useEffect
* Routing & navigation
* API integration
* Client‑side validation
* UX‑focused design
* Real‑world auth flow

---

## Final Note

This frontend is **industry‑level** and **internship‑ready**.

It is:

* Modular
* Readable
* Scalable
* Beginner‑friendly

Built during **Internship @ 247HealthMedPro** 🚀
