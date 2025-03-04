-- migrate:up
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE CHECK (
        LENGTH(name) >= 3
        AND LENGTH(name) <= 50
    ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO categories (name)
VALUES ('Electronics'),
    ('Clothing'),
    ('Toys'),
    ('Food'),
    ('Books'),
    ('Home & Kitchen'),
    ('Sports & Outdoors');
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