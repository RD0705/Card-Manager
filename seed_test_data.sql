-- Inserir Usuários Mock (Simulando IDs do Clerk)
INSERT INTO users (id, full_name, avatar_url, billing_address, payment_method)
VALUES 
    ('user_teste_ativo_123', 'Roberto Ativo', 'https://i.pravatar.cc/150?u=ativo', '{}', '{}'),
    ('user_teste_expirado_456', 'Ana Expirada', 'https://i.pravatar.cc/150?u=expirada', '{}', '{}')
ON CONFLICT (id) DO NOTHING;

-- Inserir Produtos e Preços (Necessário para a Foreign Key da assinatura)
INSERT INTO products (id, active, name, description)
VALUES 
    ('prod_teste_premium', true, 'Plano Premium', 'Acesso total')
ON CONFLICT (id) DO NOTHING;

INSERT INTO prices (id, product_id, active, unit_amount, currency, type, interval)
VALUES 
    ('price_teste_mensal', 'prod_teste_premium', true, 2990, 'brl', 'recurring', 'month')
ON CONFLICT (id) DO NOTHING;

-- Inserir Assinatura ATIVA para o Roberto
INSERT INTO subscriptions (id, user_id, status, price_id, quantity, created, current_period_start, current_period_end)
VALUES 
    ('sub_ativo_001', 'user_teste_ativo_123', 'active', 'price_teste_mensal', 1, now(), now(), now() + interval '30 days')
ON CONFLICT (id) DO UPDATE SET status = 'active';

-- Inserir Assinatura CANCELADA/EXPIRADA para a Ana
INSERT INTO subscriptions (id, user_id, status, price_id, quantity, created, current_period_start, current_period_end)
VALUES 
    ('sub_expirado_002', 'user_teste_expirado_456', 'canceled', 'price_teste_mensal', 1, now() - interval '60 days', now() - interval '60 days', now() - interval '30 days')
ON CONFLICT (id) DO UPDATE SET status = 'canceled';
