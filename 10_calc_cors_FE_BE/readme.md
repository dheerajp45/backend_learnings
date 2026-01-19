
---
# 🔢 Sum Calculator – Frontend & Backend Integration

This assignment demonstrates how a **frontend application communicates with a backend server** using the **Fetch API or Axios**, and how **CORS** behaves in different hosting scenarios.

---

## 📁 Project Structure

* **Frontend**
  An HTML file that:

  * takes two numbers as input from the user
  * sends the data to the backend using Fetch/Axios
  * displays the calculated result

* **Backend**
  A Node.js + Express server that:

  * receives the numbers from the frontend
  * calculates their sum
  * sends the result back as a JSON response

---

## 🔁 Communication Flow

1. User enters numbers in the frontend UI
2. Frontend sends a request to the backend API
3. Backend calculates the sum
4. Backend sends the response
5. Frontend displays the result

---

## 🧠 Hosting Scenarios & CORS Behavior

### ✅ Scenario 1: Frontend and Backend on **Different Origins**

In this scenario:

* Frontend and backend run on **different servers or ports**
* Example:

  * Frontend: `http://localhost:3000` (using `npx serve`)
  * Backend: `http://localhost:5000` (using `node index.js`)

Since the **origins are different**, the browser blocks the response due to **CORS (Cross-Origin Resource Sharing)** restrictions.

### 🔧 Solution

To allow cross-origin requests, we use the `cors` package in the backend:

```js
const cors = require("cors");
app.use(cors());
```

This adds the required CORS headers so the browser allows the frontend to access the backend response.

---

### ✅ Scenario 2: Frontend Served from Backend (Same Origin)

In this scenario:

* The frontend HTML file is served directly from the backend using Express
* Example:

```js
res.sendFile(__dirname + "/public/index.html");
```

Here:

* Frontend and backend share the **same origin**
* No CORS restrictions apply
* No need to use the `cors` package

This approach avoids CORS issues entirely and is commonly used in production deployments.

---

## ⚠️ Important Notes

* CORS is a **browser security mechanism**, not a backend restriction
* Backend APIs still work even when CORS errors appear
* Tools like Postman do not show CORS errors because they are not browsers
* CORS is required only when frontend and backend are on **different origins**

---

## 🛠️ How to Run

### Backend

```bash
node index.js
```

### Frontend (Scenario 1)

```bash
npx serve
```

Or open via Live Server.

---

## 📌 Key Learnings

* How frontend communicates with backend APIs
* How Fetch/Axios works
* What CORS is and why it exists
* Difference between same-origin and cross-origin requests
* When and why to use the `cors` middleware

---

## 🧠 One-Line Summary

> CORS is enforced by the browser only when frontend and backend are on different origins; serving frontend from the backend avoids CORS issues entirely.

---

