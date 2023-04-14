from logging import getLogger, Filter, LogRecord
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import Base, engine

from categories.router import router as categories_router
from products.router import router as products_router
# from sales.router import router as sales_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(categories_router)
app.include_router(products_router)
# app.include_router(sales_router)

@app.get("/healthcheck")
async def healthcheck():
    return {"healthy": True}

# Prevent log pollution
class HealthCheckFilter(Filter):
    def filter(self, record: LogRecord) -> bool:
        return record.getMessage().find("/healthcheck") == -1

getLogger('uvicorn.access').addFilter(HealthCheckFilter())