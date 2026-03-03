from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import os

app = FastAPI(title="EcoTrack - Vehicle Carbon Footprint")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── MongoDB ─────────────────────────────────────────────────────
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
client    = MongoClient(MONGO_URI)
db        = client["ecotrack"]
vehicles_col     = db["vehicles"]
calculations_col = db["calculations"]

# ── Vehicle Data ─────────────────────────────────────────────────
# tailpipe   = direct exhaust CO2 kg/km
# lca        = full lifecycle CO2 kg/km (manufacturing + fuel + use + disposal)
# disposable = end-of-life scrapping & battery recycling CO2 kg/km
VEHICLES_DATA = [
    # PETROL
    {"_id":"toyota_corolla",       "name":"Toyota Corolla",        "type":"Petrol",    "icon":"⛽","tailpipe":0.142,"lca":0.210,"disposable":0.008},
    {"_id":"honda_civic",          "name":"Honda Civic",            "type":"Petrol",    "icon":"⛽","tailpipe":0.151,"lca":0.221,"disposable":0.009},
    {"_id":"suzuki_swift",         "name":"Suzuki Swift",           "type":"Petrol",    "icon":"⛽","tailpipe":0.113,"lca":0.178,"disposable":0.007},
    {"_id":"hyundai_i20",          "name":"Hyundai i20",            "type":"Petrol",    "icon":"⛽","tailpipe":0.120,"lca":0.185,"disposable":0.007},
    {"_id":"ford_mustang",         "name":"Ford Mustang",           "type":"Petrol",    "icon":"⛽","tailpipe":0.275,"lca":0.360,"disposable":0.012},
    {"_id":"maruti_alto",          "name":"Maruti Alto",            "type":"Petrol",    "icon":"⛽","tailpipe":0.098,"lca":0.158,"disposable":0.006},
    {"_id":"vw_golf",              "name":"Volkswagen Golf",        "type":"Petrol",    "icon":"⛽","tailpipe":0.138,"lca":0.205,"disposable":0.008},
    {"_id":"bmw_3series",          "name":"BMW 3 Series",           "type":"Petrol",    "icon":"⛽","tailpipe":0.168,"lca":0.242,"disposable":0.010},
    # DIESEL
    {"_id":"toyota_fortuner",      "name":"Toyota Fortuner",       "type":"Diesel",    "icon":"🛢️","tailpipe":0.215,"lca":0.285,"disposable":0.011},
    {"_id":"mahindra_xuv500",      "name":"Mahindra XUV500",       "type":"Diesel",    "icon":"🛢️","tailpipe":0.198,"lca":0.265,"disposable":0.010},
    {"_id":"tata_nexon_d",         "name":"Tata Nexon Diesel",     "type":"Diesel",    "icon":"🛢️","tailpipe":0.145,"lca":0.210,"disposable":0.009},
    {"_id":"hyundai_creta_d",      "name":"Hyundai Creta Diesel",  "type":"Diesel",    "icon":"🛢️","tailpipe":0.155,"lca":0.222,"disposable":0.009},
    {"_id":"vw_polo_d",            "name":"VW Polo Diesel",        "type":"Diesel",    "icon":"🛢️","tailpipe":0.118,"lca":0.182,"disposable":0.008},
    {"_id":"mercedes_gle",         "name":"Mercedes GLE Diesel",   "type":"Diesel",    "icon":"🛢️","tailpipe":0.232,"lca":0.308,"disposable":0.012},
    # ELECTRIC
    {"_id":"tesla_model3",         "name":"Tesla Model 3",          "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.110,"disposable":0.025},
    {"_id":"tesla_modelY",         "name":"Tesla Model Y",          "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.125,"disposable":0.028},
    {"_id":"tata_nexon_ev",        "name":"Tata Nexon EV",          "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.105,"disposable":0.022},
    {"_id":"mg_zs_ev",             "name":"MG ZS EV",               "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.112,"disposable":0.024},
    {"_id":"nissan_leaf",          "name":"Nissan Leaf",            "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.098,"disposable":0.022},
    {"_id":"bmw_i4",               "name":"BMW i4",                  "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.130,"disposable":0.030},
    {"_id":"hyundai_ioniq6",       "name":"Hyundai Ioniq 6",        "type":"Electric",  "icon":"⚡","tailpipe":0.000,"lca":0.102,"disposable":0.023},
    # HYBRID
    {"_id":"toyota_prius",         "name":"Toyota Prius",           "type":"Hybrid",    "icon":"🔋","tailpipe":0.092,"lca":0.168,"disposable":0.015},
    {"_id":"toyota_camry_h",       "name":"Toyota Camry Hybrid",    "type":"Hybrid",    "icon":"🔋","tailpipe":0.110,"lca":0.188,"disposable":0.016},
    {"_id":"hyundai_ioniq_h",      "name":"Hyundai Ioniq Hybrid",   "type":"Hybrid",    "icon":"🔋","tailpipe":0.096,"lca":0.172,"disposable":0.015},
    {"_id":"kia_niro_h",           "name":"Kia Niro Hybrid",        "type":"Hybrid",    "icon":"🔋","tailpipe":0.099,"lca":0.175,"disposable":0.015},
    {"_id":"honda_jazz_h",         "name":"Honda Jazz Hybrid",      "type":"Hybrid",    "icon":"🔋","tailpipe":0.103,"lca":0.180,"disposable":0.015},
    # MOTORCYCLE
    {"_id":"royal_enfield",        "name":"Royal Enfield Classic",  "type":"Motorcycle","icon":"🏍️","tailpipe":0.113,"lca":0.155,"disposable":0.005},
    {"_id":"bajaj_pulsar",         "name":"Bajaj Pulsar 150",       "type":"Motorcycle","icon":"🏍️","tailpipe":0.085,"lca":0.122,"disposable":0.004},
    {"_id":"honda_activa",         "name":"Honda Activa",           "type":"Motorcycle","icon":"🏍️","tailpipe":0.072,"lca":0.108,"disposable":0.004},
    {"_id":"yamaha_r15",           "name":"Yamaha R15",             "type":"Motorcycle","icon":"🏍️","tailpipe":0.095,"lca":0.135,"disposable":0.005},
    {"_id":"ktm_duke_390",         "name":"KTM Duke 390",           "type":"Motorcycle","icon":"🏍️","tailpipe":0.108,"lca":0.150,"disposable":0.005},
    {"_id":"harley_davidson",      "name":"Harley Davidson",        "type":"Motorcycle","icon":"🏍️","tailpipe":0.192,"lca":0.248,"disposable":0.008},
    # SUV
    {"_id":"range_rover",          "name":"Range Rover Sport",      "type":"SUV",       "icon":"🚙","tailpipe":0.290,"lca":0.375,"disposable":0.014},
    {"_id":"land_cruiser",         "name":"Toyota Land Cruiser",    "type":"SUV",       "icon":"🚙","tailpipe":0.268,"lca":0.350,"disposable":0.013},
    {"_id":"jeep_wrangler",        "name":"Jeep Wrangler",          "type":"SUV",       "icon":"🚙","tailpipe":0.255,"lca":0.335,"disposable":0.013},
    {"_id":"kia_seltos",           "name":"Kia Seltos",             "type":"SUV",       "icon":"🚙","tailpipe":0.162,"lca":0.238,"disposable":0.010},
    {"_id":"hyundai_creta",        "name":"Hyundai Creta",          "type":"SUV",       "icon":"🚙","tailpipe":0.158,"lca":0.232,"disposable":0.010},
    # PUBLIC
    {"_id":"city_bus",             "name":"City Bus",               "type":"Public",    "icon":"🚌","tailpipe":0.039,"lca":0.068,"disposable":0.002},
    {"_id":"metro_train",          "name":"Metro / Train",          "type":"Public",    "icon":"🚆","tailpipe":0.018,"lca":0.042,"disposable":0.001},
    {"_id":"auto_rickshaw",        "name":"Auto Rickshaw (CNG)",    "type":"Public",    "icon":"🛺","tailpipe":0.065,"lca":0.095,"disposable":0.003},
]

def seed_vehicles():
    if vehicles_col.count_documents({}) == 0:
        vehicles_col.insert_many(VEHICLES_DATA)
        print("✅ Vehicles seeded into MongoDB")

seed_vehicles()

KG_CO2_PER_TREE = 21  # kg CO2 absorbed per tree per year

# ── Pydantic Models ───────────────────────────────────────────────
class CalcRequest(BaseModel):
    vehicle_id:    str
    distance:      float
    frequency:     str   = "daily"   # daily | weekly | monthly | yearly
    emission_mode: str   = "tailpipe"  # tailpipe | lca | disposable

class CompareRequest(BaseModel):
    vehicle1:      str
    vehicle2:      str
    distance:      float
    frequency:     str = "daily"
    emission_mode: str = "tailpipe"

# ── Helper ───────────────────────────────────────────────────────
def compute(vehicle_id: str, distance: float, frequency: str, emission_mode: str) -> dict:
    freq_map = {"daily": 365, "weekly": 52, "monthly": 12, "yearly": 1}
    multiplier   = freq_map.get(frequency, 365)
    annual_km    = distance * multiplier

    v = vehicles_col.find_one({"_id": vehicle_id})
    if not v:
        raise HTTPException(status_code=404, detail=f"Vehicle '{vehicle_id}' not found")

    factor       = v.get(emission_mode, v.get("tailpipe", 0.15))
    annual_co2   = round(annual_km * factor, 2)

    # For rating: if tailpipe is 0 (EVs), use LCA for meaningful rating
    rating_factor = factor if factor > 0 else v.get("lca", 0)
    rating_co2    = round(annual_km * rating_factor, 2)
    tonnes        = round(rating_co2 / 1000, 3)
    trees         = round(rating_co2 / KG_CO2_PER_TREE, 1)
    vs_global     = round((rating_co2 / 4700) * 100, 1)  # global avg 4700 kg/yr

    if   tonnes < 0.5:  rating, color = "Excellent", "#00c896"
    elif tonnes < 1.5:  rating, color = "Good",      "#a3e635"
    elif tonnes < 3.0:  rating, color = "Average",   "#fbbf24"
    elif tonnes < 5.0:  rating, color = "High",      "#f97316"
    else:               rating, color = "Very High", "#ef4444"

    return {
        "vehicle_id":       vehicle_id,
        "vehicle_name":     v["name"],
        "vehicle_type":     v["type"],
        "vehicle_icon":     v["icon"],
        "emission_mode":    emission_mode,
        "tailpipe_factor":  v.get("tailpipe", 0),
        "lca_factor":       v.get("lca", 0),
        "disposable_factor":v.get("disposable", 0),
        "factor_used":      factor,
        "annual_distance":  round(annual_km, 1),
        "annual_co2_kg":    annual_co2,
        "annual_co2_tonnes":tonnes,
        "monthly_co2_kg":   round(annual_co2 / 12, 2),
        "trees_needed":     trees,
        "rating":           rating,
        "rating_color":     color,
        "vs_global_pct":    vs_global,
        "is_zero_tailpipe": factor == 0,
    }

# ── Routes ───────────────────────────────────────────────────────
@app.get("/api/vehicles")
def get_vehicles():
    docs = list(vehicles_col.find({}, {"_id":1,"name":1,"type":1,"icon":1,
                                        "tailpipe":1,"lca":1,"disposable":1}))
    result = {}
    for d in docs:
        vid = d.pop("_id")
        result[vid] = d
    return result

@app.post("/api/calculate")
def calculate(req: CalcRequest):
    result = compute(req.vehicle_id, req.distance, req.frequency, req.emission_mode)
    # Save to MongoDB
    calculations_col.insert_one({
        "vehicle_id":    req.vehicle_id,
        "vehicle_name":  result["vehicle_name"],
        "distance":      req.distance,
        "frequency":     req.frequency,
        "emission_mode": req.emission_mode,
        "annual_co2_kg": result["annual_co2_kg"],
        "rating":        result["rating"],
        "timestamp":     datetime.utcnow()
    })
    return result

@app.post("/api/compare")
def compare(req: CompareRequest):
    r1 = compute(req.vehicle1, req.distance, req.frequency, req.emission_mode)
    r2 = compute(req.vehicle2, req.distance, req.frequency, req.emission_mode)
    diff = abs(round(r1["annual_co2_kg"] - r2["annual_co2_kg"], 2))
    greener = req.vehicle1 if r1["annual_co2_kg"] <= r2["annual_co2_kg"] else req.vehicle2
    return {"vehicle1": r1, "vehicle2": r2, "diff_kg": diff, "greener": greener}

@app.get("/api/history")
def history():
    docs = list(calculations_col.find({}, {"_id":0}).sort("timestamp", -1).limit(15))
    for d in docs:
        if "timestamp" in d:
            d["timestamp"] = d["timestamp"].isoformat()
    return docs

# Serve frontend
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/{full_path:path}")
def serve_frontend(full_path: str):
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
