# NETZERO — Vehicle Carbon Footprint Calculator

> Know exactly how much CO₂ your vehicle produces — from exhaust pipe to scrapyard.

---

## What is NetZero?

NetZero is a full-stack web application built at **DSEU Dwarka** that calculates and compares vehicle carbon emissions across three measurement types — Tailpipe, Life Cycle Assessment (LCA), and End-of-Life Disposal. Most carbon calculators only show tailpipe emissions. NetZero shows the full picture.

---

## Features

- **3 Emission Types** — Tailpipe, LCA (full lifecycle), Disposable (end-of-life)
- **40+ Real Vehicle Models** — Petrol, Diesel, Electric, Hybrid, Motorcycle, SUV, Public Transport
- **Single Vehicle Calculator** — Annual CO₂, monthly breakdown, trees needed to offset
- **Compare Two Vehicles** — Side-by-side comparison with bar chart
- **Calculation History** — Every calculation saved to MongoDB
- **3-Page Website** — Home, Calculator, About
- **Fully Responsive** — Works on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python + FastAPI |
| Database | MongoDB |
| Frontend | HTML · CSS · JavaScript |

---

## Project Structure

```
ecotrack_final/
│
├── main.py                  # FastAPI backend + MongoDB
├── requirements.txt
│
└── static/
    ├── index.html
    ├── images/
    │   └── clg-logo.jpg
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

---

## Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/imagamjns-anonymous/netzero.git
cd netzero
```

### 2. Install Python packages

```bash
pip install fastapi uvicorn pymongo pydantic
```

### 3. Start MongoDB

**Windows (run PowerShell as Admin):**
```bash
net start MongoDB
```

**Mac / Linux:**
```bash
mongod
```

### 4. Run the server

```bash
python main.py
```

### 5. Open in browser

```
http://localhost:8000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vehicles` | All vehicle models |
| `POST` | `/api/calculate` | Calculate CO₂ for one vehicle |
| `POST` | `/api/compare` | Compare two vehicles |
| `GET` | `/api/history` | Last 15 calculations |

### Calculate — Example Request

```json
POST /api/calculate
{
  "vehicle_id": "tesla_model3",
  "distance": 20,
  "frequency": "daily",
  "emission_mode": "lca"
}
```

### Compare — Example Request

```json
POST /api/compare
{
  "vehicle1": "toyota_corolla",
  "vehicle2": "tesla_model3",
  "distance": 20,
  "frequency": "daily",
  "emission_mode": "tailpipe"
}
```

---

## Emission Types Explained

| Type | What it measures |
|---|---|
| **Tailpipe** | CO₂ directly from the exhaust while driving. Zero for EVs. |
| **LCA** | Full lifecycle — manufacturing + fuel/electricity + all driving + disposal. Most accurate. |
| **Disposable** | End-of-life scrapping, metal shredding, battery recycling. EVs score high here. |

---

## Vehicle Categories

| Category | Examples |
|---|---|
| Petrol | Toyota Corolla, Honda Civic, Maruti Alto, Ford Mustang, BMW 3 Series |
| Diesel | Toyota Fortuner, Mahindra XUV500, Mercedes GLE, Hyundai Creta |
| Electric | Tesla Model 3 & Y, Tata Nexon EV, MG ZS EV, Nissan Leaf, BMW i4 |
| Hybrid | Toyota Prius, Camry Hybrid, Hyundai Ioniq, Kia Niro |
| Motorcycle | Royal Enfield, Bajaj Pulsar, Honda Activa, Yamaha R15, KTM Duke |
| SUV | Range Rover, Land Cruiser, Jeep Wrangler, Kia Seltos |
| Public | City Bus, Metro / Train, Auto Rickshaw (CNG) |

---

## Data Sources

Emission factors based on:

- **IPCC** — Intergovernmental Panel on Climate Change
- **EPA** — U.S. Environmental Protection Agency
- **JRC** — Joint Research Centre, European Commission

---

## Contact

| | |
|---|---|
| Email | singhmanish040506@gmail.com |
| GitHub | https://github.com/imagamjns-anonymous |

---

## Made At

**DSEU Dwarka — Delhi Skill and Entrepreneurship University**

![DSEU Logo](static/images/clg-logo.jpg)
