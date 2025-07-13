from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow frontend (React) to call this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or use ["http://localhost:3000"] if you prefer
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract")
async def extract(file: UploadFile = File(...)):
    # Simulated extraction result
    result = {
        "structure": {
            "title": "Invoice Document",
            "sections": ["Header", "Billing Info", "Item Table", "Total"],
        },
        "entities": {
            "names": ["John Doe"],
            "dates": ["2023-08-01"],
            "addresses": ["123 Elm Street, NY"],
        },
        "tables": [
            {
                "headers": ["Item", "Quantity", "Price"],
                "rows": [
                    ["Notebook", "2", "$6"],
                    ["Pen", "5", "$5"],
                ],
            }
        ],
    }

    return {"data": result}

# ✅ THIS IS IMPORTANT if running as `python main.py` or for uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
