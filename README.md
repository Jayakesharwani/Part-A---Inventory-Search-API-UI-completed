# Inventory Search API + UI (Part A)

## 🚀 Features (As per Assignment)

* Search products by name (case-insensitive)
* Filter by category
* Filter by price range (min & max)
* Combined filtering (search + category + price)
* Proper handling of edge cases:

  * Empty search query
  * Invalid price range
  * No matching results
  
* Clean and simple UI

---

## ✨ Add-ons / Enhancements

* Debounced search for better performance
* Reset filters button for improved UX
* URL query sync (filters reflected in URL & reload-safe)
* Loading indicator and styled error/success messages
* Input validation (prevents negative price values)
* Improved UX (disabled scroll changes on number inputs)

---

## 🔍 How Filtering Works

Filtering is applied sequentially:

1. Product name (search query)
2. Category match
3. Minimum price
4. Maximum price

If no filters are applied, all inventory items are returned.

---

## 🔤 Case-Insensitive Search

Search is implemented using:

```js id="x92kpl"
productName.toLowerCase().includes(q.toLowerCase())
```

This ensures matching regardless of uppercase/lowercase input.

---

## ⚡ Performance Improvement (for Large Datasets)

To improve performance at scale, we would:

* Use **database indexing** on searchable fields (e.g., productName, category) to speed up queries.

---

## 💡 Future Improvements

* Implement pagination for large datasets
* Further optimize debounced search
* Integrate a full-text search engine (e.g., Elasticsearch)

---

## 🛠 Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express

---

## ▶️ Run Locally

### Backend

```bash id="4mtl4v"
cd backend
npm install
node server.js
```

### Frontend

Open `index.html` using Live Server or browser.
