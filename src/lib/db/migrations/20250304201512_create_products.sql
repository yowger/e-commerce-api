-- migrate:up
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (
        LENGTH(name) >= 3
        AND LENGTH(name) <= 100
    ),
    slug TEXT NOT NULL UNIQUE CHECK (
        LENGTH(slug) >= 3
        AND LENGTH(slug) <= 150
    ),
    description TEXT CHECK (LENGTH(description) <= 500),
    price NUMERIC(10, 2) NOT NULL CHECK (
        price >= 0
        AND price <= 999999.99
    ),
    category_slug TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_category FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category_slug ON products(category_slug);
-- migrate:down
DROP TABLE products;