-- 1. Alterar tabela para permitir membros sem User ID (criados manualmente)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='members' AND column_name='user_id' AND is_nullable='NO') THEN
        ALTER TABLE members ALTER COLUMN user_id DROP NOT NULL;
    END IF;
END $$;

-- 2. Adicionar colunas faltantes
ALTER TABLE members ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE members ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE members ADD COLUMN IF NOT EXISTS start_date timestamptz DEFAULT now();

-- 3. Inserir dados de teste (apenas se não existirem)
INSERT INTO members (full_name, email, cpf, status, start_date, expiration_date, phone, user_id)
SELECT 'Associado Teste 1', 'teste1@exemplo.com', '111.111.111-11', 'active', now(), now() + interval '1 year', '(11) 99999-9999', NULL
WHERE NOT EXISTS (SELECT 1 FROM members WHERE email = 'teste1@exemplo.com');

INSERT INTO members (full_name, email, cpf, status, start_date, expiration_date, phone, user_id)
SELECT 'Associado Teste 2', 'teste2@exemplo.com', '222.222.222-22', 'active', now(), now() + interval '1 year', '(21) 88888-8888', NULL
WHERE NOT EXISTS (SELECT 1 FROM members WHERE email = 'teste2@exemplo.com');
