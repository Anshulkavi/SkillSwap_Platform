# alembic/env.py
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from sqlmodel import SQLModel
from models.models import *  # import all your models
from alembic import context
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Alembic config object
config = context.config

# Override URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in .env")

config.set_main_option("sqlalchemy.url", DATABASE_URL.replace("%", "%%"))

# Logging setup
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# target metadata for 'autogenerate'
target_metadata = SQLModel.metadata

# Offline migrations
def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# Online migrations
def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

# Run based on mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
