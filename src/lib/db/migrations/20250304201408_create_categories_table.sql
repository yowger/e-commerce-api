-- migrate:up
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE CHECK (
        LENGTH(name) >= 3
        AND LENGTH(name) <= 50
    ),
    slug TEXT NOT NULL UNIQUE CHECK (
        LENGTH(slug) >= 3
        AND LENGTH(slug) <= 100
    ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert categories with slugs
INSERT INTO categories (name, slug)
VALUES 
    ('Electronics', 'electronics'),
    ('Clothing', 'clothing'),
    ('Toys', 'toys'),
    ('Food', 'food'),
    ('Books', 'books'),
    ('Home & Kitchen', 'home-kitchen'),
    ('Sports & Outdoors', 'sports-outdoors');

-- Index for faster lookups
CREATE INDEX idx_categories_slug ON categories(slug);

-- migrate:down
DELETE FROM categories
WHERE name IN (
        'Electronics',
        'Clothing',
        'Toys',
        'Food',
        'Books',
        'Home & Kitchen',
        'Sports & Outdoors'
    );

DROP TABLE categories;
